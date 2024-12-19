import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function TopDoctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div id='top-doctors' className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Explore our list of highly qualified and experienced doctors ready to assist you.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div 
          onClick={() => {
            navigate(`/appointment/${item._id}`);  // Navigate to the appointment page
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });  // Smoothly scroll to the top
          }}
            key={index} 
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[300px] object-cover bg-blue-50"
            />
            <div className="p-4">
              <div className="doctor-availability flex items-center gap-2 text-sm text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="doctor-name text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
              <p className="doctor-speciality text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/doctors')} 
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>
        More
      </button>
    </div>
  );
}

export default TopDoctors;