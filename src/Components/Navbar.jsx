import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="navbar-container container-fluid">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src="https://th.bing.com/th/id/OIP.iKDeReBEG5P1yjsbpSJ8BQHaHa?rs=1&pid=ImgDetMain"
        alt="Logo"
        className="navbar-logo"
      />

      {/* Desktop Menu */}
      <ul className="navbar-menu hidden md:flex items-start gap-5 font-medium">
        <li>
          <NavLink to="/home">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/doctors">ALL DOCTORS</NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/contact">CONTACT</NavLink>
        </li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="rounded-full w-8"
              src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt=""
            />
            <img
              className="w-5 h-5"
              src="https://icon-library.com/images/dropdown-icon/dropdown-icon-14.jpg"
              alt=""
            />

            <div className="absolute top-0 right pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">
                  My Appointments
                </p>
                <p onClick={() => setToken(false)} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="navbar-button">
            Create Account
          </button>
        )}

        {/* Hamburger Icon for Mobile */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden m-2 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/660/660015.png"
          alt="Open Menu"
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? 'fixed w-full h-screen' : 'hidden'
          } md:hidden right-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex justify-between items-center p-4">
            <img
              onClick={() => navigate('/')}
              src="https://th.bing.com/th/id/OIP.iKDeReBEG5P1yjsbpSJ8BQHaHa?rs=1&pid=ImgDetMain"
              alt="Logo"
              className="w-20"
            />
            <img
              onClick={() => setShowMenu(false)}
              className="w-6 cursor-pointer"
              src="https://cdn3.iconfinder.com/data/icons/e-commerce-simple-ui-elements/100/TWalsh__close1-512.png"
              alt="Close Menu"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink 
  to="/home" 
  onClick={() => setShowMenu(false)} 
  className="px-4 py-2 rounded inline-block hover:bg-gray-200"
>
  <p className="text-black">HOME</p>
</NavLink>

<NavLink 
  to="/doctors" 
  onClick={() => setShowMenu(false)} 
  className="px-4 py-2 rounded inline-block hover:bg-gray-200"
>
  <p className="text-black">ALL DOCTORS</p>
</NavLink>

<NavLink 
  to="/about" 
  onClick={() => setShowMenu(false)} 
  className="px-4 py-2 rounded inline-block hover:bg-gray-200"
>
  <p className="text-black">ABOUT</p>
</NavLink>

<NavLink 
  to="/contact" 
  onClick={() => setShowMenu(false)} 
  className="px-4 py-2 rounded inline-block hover:bg-gray-200"
>
  <p className="text-black">CONTACT</p>
</NavLink>

</ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
