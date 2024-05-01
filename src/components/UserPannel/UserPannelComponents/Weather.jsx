import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

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
        setError('Error fetching weather data from OpenWeatherMap API',err);
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
    return null; 
  }

  return (
    <div className='p-4'>
    
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}
      <h2 className='text-2xl font-semibold mb-2 text-blue-600'>Current Forecast</h2>
      {weather ? (
      <div className='bg-zinc-900  shadow-lg rounded-xl w-full  relative   top-[10%] '>
        <div className='w-full '>
          <div className=''>
            <div className=' my-4 mx-auto flex justify-between items-center p-4 space-x-8'>
              <div className='flex flex-col items-start justify-between h-full'>
                <div>
                  <p className='text-5xl text-blue-600 font-semibold'>
                    {weather.name}, {weather.sys.country}
                  </p>
                  <p className='text-xl text-gray-100 font-semibold'>{weather.weather[0].description}</p>
                </div>
                {currentDateTime && (
        <div className='text-lg font-semibold mb-2 text-red-600'>
          {currentDateTime}
        </div>
      )}
      </div>
      <div>
                <div>
                  <h1 className='text-8xl text-red-600 font-semibold'>{weather.main.temp.toFixed()}°C</h1>
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
                <div className='flex bg-zinc-950 p-3 rounded-lg shadow-xl   justify-between space-x-10 my-4 mx-auto text-sm text-gray-100'>
                  <div className='space-y-4 '>
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
                  </div>
                  <div  className='space-y-4 '>
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
          <h2 className='text-2xl font-semibold mb-2 text-blue-600 '>Daily Forecast</h2>
          <div className='flex flex-col'>
            <div className='flex justify-center gap-4'>
              {dailyForecast.map((forecast, index) => (
                <button
                  key={index}
                  onClick={() => handleDaySelection(index)}
                  className={`px-4 py-2 rounded-lg shadow-md active:bg-zinc-200 active:outline-double ${index === selectedDayIndex ? 'bg-zinc-600 text-gray-100 ' : 'bg-zinc-100 hover:bg-zinc-300 hover:text-black '}`}
                >
                  {new Date(forecast.dt * 1000).toLocaleDateString()}
                </button>
              ))}
            </div>
            <div className='bg-zinc-900 p-2 rounded-lg shadow-md flex flex-col items-center justify-between my-4'>
              <div className='flex justify-between items-center w-full'>
                <div className='w-1/2 my-4 mx-auto flex flex-col justify-between items-center'>
                  <div className='flex flex-col items-center justify-between h-full'>
                   
                    <div>
                      <h1 className='text-8xl font-semibold'>
                        {dailyForecast[selectedDayIndex].temp.day.toFixed()}°C 
                      </h1>
                    </div>
                    <div> 
                      <p className='text-xl font-semibold text-red-600'> 
                        {dailyForecast[selectedDayIndex].weather[0].
                      description}
                      </p>
                    </div>
                    <div className='w-1/2 flex flex-col justify-between items-center'>
                      <div className='relative'>
                        <img
                            src={`http://openweathermap.org/img/wn/${dailyForecast[selectedDayIndex].weather[0].icon}@2x.png`}
                            alt={dailyForecast[selectedDayIndex].weather[0].description}
                            className="w-[400px] "
                                />
                      </div>
                    </div>
                  </div>

                </div>
                <div className='flex bg-zinc-950 p-3 rounded-lg shadow-xl   justify-between space-x-10 my-4 mx-auto text-sm text-gray-100'>
                  <div className='space-y-4 '>
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
                  </div>
                  <div className='space-y-4 '>
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
        </div>
      )}



{hourlyForecast && (
  <div className='mt-8 font-semibold text-gray-100'>
    <h2 className='text-2xl font-semibold mb-2 text-blue-600 '>Hourly Forecast</h2>
    <div className='grid grid-cols-4 gap-4'>
      {hourlyForecast.list
        .filter(forecast => {
          // Filter forecasts for the selected day
          const forecastDate = new Date(forecast.dt * 1000);
          const selectedDay = new Date(dailyForecast[selectedDayIndex].dt * 1000);
          return forecastDate.getDate() === selectedDay.getDate();
        })
        .map((forecast, index) => (
          <div key={index} className='bg-zinc-900  p-4 rounded-lg shadow-md flex flex-col items-center'>
            <p className='text-red-600'>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
  )
}

export default Weather;