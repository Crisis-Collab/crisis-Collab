import React from 'react'


const Hero = () => {
    return (
        <div className="flex justify-between py-20 px-8 ">
            <div className="w-1/2 mt-16 flex flex-col items-center justify-center ">
                <div className={`text-6xl  font-bold `}>
                    Crisis Collab
                </div>
                <div className=''>Connecting Rescue Relief Agencies with the world</div>
                <div className='bg-red-600 rounded-full items-center flex justify-center h-[200px] w-[200px] m-2'></div>
                <img src='/src/assets/map3.jpg' alt='map image' className='absolute max-w-full rounded-full h-[170px] w-[170px] mt-6'></img>
                <a href='' className='m-2 text-lg bg-gray-500 text-grey-100 rounded-lg py-2 px-2'>Read More</a>
            </div>
            <div className="w-1/2 ">
                <img src="/src/assets/pexels-pixabay-263402.jpg" alt='Help Hand' className='w-5/6 mx-8 mt-20 ml-20  rounded shadow-3xl'></img>

            </div>
        </div >
    )
}

export default Hero