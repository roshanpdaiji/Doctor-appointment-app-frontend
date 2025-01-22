import React from 'react';
import './Header.css';  // Importing the external CSS file

function Header() {
  return (
    <div className='header-container py-16 mt-12'> {/* Outer box with light color */}
      
      {/* Container with the blue background for the inner box */}
      <div className='header-inner-container max-w-7xl mx-auto flex flex-col md:flex-row items-center rounded-lg px-6 md:px-10 lg:px-20 py-12'>
        
        {/* Left side content */}
        <div className='flex flex-col items-start justify-center gap-6 md:w-1/2'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br /> With Trusted Doctors
          </p>
          
          <div className='text-lg text-white font-light'>
            {/* Doctors images list */}
            <div className='flex gap-4 mb-6'>
              <img className='w-12 h-12 rounded-full border-2 border-white' src="https://randomuser.me/api/portraits/men/1.jpg" alt="Doctor 1" />
              <img className='w-12 h-12 rounded-full border-2 border-white' src="https://randomuser.me/api/portraits/men/2.jpg" alt="Doctor 2" />
              <img className='w-12 h-12 rounded-full border-2 border-white' src="https://randomuser.me/api/portraits/men/3.jpg" alt="Doctor 3" />
            </div>
            Simply browse through our list of trusted doctors and choose the best one for your healthcare needs. We ensure quality and care with every appointment.
          </div>
          

<a href="#top-doctors" className="book-appointment-btn flex items-center">
  Book Appointment
  <img className='w-4 ml-2 transform rotate-0' src="https://img.icons8.com/ios-filled/50/000000/long-arrow-right.png" alt="arrow-icon" />
</a>



          
        </div>

        {/* Right side image */}
        <div className='md:w-1/2 relative mt-10 md:mt-0'>
        <div className="w-full overflow-hidden">
  <img
    className="w-full h-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-xl m-5"
    src="https://thumbs.dreamstime.com/b/your-health-fundamental-to-us-all-portrait-group-medical-practitioners-standing-together-hospital-254601548.jpg"
    alt="Doctors Group"
  />
</div>

        </div>

      </div>
    </div>
  );
}

export default Header;
