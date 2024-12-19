import React from 'react'
import Navbar from '../Components/Navbar'


function About() {
  return (

    
    <div>

<Navbar />

<div className='text-center text-2xl pt-10 text-gray-500 mx-4 lg:mx-20'>
  <div>
    <p className='text-xl font-bold'>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
  </div>

  <div className='my-10 flex flex-col md:flex-row gap-12'>
    <img 
      className='w-[500px] h-[350px] object-cover rounded-lg shadow-lg' 
      src="https://th.bing.com/th/id/R.421c922ca4033ed1e7fc9d54e108d0c0?rik=qN20psV917YNhQ&riu=http%3a%2f%2fcleveland-bookkeeping.com%2fwp-content%2fuploads%2f2016%2f03%2fshutterstock_155141132.jpg&ehk=S48LKXMLbb1zr7uxMbdrL742hqjqmhpyRvNl4TkBB8g%3d&risl=1&pid=ImgRaw&r=0" 
      alt="Doctors and medical staff" 
    />
    <div className='flex flex-col justify-start gap-6 md:w-2/4 text-sm text-gray-600 mt-5'>
      <p>We are a dedicated team of healthcare professionals committed to providing the best care and support to our patients. We believe in compassion, integrity, and excellence in all our services.</p>
      <p>Our goal is to create a healthy community through patient-focused care, modern medical practices, and a strong commitment to medical ethics and quality service.</p>
      <b className='text-gray-800 text-lg'>Our Vision</b>
      <p>To be a leading healthcare provider known for our innovative approach, compassionate care, and commitment to improving the lives of individuals and communities.</p>
    </div>
  </div>
</div>




{/**Why choose us */}

<div className='text-xl my-4 mt-5'>
  <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
</div>

<div className='flex flex-col md:flex-row mb-20 gap-8'>
  <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#3760a3] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md'>
    <b className='text-lg font-bold text-gray-800'>Efficiency</b>
    <p>We offer quick and effective solutions to ensure that you get the best service with minimal wait time. Efficiency is at the core of our operations.</p>
  </div>

  <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#3760a3] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md '>
    <b className='text-lg font-bold text-gray-800'>Convenience</b>
    <p>Our services are designed for ease of use, ensuring a seamless and convenient experience for all of our patients and clients.</p>
  </div>

  <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#3760a3] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md'>
    <b className='text-lg font-bold text-gray-800'>Personalization</b>
    <p>We provide personalized care and services tailored to your specific needs, making sure that every experience is uniquely yours.</p>
  </div>
</div>


    </div>
  )
}

export default About
