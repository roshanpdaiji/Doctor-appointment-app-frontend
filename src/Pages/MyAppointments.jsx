import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MyAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [
    " ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];



  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  
const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);

        // Update the appointment's cancelled state in your local state
        setAppointments((prevAppointments) =>
          prevAppointments.map((item) =>
            item._id === appointmentId ? { ...item, cancelled: true } : item
          )
        );

        getUserAppointments();  // Refresh the appointments
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log('Payment Response:', response);
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            { razorpay_order_id: response.razorpay_order_id },
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointments();
            navigate('/my-appointments');
            toast.success('Payment Successful');
          } else {
            toast.error('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          toast.error(error.response?.data?.message || 'Something went wrong');
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        console.log('Razorpay Order:', data.order);
        initPay(data.order); // Handle successful order creation
      } else {
        toast.error(data.message || 'Payment initialization failed.');
      }
    } catch (error) {
      console.error('Error initializing Razorpay payment:', error);
      toast.error('An error occurred while processing payment.');
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments(); // Call the async function correctly
    }
  }, [token]);

  return (
    <div>
      <Navbar />

      <h1 className="pb-4 mt-12 font-semibold text-3xl text-zinc-800 border-b-4 mb-8 m-3">
        My Appointments
      </h1>

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {appointments.slice(0, 10).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] sm:grid-cols-3 gap-6 py-6 border-b border-zinc-200"
            key={index}
          >
            <div className="flex justify-center">
              {/* Use item.docData instead of docData */}
              <img
                src={item.docData?.image || 'https://via.placeholder.com/150'}
                alt="Doctor Image"
                className="w-40 h-56 object-cover rounded-lg bg-indigo-50"
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold text-lg">{item.docData?.name}</p>
              <p className="text-neutral-600">{item.docData?.speciality}</p>
              <p className="text-zinc-700 font-medium mt-2">Address</p>
              {item.docData?.address ? (
                <>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>
                </>
              ) : (
                <p className="text-xs text-gray-500">Address not available</p>
              )}

              <p className="text-xs mt-2">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {item.payment && !item.cancelled && (
              <button className="sm:min-w-48 py-2 px-4 border-2 border-green-500 rounded text-green-500 hover:bg-green-100 hover:text-green-700 transition duration-300 ease-in-out text-sm font-semibold">
                Paid
              </button>
            )}

            <div className="flex flex-col gap-4 justify-center">
              {!item.cancelled && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 text-center py-2 rounded-md border border-blue-600 transition duration-300 ease-in-out"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && (  // Show button only if appointment is not cancelled
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-white bg-red-600 hover:bg-red-700 text-center py-2 rounded-md border border-red-600 transition duration-300 ease-in-out"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <button className="sm:min-w-48 py-2 px-4 border-2 border-red-500 rounded text-red-500 hover:bg-red-100 hover:text-red-700 transition duration-300 ease-in-out text-sm font-semibold">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
