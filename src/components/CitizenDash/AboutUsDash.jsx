import React from 'react'

const AboutUsDash = () => {
    return (
        <section className=' AboutUs flex flex-col mt-5' >
            <div className='max-w-[1320px] md:py-[80] py-5 flex mx-auto md:flex-row flex-col mb-10 '>
                <div className='basis-[45%] rounded-1'>
                    <img src='/src/assets/Untitled design.png' alt='' className='w-2/3 rounded shadow-3xl mb-10' ></img>
                </div>
                <div className='basis-[55%] '>
                    <h1 className='text-4xl font-bold pb-5'>CrisisCollab-Diaster Management platform </h1>
                    <p className='py-3 list-disc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit tempora non facilis sed, modi molestiae nostrum veritatis illum sequi quo unde quae doloremque dolores iste quas, eum voluptatum magni cumque, odio labore?</p>

                    <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit tempora non facilis sed, modi molestiae nostrum veritatis illum sequi quo unde quae doloremque dolores iste quas, eum voluptatum magni cumque, odio labore?</p>
                    <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit tempora non facilis sed, modi molestiae nostrum veritatis illum sequi quo unde quae doloremque dolores iste quas, eum voluptatum magni cumque, odio labore?</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUsDash