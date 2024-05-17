import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase.config';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const initialData = months.map(month => ({ name: month, livesSaved: 0 }));

const BarChartComponent = () => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAlerts = async () => {
      try {
        const alertsRef = collection(db, 'users', auth.currentUser.uid, 'alerts');
        const q = query(alertsRef, where('isSolved', '==', true));
        const querySnapshot = await getDocs(q);

        const alertsData = [];
        querySnapshot.forEach((doc) => {
          const alert = doc.data();
          alertsData.push(alert);
        });

        const aggregatedData = initialData.map(monthData => {
          const monthAlerts = alertsData.filter(alert => {
            const resolvedDate = new Date(alert.resolvedDate.seconds * 1000);
            const month = resolvedDate.toLocaleString('default', { month: 'short' });
            return month === monthData.name;
          });
        
          const livesSaved = monthAlerts.reduce((acc, alert) => acc + parseInt(alert.livesSaved), 0);
          const solvedAlertsCount = monthAlerts.filter(alert => alert.alertStatus === 'solved' && alert.isSolved).length;
        
          return { ...monthData, livesSaved, solvedAlertsCount };
        });
        
        

        setData(aggregatedData);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchUserAlerts();
    }
  }, [auth.currentUser]);

  if (loading) {
    return <div>{loading && (
      <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
      </div>
    )}</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />
        <YAxis 
          tickFormatter={(value) => `${value}`}
          tickCount={6}
          domain={[0, (dataMax) => Math.ceil(dataMax / 50) * 50]}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="livesSaved" fill="#dc2626" name="Lives Saved" />
        <Bar dataKey="solvedAlertsCount" fill="#3182ce" name="Solved Alerts" />
      </BarChart>
    </div>
  );
  
}

export default BarChartComponent;
