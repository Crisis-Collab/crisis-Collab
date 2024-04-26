import React from 'react';

const EmergencyNumbersDashboard = () => {
  // Define emergency numbers available in India
  const emergencyNumbersIndia = [
    { city: 'All India', number: '112' },
    { city: 'Police', number: '100' },
    { city: 'Fire', number: '101' },
    { city: 'Ambulance', number: '102' },
    { city: 'Women Helpline', number: '1091' },
    { city: 'Child Helpline', number: '1098' },
    { city: 'Senior Citizen Helpline', number: '1090' },
    // Add more emergency numbers as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emergency Numbers (India)</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">City/Area</th>
            <th className="px-4 py-2">Emergency Number</th>
          </tr>
        </thead>
        <tbody>
          {emergencyNumbersIndia.map((emergency, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{emergency.city}</td>
              <td className="border px-4 py-2">{emergency.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmergencyNumbersDashboard;
