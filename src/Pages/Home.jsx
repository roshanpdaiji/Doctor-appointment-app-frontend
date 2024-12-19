import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import SpecialityMenu from '../Components/SpecialityMenu'
import TopDoctors from '../Components/TopDoctors'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'




function Home() {
  return (
  

    <>
      
       {/* Render Navbar at the top of the app */}
       <Navbar />
       
       <Header/>

<SpecialityMenu/>

<TopDoctors/>

<Banner/>



       
           </>
  )
}

export default Home
