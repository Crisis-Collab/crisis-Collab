import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import { getAuth } from 'firebase/auth';


const Weather = () => {
  const [weather, setWeather] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {

    const fetchCurrentUser = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        //  console.log(`User DATA PROVIDED : ${JSON.stringify(userData)}`);
        if (userSnap.exists() ) {
          const userData = userSnap.data();
          const latitude = userData.latitude;
          const longitude = userData.longitude;
          getWeather(latitude, longitude);
        } else {
          setError("No location data found in firestore");
        }
      } catch (err) {
        setError("Error fetching location data from firestore");
      }
    };

    fetchCurrentUser();
  }, []);

  const getWeather = (latitude, longitude) => {
    // setLoading(true);
    const API_KEY = "306774599b42ad586703a06dd2dcc8b5"
    axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching weather data from OpenWeatherMap API");
        // setLoading(false);
      });
  };

  return (
    <div>
    
      {/* {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
        </div>
      )} */}
      {weather ? (
       <div className="w-[500px]  h-[250px]  bg-gray-300 shadow-lg rounded-xl m-auto relative px-6 top-[10%] ">
          <div className='flex justify-between w-full'>
            <div className='w-1/2 my-4 mx-auto flex justify-between items-center'>
            <div className='flex flex-col items-start justify-between h-full'>
          <div> 
               <p className='text-xl'> 
               {weather.name},
               {weather.sys.country}
               </p>
               <p className='text-sm'>
               {weather.weather[0].
               description}
               </p>
          </div>
          <div>
            <h1 className='text-6xl font-semibold'>
              {weather.main.temp.toFixed()}°C 
            </h1>
          </div>
          <div className='w-1/2 flex flex-col justify-between items-end'>
            <div className='relative'>
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-[100px]"
                    />
            </div>
          </div>
          </div>
          {weather.name !== undefined ? (
            <div className='flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs'>
              <div className='flex-justify-between gap-x-8'>
                <p>Feels Like</p>
                <p className='font-bold w-20'>
                  {weather.main.feels_like.toFixed()} °C 
                </p>
              </div>
              <div className='flex-justify-between gap-x-8'>
                <p>Humidity</p>
                <p className='font-bold w-20'>
                  {weather.main.humidity} %
                </p>
              </div>
              <div className='flex-justify-between gap-x-8'>
                <p>Wind Speed</p>
                <p className='font-bold w-20'>
                  {weather.wind.speed.toFixed()} KPH
                </p>
              </div>
              <div className='flex-justify-between gap-x-8'>
                <p>Pressure</p>
                <p className='font-bold w-20'>
                  {weather.main.pressure} hPa
                </p>
              </div>
            </div>
          
          ):null}
         </div>
       </div>
     </div>
      
          
        
      ) : error ? (
        <p className="text-lg font-bold text-red-500">{error}</p>
      ) : null}
    
    </div>
  );
};

export default Weather;