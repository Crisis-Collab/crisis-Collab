import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import clearVideo from '../../../assets/sunny.mp4'


const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const latitude = userData.latitude;
          const longitude = userData.longitude;
          getWeather(latitude, longitude);
        } else {
          setLoading(false);
          setError('No location data found in firestore');
        }
      } catch (err) {
        setLoading(false);
        setError('Error fetching location data from firestore');
      }
    };

    fetchCurrentUser();
    // Update current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  const getWeather = (latitude, longitude) => {
    const API_KEY = '306774599b42ad586703a06dd2dcc8b5';
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      )
      .then(res => {
        setWeather(res.data);

        // Fetch hourly forecast
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          )
          .then(hourlyRes => {
            setHourlyForecast(hourlyRes.data);

            // Fetch daily forecast
            const API_KEY2 = '1fa9ff4126d95b8db54f3897a208e91c';
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${API_KEY2}&units=metric`
              )
              .then(dailyRes => {
                setDailyForecast(dailyRes.data.daily);
                setLoading(false);
              })
              .catch(dailyErr => {
                setError('Error fetching daily forecast from OpenWeatherMap API');
                setLoading(false);
              });
          })
          .catch(hourlyErr => {
            setError('Error fetching hourly forecast from OpenWeatherMap API');
            setLoading(false);
          });
      })
      .catch(err => {
        setLoading(false);
        setError('Error fetching weather data from OpenWeatherMap API');
      });
  };

  const handleDaySelection = (index) => {
    setSelectedDayIndex(index);
  };

  if (loading) {
    return (
      <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
        <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
      </div>
    );
  }

  if (error) {
    return <p className='text-lg font-bold text-red-500'>{error}</p>;
  }

  if (!weather || !dailyForecast) {
    return null; // Render nothing until data is loaded
  }

  const getBackgroundVideo = () => {
    if (!weather) return ''; // Return empty string if weather data is not available
    const weatherCondition = weather.weather[0].main.toLowerCase();
    // console.log(weather.weather[0].main.toLowerCase())
    let videoPath = '';
    console.log(weatherCondition);
    switch (weatherCondition) {
      case 'clear':
        videoPath = {clearVideo};
        break;
      case 'broken clouds':
        videoPath = 'https://www.pexels.com/video/clouds-formation-covers-the-ray-of-sun-2935032/';
        
        break;
      case 'clouds':
        videoPath = 'https://www.pexels.com/video/clouds-formation-covers-the-ray-of-sun-2935032/';
        break;
      // Add more cases for different weather conditions as needed
      default:
        videoPath = 'https://www.pexels.com/video/clouds-formation-covers-the-ray-of-sun-2935032/';
        // Default video if condition not matched
    }
    
    return videoPath; // Return the selected video path
  };
  
  

  // Render the weather UI
  return (
    <div className='p-4 '>
      {/* Your weather UI code goes here */}
      {loading && (
        <div className='  fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}
      <h2 className='text-xl font-semibold mb-2'>Current Forecast</h2>
      {weather ? (
        
      <div className=' border-red-800 border  shadow-lg rounded-xl m-auto relative px-6 top-[10%] '>
        <video
        autoPlay
        loop
        muted
        className="absolute inset-0  w-full h-full object-cover"
        src={getBackgroundVideo()}
      />
        <div className=''>
        
          <div className='flex justify-between w-full'>
        
            <div className='w-1/2 my-4 mx-auto flex justify-between items-center'>
              <div className='flex flex-col items-start justify-between h-full'>
                <div>
                  <p className='text-xl'>
                    {weather.name}, {weather.sys.country}
                  </p>
                  <p className='text-sm'>{weather.weather[0].description}</p>
                </div>
                {currentDateTime && (
        <div className='text-lg font-semibold mb-2'>
          {currentDateTime}
        </div>
      )}
                <div>
                  <h1 className='text-6xl font-semibold'>{weather.main.temp.toFixed()}°C</h1>
                </div>
                <div className='w-1/2 flex flex-col justify-between items-end'>
                  <div className='relative'>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      className='w-[100px]'
                    />
                  </div>
                </div>
              </div>
              {weather.name !== undefined ? (
                <div className='flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs'>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Feels Like</p>
                    <p className='font-bold w-20'>{weather.main.feels_like.toFixed()} °C</p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Humidity</p>
                    <p className='font-bold w-20'>{weather.main.humidity} %</p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Wind Speed</p>
                    <p className='font-bold w-20'>{weather.wind.speed.toFixed()} KPH</p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Pressure</p>
                    <p className='font-bold w-20'>{weather.main.pressure} hPa</p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Min_Temp</p>
                    <p className='font-bold w-20'>{weather.main.temp_min} °C</p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Max_Temp</p>
                    <p className='font-bold w-20'>{weather.main.temp_max} °C</p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Sunrise</p>
                    <p className='font-bold w-20'>
                      {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                        hour: 'numeric',
                        hour12: true
                      })}
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Sunset</p>
                    <p className='font-bold w-20'>
                      {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                        hour: 'numeric',
                        hour12: true
                      })}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          
        </div>
      </div>
    ) : error ? (
      <p className='text-lg font-bold text-red-500'>{error}</p>
    ) : null}
{dailyForecast && (
        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-2'>Daily Forecast</h2>
          <div className='flex flex-col'>
            <div className='flex justify-center gap-4'>
              {dailyForecast.map((forecast, index) => (
                <button
                  key={index}
                  onClick={() => handleDaySelection(index)}
                  className={`px-4 py-2 rounded-lg shadow-md ${index === selectedDayIndex ? 'bg-gray-300' : 'bg-gray-200'}`}
                >
                  {new Date(forecast.dt * 1000).toLocaleDateString()}
                </button>
              ))}
            </div>
            <div className='bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center my-4'>
              <div className='flex justify-between w-full'>
                <div className='w-1/3 my-4 mx-auto flex flex-col justify-between items-center'>
                  <div className='flex flex-col items-start justify-between h-full'>
                    <div> 
                      <p className='text-xl'> 
                        {dailyForecast[selectedDayIndex].weather[0].
                      description}
                      </p>
                    </div>
                    <div>
                      <h1 className='text-6xl font-semibold'>
                        {dailyForecast[selectedDayIndex].temp.day.toFixed()}°C 
                      </h1>
                    </div>
                    <div className='w-1/2 flex flex-col justify-between items-end'>
                      <div className='relative'>
                        <img
                            src={`http://openweathermap.org/img/wn/${dailyForecast[selectedDayIndex].weather[0].icon}@2x.png`}
                            alt={dailyForecast[selectedDayIndex].weather[0].description}
                            className="w-[100px]"
                                />
                      </div>
                    </div>
                  </div>

                </div>
                <div className='w-1/3 my-4 mx-auto flex flex-col justify-evenly gap-y-2 text-xs'>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Feels Like</p>
                    <p className='font-bold w-20'>
                      {dailyForecast[selectedDayIndex].feels_like.day.toFixed()} °C 
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Humidity</p>
                    <p className='font-bold w-20'>
                      {dailyForecast[selectedDayIndex].humidity} %
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Wind Speed</p>
                    <p className='font-bold w-20'>
                      {dailyForecast[selectedDayIndex].wind_speed.toFixed()} KPH
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Pressure</p>
                    <p className='font-bold w-20'>
                      {dailyForecast[selectedDayIndex].pressure} hPa
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Min_Temp</p>
                    <p className='font-bold w-20'>
                      {dailyForecast[selectedDayIndex].temp.min} °C
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Max_Temp</p>
                    <p className='font-bold w-20'>
                      {dailyForecast[selectedDayIndex].temp.max} °C
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Sunrise</p>
                    <p className='font-bold w-20'>
                      {new Date(dailyForecast[selectedDayIndex].sunrise * 1000).toLocaleTimeString([], {hour: 'numeric', hour12: true})} 
                    </p>
                  </div>
                  <div className='flex-justify-between gap-x-8'>
                    <p>Sunset</p>
                    <p className='font-bold w-20'>
                      {new Date(dailyForecast[selectedDayIndex].sunset * 1000).toLocaleTimeString([], {hour: 'numeric', hour12: true})} 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



{hourlyForecast && (
  <div className='mt-8'>
    <h2 className='text-xl font-semibold mb-2'>Hourly Forecast</h2>
    <div className='grid grid-cols-4 gap-4'>
      {hourlyForecast.list
        .filter(forecast => {
          // Filter forecasts for the selected day
          const forecastDate = new Date(forecast.dt * 1000);
          const selectedDay = new Date(dailyForecast[selectedDayIndex].dt * 1000);
          return forecastDate.getDate() === selectedDay.getDate();
        })
        .map((forecast, index) => (
          <div key={index} className='bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center'>
            <p>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
            />
            <p>{forecast.main.temp.toFixed()}°C</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
    </div>
  </div>
)}
    </div>
  );
};

export default Weather;
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../firebase/firebase.config';
// import { doc, getDoc } from 'firebase/firestore';
// import axios from 'axios';
// import { getAuth } from 'firebase/auth';

// const Weather = () => {
//   const [weather, setWeather] = useState(null);
//   const [hourlyForecast, setHourlyForecast] = useState(null);
//   const [dailyForecast, setDailyForecast] = useState(null);
//   const [selectedDayIndex, setSelectedDayIndex] = useState(0);
//   const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString()); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const userRef = doc(db, 'users', auth.currentUser.uid);
//         const userSnap = await getDoc(userRef);
//         if (userSnap.exists()) {
//           const userData = userSnap.data();
//           const latitude = userData.latitude;
//           const longitude = userData.longitude;
//           getWeather(latitude, longitude);
//         } else {
//           setLoading(false);
//           setError('No location data found in firestore');
//         }
//       } catch (err) {
//         setLoading(false);
//         setError('Error fetching location data from firestore');
//       }
//     };

//     fetchCurrentUser();
  

//   // Update current date and time every second
//   const intervalId = setInterval(() => {
//     setCurrentDateTime(new Date().toLocaleString());
//   }, 1000);

//   // Clean up the interval
//   return () => clearInterval(intervalId);
// }, []);


  
//   const getWeather = (latitude, longitude) => {
//     const API_KEY = '306774599b42ad586703a06dd2dcc8b5';
//     axios
//       .get(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//       )
//       .then(res => {
//         setWeather(res.data);
//         setLoading(false);

//         // Fetch hourly forecast
//         axios
//           .get(
//             `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//           )
//           .then(hourlyRes => {
//             setHourlyForecast(hourlyRes.data);
//             setLoading(false);
//           })
//           .catch(hourlyErr => {
//             setError('Error fetching hourly forecast from OpenWeatherMap API');
//           });

//         // Fetch daily forecast
//         const API_KEY2 = '1fa9ff4126d95b8db54f3897a208e91c';
//         axios
//           .get(
//             `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${API_KEY2}&units=metric`
//           )
//           .then(dailyRes => {
//             setDailyForecast(dailyRes.data.daily);
//             setLoading(false)
//           })
//           .catch(dailyErr => {
//             setError('Error fetching daily forecast from OpenWeatherMap API');
//           });
//       })
//       .catch(err => {
//         setLoading(false);
//         setError('Error fetching weather data from OpenWeatherMap API');
//       });
//   };

//   const handleDaySelection = (index) => {
//     setSelectedDayIndex(index);
//   };

//   return (
//     <div className='p-4'>
//       {loading && (
//         <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
//           <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
//         </div>
//       )}
//       <h2 className='text-xl font-semibold mb-2'>Current Forecast</h2>
//       {weather ? (
//       <div className='bg-gray-300 shadow-lg rounded-xl m-auto relative px-6 top-[10%] '>
//         <div className=''>
//           <div className='flex justify-between w-full'>
//             <div className='w-1/2 my-4 mx-auto flex justify-between items-center'>
//               <div className='flex flex-col items-start justify-between h-full'>
//                 <div>
//                   <p className='text-xl'>
//                     {weather.name}, {weather.sys.country}
//                   </p>
//                   <p className='text-sm'>{weather.weather[0].description}</p>
//                 </div>
//                 {currentDateTime && (
//         <div className='text-lg font-semibold mb-2'>
//           {currentDateTime}
//         </div>
//       )}
//                 <div>
//                   <h1 className='text-6xl font-semibold'>{weather.main.temp.toFixed()}°C</h1>
//                 </div>
//                 <div className='w-1/2 flex flex-col justify-between items-end'>
//                   <div className='relative'>
//                     <img
//                       src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//                       alt={weather.weather[0].description}
//                       className='w-[100px]'
//                     />
//                   </div>
//                 </div>
//               </div>
//               {weather.name !== undefined ? (
//                 <div className='flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs'>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Feels Like</p>
//                     <p className='font-bold w-20'>{weather.main.feels_like.toFixed()} °C</p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Humidity</p>
//                     <p className='font-bold w-20'>{weather.main.humidity} %</p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Wind Speed</p>
//                     <p className='font-bold w-20'>{weather.wind.speed.toFixed()} KPH</p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Pressure</p>
//                     <p className='font-bold w-20'>{weather.main.pressure} hPa</p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Min_Temp</p>
//                     <p className='font-bold w-20'>{weather.main.temp_min} °C</p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Max_Temp</p>
//                     <p className='font-bold w-20'>{weather.main.temp_max} °C</p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Sunrise</p>
//                     <p className='font-bold w-20'>
//                       {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
//                         hour: 'numeric',
//                         hour12: true
//                       })}
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Sunset</p>
//                     <p className='font-bold w-20'>
//                       {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
//                         hour: 'numeric',
//                         hour12: true
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           </div>
          
//         </div>
//       </div>
//     ) : error ? (
//       <p className='text-lg font-bold text-red-500'>{error}</p>
//     ) : null}
// {dailyForecast && (
//         <div className='mt-8'>
//           <h2 className='text-xl font-semibold mb-2'>Daily Forecast</h2>
//           <div className='flex flex-col'>
//             <div className='flex justify-center gap-4'>
//               {dailyForecast.map((forecast, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleDaySelection(index)}
//                   className={`px-4 py-2 rounded-lg shadow-md ${index === selectedDayIndex ? 'bg-gray-300' : 'bg-gray-200'}`}
//                 >
//                   {new Date(forecast.dt * 1000).toLocaleDateString()}
//                 </button>
//               ))}
//             </div>
//             <div className='bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center my-4'>
//               <div className='flex justify-between w-full'>
//                 <div className='w-1/3 my-4 mx-auto flex flex-col justify-between items-center'>
//                   <div className='flex flex-col items-start justify-between h-full'>
//                     <div> 
//                       <p className='text-xl'> 
//                         {dailyForecast[selectedDayIndex].weather[0].
//                       description}
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className='text-6xl font-semibold'>
//                         {dailyForecast[selectedDayIndex].temp.day.toFixed()}°C 
//                       </h1>
//                     </div>
//                     <div className='w-1/2 flex flex-col justify-between items-end'>
//                       <div className='relative'>
//                         <img
//                             src={`http://openweathermap.org/img/wn/${dailyForecast[selectedDayIndex].weather[0].icon}@2x.png`}
//                             alt={dailyForecast[selectedDayIndex].weather[0].description}
//                             className="w-[100px]"
//                                 />
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//                 <div className='w-1/3 my-4 mx-auto flex flex-col justify-evenly gap-y-2 text-xs'>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Feels Like</p>
//                     <p className='font-bold w-20'>
//                       {dailyForecast[selectedDayIndex].feels_like.day.toFixed()} °C 
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Humidity</p>
//                     <p className='font-bold w-20'>
//                       {dailyForecast[selectedDayIndex].humidity} %
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Wind Speed</p>
//                     <p className='font-bold w-20'>
//                       {dailyForecast[selectedDayIndex].wind_speed.toFixed()} KPH
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Pressure</p>
//                     <p className='font-bold w-20'>
//                       {dailyForecast[selectedDayIndex].pressure} hPa
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Min_Temp</p>
//                     <p className='font-bold w-20'>
//                       {dailyForecast[selectedDayIndex].temp.min} °C
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Max_Temp</p>
//                     <p className='font-bold w-20'>
//                       {dailyForecast[selectedDayIndex].temp.max} °C
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Sunrise</p>
//                     <p className='font-bold w-20'>
//                       {new Date(dailyForecast[selectedDayIndex].sunrise * 1000).toLocaleTimeString([], {hour: 'numeric', hour12: true})} 
//                     </p>
//                   </div>
//                   <div className='flex-justify-between gap-x-8'>
//                     <p>Sunset</p>
//                     <p className='font-bold w-20'>
//                       {new Date(dailyForecast[selectedDayIndex].sunset * 1000).toLocaleTimeString([], {hour: 'numeric', hour12: true})} 
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}



// {hourlyForecast && (
//   <div className='mt-8'>
//     <h2 className='text-xl font-semibold mb-2'>Hourly Forecast</h2>
//     <div className='grid grid-cols-4 gap-4'>
//       {hourlyForecast.list
//         .filter(forecast => {
//           // Filter forecasts for the selected day
//           const forecastDate = new Date(forecast.dt * 1000);
//           const selectedDay = new Date(dailyForecast[selectedDayIndex].dt * 1000);
//           return forecastDate.getDate() === selectedDay.getDate();
//         })
//         .map((forecast, index) => (
//           <div key={index} className='bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center'>
//             <p>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
//             <img
//               src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
//               alt={forecast.weather[0].description}
//             />
//             <p>{forecast.main.temp.toFixed()}°C</p>
//             <p>{forecast.weather[0].description}</p>
//           </div>
//         ))}
//     </div>
//   </div>
// )}

    


//     </div>
//   );
// };

// export default Weather;