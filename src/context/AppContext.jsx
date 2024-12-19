import { createContext } from "react";
import doctors from '../assets/doctors';  // Ensure you have this file and data


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const value = {
    doctors,
  };

  return (
    <AppContext.Provider value={value}>  {/* Fixed syntax here */}
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
