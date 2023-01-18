import React from 'react'
import { images } from '../utils/commonComponents'

function AboutUs() {

    return (
        <section className="container w-full lg:px-0 px-5 lg:w-3/4 mx-auto min-h-screen">
            <div className="mt-16">
                <h3 className="text-3xl font-bold text-center my-10 lg:my-5">
                    About Us🦻
                </h3>
                <div className="flex gap-10 justify-center items-center flex-col lg:flex-row mt-10">
                    <div className="">
                        <img
                            src={images.logo}
                            className="w-96 rounded-xl lg:rounded-l-xl"
                            alt="food"
                        />
                    </div>
                    <div className="w-full lg:w-1/3 flex gap-5 mb-10 lg:mb-0 flex-col text-justify">
                        ⭐⭐⭐
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua.
                        </p>
                        ⭐⭐⭐
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs