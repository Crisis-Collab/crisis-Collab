import React from 'react'

const Services = () => {
    return (
        <section className='services'>

            <div className='bg-services bg-cover bg-no-repeat bg-slate-300 max-w-[1446px] mx-4 xl:mx-auto rounded-[20px] xl:pt-[70px] px-6 xl:px-0 relative h-[368px] flex items-center xl:items-start -z-10 '>

                <div className="container mt-4 text-lg px-10">

                    <div className='services__top flex flex-col items-center  xl:flex-row xl:mb-[60px]'>

                        <h1 className=' text-5xl font-bold flex-1 mb-4 ml-20 xl:mb-0  text-center text-red-700 xl:text-left'>Our Best Services For You</h1>

                        <p className=' text-black font-semibold text-sm flex-1 text-center xl:text-left max-w-2xl xl:max-w-none  '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolores, aspernatur exercitationem voluptate vitae numquam dolor dignissimos Cum praesentium quo nam explicabo!</p>
                    </div>
                </div>

            </div>
            <div className="container mx-auto mt-4 xl:-mt-[144px]" >
                <div className='grid m-22 mb-24 p-30 xl:grid-cols-4 gap-8 px-2 xl:px-24 py-0'>
                    <div className='services__item  bg-slate-400 p-[30px] rounded-[10px] shadow-custom2 min-h-[50px] flex flex-col items-center text-center '>
                        <div className='mb-[4px] '>
                            <img src='/src/assets/log1.png' alt='' className=''></img>
                        </div>
                        <h3 className='mb-[10px] font-bold'>Volunteer</h3>
                        <p className='font-light leading-normal max-w-[300px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident temporibus accusamus necessitatibus?</p>

                    </div>
                    <div className='services__item bg-slate-400 p-[30px] rounded-[10px] shadow-custom2 min-h-[288px] flex flex-col items-center text-center '>
                        <div className='mb-[15px]'>
                            <img src='/src/assets/log2.png' alt='' className=''></img>
                        </div>
                        <h3 className='mb-[10px] font-bold'>Rescue Agency</h3>
                        <p className='font-light leading-normal max-w-[300px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident temporibus accusamus necessitatibus?</p>

                    </div>
                    <div className='services__item bg-slate-400 p-[30px] rounded-[10px] shadow-custom2 min-h-[288px] flex flex-col items-center text-center '>
                        <div className='mb-[15px]'>
                            <img src='/src/assets/log3.png' alt='' className=''></img>
                        </div>
                        <h3 className='mb-[10px] font-bold'>Real-time Map</h3>
                        <p className='font-light leading-normal max-w-[300px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident temporibus accusamus necessitatibus?</p>

                    </div>
                    <div className='services__item bg-slate-400 p-[30px] rounded-[10px] shadow-custom2 min-h-[288px] flex flex-col items-center text-center '>
                        <div className='mb-[15px]'>
                            <img src='/src/assets/log4.png' alt='' className=''></img>
                        </div>
                        <h3 className='mb-[10px] font-bold'>Emergency Call</h3>
                        <p className='font-light leading-normal max-w-[300px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident temporibus accusamus necessitatibus?</p>

                    </div>

                </div>
            </div>

        </section>
    )
}

export default Services