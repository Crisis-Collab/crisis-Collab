
import React,{useState,useEffect} from 'react'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";
import avatar from "../../../assets/AgencyAva.png"

const MyProfile = () => {
  const [user,setUser] = useState(null);
  const [loading,setLoading] =useState(false);
  const getUser = async () => {
    try {
      const userRef =doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      console.log(`User Data -${JSON.stringify(userData)}`)
      setUser(userData);
    } catch (error) {
      console.log("error occured while fetching user");
    }
  };
  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, []);
  return (
    <div>
       <div className='flex flex-col items-center justify-center p-6'>
        <img src={avatar} className='w-24 h-24 border-2 border-gray-400 rounded-full'/>
      
       {!user ? <h4>Agency Name</h4> :  <h1 className='text-3xl font-semibold' >{user.agencyName}</h1> }
      
       </div>
       <div>
        Agency Description
        <div></div>
       </div>
       
    </div>
  )
}

export default MyProfile
