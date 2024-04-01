import React from 'react'

const Stats = () => {
    return (
        <section className=" stats section">
            <div className="container mx-auto">
                <div className='flex flex-col xl:flex-row gap-y-6 justify-between' >
                    <div className='Stats__item flex-1 xl:border-r flex flex-col items-center'>
                        <div className='text-4xl xl:text-[64px] font-semibold text-yellow-300 xl:mb-2'>
                            +5120</div>
                        <div>Happy Patients </div>

                    </div>


                    <div className='Stats__item flex-1 xl:border-r flex flex-col items-center'>
                        <div className='text-4xl xl:text-[64px] font-semibold text-yellow-300 xl:mb-2'>
                            +100</div>
                        <div>Total Agencies </div>

                    </div>


                    <div className='Stats__item flex-1 xl:border-r flex flex-col items-center'>
                        <div className='text-4xl xl:text-[64px] font-semibold text-yellow-300 xl:mb-2'>
                            +200</div>
                        <div>Total Rescue-Teams </div>

                    </div>


                    <div className='Stats__item flex-1 xl:border-r flex flex-col items-center'>
                        <div className='text-4xl xl:text-[64px] font-semibold text-yellow-300 xl:mb-2'>
                            +10</div>
                        <div>years experience </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Stats