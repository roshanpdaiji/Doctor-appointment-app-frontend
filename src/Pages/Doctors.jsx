import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


function Doctors() {
  const { speciality } = useParams();  // Get route parameter 'speciality'

  // Accessing doctors from AppContext
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const [showFilter, setShowFilter] = useState(false)

  const navigate = useNavigate();  // Import useNavigate to navigate programmatically

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();  // Apply filter when doctors or speciality change
  }, [doctors, speciality]);

  return (
    <div className='mb-5'>
      {/* Render Navbar at the top of the app */}
      <Navbar />

      <p className='text-gray-600 font-bold mt-3 mb-3'>Browse through doctors' specialties.</p>


      {/* Specialities list */}
      <div className='flex flex-col sm:flex-row items-start gap-5'>

        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ' '}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>

        <div className={`flex flex-col gap-4 text-sm text-gray-600 mt-3 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={`w-[94] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${speciality === 'General Physician' ? 'bg-indigo-100 text-black font-bold text-lg' : 'text-lg'}`} style={{ display: 'inline-block' }}>General Physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black font-bold text-lg' : 'text-lg'}`} style={{ display: 'inline-block' }}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black font-bold text-lg' : 'text-lg'}`} style={{ display: 'inline-block' }}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')} className={`w-[94] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${speciality === 'Pediatrician' ? 'bg-indigo-100 text-black font-bold text-lg' : 'text-lg'}`} style={{ display: 'inline-block' }}>Pediatrician</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black font-bold text-lg' : 'text-lg'}`} style={{ display: 'inline-block' }}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black font-bold text-lg' : 'text-lg'}`} style={{ display: 'inline-block' }}>Gastroenterologist</p>

        </div>

        {/* Render filtered doctor cards in a grid layout with 5 columns on larger screens */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}

              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[400px] object-cover bg-blue-50"
              />
              <div className="p-4">
                <div className="doctor-availability flex items-center gap-2 text-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  <p style={{ color: item.available ? 'green' : 'red' }}>
                    {item.available ? 'Available' : 'Not Available'}
                  </p>
                </div>

                <p className="doctor-name text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
                <p className="doctor-speciality text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
