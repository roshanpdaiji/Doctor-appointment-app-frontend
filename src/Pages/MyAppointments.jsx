import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../Components/Navbar';

function MyAppointments() {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <Navbar />

      <h1 className='pb-4 mt-12 font-semibold text-3xl text-zinc-800 border-b-4  mb-8 m-3'>
  My Appointments
</h1>

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            className='grid grid-cols-[1fr_2fr] sm:grid-cols-3 gap-6 py-6 border-b border-zinc-200'
            key={index}
          >
            <div className='flex justify-center'>
              <img className='w-52 h-42 object-cover rounded-lg bg-indigo-50' src={item.image} alt={item.name} />
            </div>

            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold text-lg'>{item.name}</p>
              <p className='text-neutral-600'>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-2'>Address</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-xs mt-2'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25 July 2002 | 8:30 PM
              </p>
            </div>

            <div className='flex flex-col gap-4 justify-center'>
              <button className='text-sm text-white bg-blue-600 hover:bg-blue-700 text-center py-2 rounded-md border border-blue-600 transition duration-300 ease-in-out'>
                Pay Online
              </button>

              <button className='text-sm text-white bg-red-600 hover:bg-red-700 text-center py-2 rounded-md border border-red-600 transition duration-300 ease-in-out'>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;





