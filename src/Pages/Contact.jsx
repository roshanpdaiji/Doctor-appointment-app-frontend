import React from 'react'
import Navbar  from '../Components/Navbar'

function Contact() {
  return (
    <div>

      <Navbar/>


      <div className='my-10 flex flex-col md:flex-row gap-12 justify-center items-center'>
  <div className='w-full md:w-1/3'>
    <img
      className='w-full h-[400px] rounded-lg shadow-lg object-cover'  // Adjusted the height to 100px more than original
      src="https://luzatomedicalgroup.com/wp-content/uploads/2020/06/urologist-in-New-York-City.jpg"
      alt="Urologist in New York City"
    />
  </div>

  <div className='w-full md:w-2/3 flex flex-col gap-6 text-center md:text-left'>
    <p className='text-gray-600'>
      We are here to help and answer any questions you might have. Reach out to us, and we will get back to you as soon as possible.
    </p>
    <p className='text-gray-600'>
      Our team is always ready to assist with any queries related to our services. Whether you have a question about availability, bookings, or services, we're happy to provide all the details.
    </p>
    
    <p className='text-gray-800 font-bold'>
      Address: <span className='text-gray-600'>123 Healthcare Ave, Medical City, State, Zip Code</span>
    </p>
    <p className='text-gray-800 font-bold'>
      Email: <span className='text-gray-600'>contact@healthcare.com</span>
    </p>
    <p className='text-gray-800 font-bold'>
      Phone: <span className='text-gray-600'>(123) 456-7890</span>
    </p>
    <p className='text-gray-600'>
      We also have job openings in various departments. Click below to explore opportunities and join our team.
    </p>

    <div className='text-center md:text-left'>
      <button
        className='border border-black text-white px-6 py-2 rounded-lg mt-4 bg-black hover:bg-gray-800 transition-all duration-300'
      >
        Explore Jobs
      </button>
    </div>
  </div>
</div>



    </div>
  )
}

export default Contact
