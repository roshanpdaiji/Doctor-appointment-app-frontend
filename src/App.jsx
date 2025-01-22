import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Doctors from './Pages/Doctors';
import Login from './Pages/Login';
import About from './Pages/About';
import Contact from './Pages/Contact';
import MyAppointments from './Pages/MyAppointments';
import Appointment from './Pages/Appointment';
import MyProfile from './Pages/MyProfile';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar'; // Import your custom Navbar here, if you have one
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      
      {/* Ensure some margin/padding to avoid content hiding under the Navbar */}
      <div className="main-content mx-4 sm:mx-[10%]">
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>
      </div>
      
      <Footer /> {/* Footer at the bottom */}
    </>
  );
}

export default App;
