import React from 'react'
import logo from '../component_images/logo.png'
import {Link} from 'react-router-dom'
const Homepage = () => {
  return (
    <section
   
  className="relative bg-[url(https://img.freepik.com/premium-photo/attractive-african-woman-swimwear-stands-sun-listening-music-with-headphones-tropical-vacation_531091-2521.jpg?w=2000)] bg-cover bg-center bg-no-repeat"
>

  <div
  
    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"
    
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    
    <div className="max-w-xl text-center  sm:text-left">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
       Swim as you please.

        <strong className="block font-extrabold text-pink-700">
        Swim in comfort.
        </strong>
      </h1>

      <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
        if there's a will there's a WAVE. Shop with Swim n' Waves!
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <Link
          to="/Collection"
          className="block w-full rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-pink-500 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        >
          Buy now
        </Link>

        <Link
          to="/contactus"
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-pink-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Contact us
        </Link>
      </div>
     
    </div>
   
  </div>

</section>

  )
}

export default Homepage