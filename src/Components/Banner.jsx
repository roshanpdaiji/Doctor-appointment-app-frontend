import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
  // Call useNavigate inside the functional component
  const navigate = useNavigate();

  return (
    <div 
      className="banner-container" 
      style={{ backgroundColor: '#3760a3' }} // Inline CSS for background color
    >
      {/* Flex container for left and right sections */}
      <div className='flex items-center justify-between my-20 md:mx-10'>
        
        {/* Left side */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p>Book Appointments</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
          </div>

          <button 
            onClick={() => { 
              navigate('/login'); 
              window.scrollTo(0, 0); // Scroll to the top after navigation
            }}  
            className='bg-white text-gray-600 px-8 py-3 rounded-full mt-4 md:mt-0 hover:bg-gray-600 hover:text-white transition-all duration-300'
            style={{ marginTop: '20px' }}  // Increase button margin
          >
            Create Account
          </button>

        </div>

        {/* Right Side */}
        <div className='hidden md:block md:w-1/2 lg:w-[420px] relative'> {/* Ensure image size is maintained */}
          <img className='w-full h-auto max-w-full' src="https://sinanghealth.com/wp-content/uploads/2023/12/doc-3.png" alt="Doctor" />
        </div>

      </div>
    
    </div>
  );
}

export default Banner;
