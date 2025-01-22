import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../Components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

function Appointment() {
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0);

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

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotBooked =
          docInfo?.slots_booked?.[slotDate]?.includes(slotTime) ?? false;

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          booked: isSlotBooked,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment');
      return navigate('/login');
    }

    try {
      if (
        !docSlots ||
        !Array.isArray(docSlots) ||
        docSlots.length === 0 ||
        slotIndex < 0 ||
        slotIndex >= docSlots.length
      ) {
        toast.error('Invalid or unavailable slot');
        return;
      }

      const slotDetails = docSlots[slotIndex]?.find(
        (slot) => slot.time === slotTime
      );

      if (!slotDetails || slotDetails.booked) {
        toast.error('Slot is already booked or invalid');
        return;
      }

      const date = new Date(slotDetails.datetime);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime: slotDetails.time },
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Appointment booked successfully!');
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message || 'Failed to book the appointment.');
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message || 'An unexpected error occurred.'}`);
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
      <div className="bg-gray-100 min-h-screen">
        
        <Navbar />
        
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start">
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


        <div className="mt-6 p-4">
          <p className="text-2xl font-bold text-gray-700">Booking Slots</p>
          <div className="flex gap-4 mt-4 overflow-auto">
            {docSlots.length > 0 &&
              docSlots.map((slots, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`cursor-pointer p-2 rounded-lg shadow-md text-center text-sm font-semibold transition duration-200 ease-in-out transform ${
                    slotIndex === index
                      ? 'bg-primary text-white scale-105'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {slots[0]?.datetime.toDateString()}
                </div>
              ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {docSlots[slotIndex]?.map((slot, idx) => (
              <div
                key={idx}
                onClick={() => !slot.booked && setSlotTime(slot.time)}
                className={`cursor-pointer p-2 rounded-lg shadow-md text-center transition duration-200 ease-in-out transform text-sm font-medium ${
                  slot.booked
                    ? 'bg-red-400 text-white cursor-not-allowed'
                    : slot.time === slotTime
                    ? 'bg-primary text-white scale-105'
                    : 'hover:bg-black hover:text-white bg-gray-200 text-gray-600'
                }`}
              >
                {slot.time}
                {slot.booked && <p className="text-xs">(Booked)</p>}
              </div>
            ))}
          </div>
          <button
            onClick={bookAppointment}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md font-bold transition duration-200 ease-in-out hover:bg-primary-dark"
          >
            Book Appointment
          </button>
        </div>



        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;




