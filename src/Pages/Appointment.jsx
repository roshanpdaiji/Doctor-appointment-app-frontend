import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../Components/RelatedDoctors';


function Appointment() {
  // Get doc id
  const { docId } = useParams();
  console.log(docId)
  const { doctors } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // const fetchDocInfo = () => {
  //   const docInfo = doctors.find(doc => doc._id === docId);
  //   setDocInfo(docInfo);
  // };


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);  // Check if the doctor info is found
  };
  
  
  const getAvailableSlots = () => {
    setDocSlots([]);

    // Get the current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set the end time for the day
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0);

      // Adjust start time
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };


  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);


  
  return (
    docInfo && (
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Doctor Details */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start">
            {/* Doctor Image */}
            <div className="w-full max-w-[300px] sm:max-w-[350px]">

            <img
  src={docInfo.image}
  alt="Doctor"
  className="w-[300px] h-[400px] rounded-lg object-cover bg-primary shadow-2xl"
/>


            </div>

            {/* Doctor Info */}
            <div className="text-center sm:text-left flex flex-col items-center sm:items-start border border-gray-600 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 w-full">
              <p className="text-xl font-bold flex items-center gap-2 text-2xl font-medium text-gray-color">
                {docInfo.name}
                <img
                  src="https://cdn.shopify.com/s/files/1/0595/7805/6888/files/Tick.png?v=1686537304"
                  alt="Verified"
                  className="inline-block w-5 h-5 ml-2"
                />
              </p>
              <div className="text-sm text-gray-600 mt-2">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="text-indigo-500 border px-4 py-2 rounded mt-2">
                  {docInfo.experience} years of experience
                </button>
              </div>

              <div className="mt-6 text-center sm:text-left flex flex-col items-start">
                <p className="font-semibold mb-2">
                  <i
                    className="fa-solid fa-circle-info"
                    style={{ color: '#0f0f10' }}
                  ></i>
                  About
                </p>
                <p className="text-gray-500 mt-2 max-w-[700px]">
                  {docInfo.about}
                </p>
              </div>

              <p className="text-gray-500 font-medium mt-4">
                Appointment fee:{' '}
                <span className="text-gray-600">{docInfo.fees}</span>
              </p>
            </div>
          </div>
        </div>


{/* Booking Slots */}
<div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 mb-[100px]">
  <p className="text-2xl font-semibold mb-4">Booking Slots</p>

  {/* Date Slots */}
  <div className="flex gap-4 items-center w-full overflow-x-auto mt-4">
    {docSlots.length > 0 &&
      docSlots.map((slots, index) => (
        <div
          onClick={() => setSlotIndex(index)}
          key={index}
          className={`text-center py-4 px-6 min-w-24 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
            slotIndex === index
              ? 'bg-primary text-white'
              : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          <p className="font-semibold text-lg">
            {daysOfWeek[slots[0]?.datetime.getDay()]}
          </p>
          <p className="text-sm text-gray-500">
            {slots[0]?.datetime.toLocaleDateString()}
          </p>
        </div>
      ))}
  </div>

  {/* Time Slots */}
  <div className="flex gap-4 mt-6 overflow-x-auto">
    {docSlots.length > 0 &&
      docSlots[slotIndex]?.map((item, index) => (
        <p
          key={index}
          onClick={() => setSlotTime(item.time)}
          className={`text-sm font-medium px-5 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
            item.time === slotTime
              ? 'bg-primary text-white'
              : 'text-gray-600 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          {item.time.toLowerCase()}
        </p>
      ))}
  </div>


  <button className="bg-[#8a2be2] text-white text-lg font-bold px-14 py-3 rounded-full my-6">
  Book an Appointment
  <i className="fa-solid fa-arrow-right-long p-2" style={{ color: "#efeff1" }}></i>
</button>

        </div>



{/**Related Doctors */}

<RelatedDoctors docId={docId} speciality={docInfo.speciality}/>



      </div>
    )
  );
}

export default Appointment;
