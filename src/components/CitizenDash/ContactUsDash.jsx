import React from 'react'

const ContactUsDash = () => {
    return (
        <section
            className="text-gray-600 pt-8  bg-white body-font relative"
            id="connect"
        >
            <div className="container px-5  mx-auto">
                <div className="flex flex-col text-center w-full mb-2 mt-4">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">
                        Contact Us
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Urgent Assistance or Valuable Feedback? Reach Out to Our
                        Emergency Response Team or Share Your Thoughts with Us!
                    </p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-500">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-cyan-500 focus:bg-gray-300 focus:ring-2  text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-500">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-cyan-500 focus:bg-gray-300 focus:ring-2 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className="leading-7 text-sm text-gray-500"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-cyan-500 focus:bg-gray-300 focus:ring-2  h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                className="flex mx-auto t3.
    text-white  font-semibold  bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-900 rounded-full text-lg"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
                            <a className="text-blue-700">example@email.com</a>
                            <p className="leading-normal my-5">
                                Bundelkhan University,
                                <br />
                                Jhansi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUsDash