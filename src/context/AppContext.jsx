import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;  // Make sure this is defined correctly in the .env file

  const [doctors, setDoctors] = useState([]);

  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)


  const [userData,setUserData]=useState(null)


  const getDoctorsData = async () => {
    try {
      // Ensure the URL is correct by adding the slash only if necessary
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching doctor data.");
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
      console.log("API Response: ", data); // Log the response
      if (data.success) { // Check the correct key (should be success, not succes)
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching user profile: ", error); // Log the error
      toast.error(error.message);
    }
  };
  
  

  const value = {
    doctors,getDoctorsData,
    token,setToken,
    backendUrl,
    userData,setUserData,
    loadUserProfileData
  };

  

  useEffect(() => {
    getDoctorsData();
  }, []);


  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }
    else{
      setUserData(false)
    }
  },[token])



  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
