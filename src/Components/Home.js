import React from 'react';
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import ResultsAdpater from './ResultsAdapter';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "./Assets/img1.png";
import img2 from "./Assets/img2.png";
import img3 from "./Assets/img3.png";
import logo from "./Assets/Logo.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";



const Home = () => {
  const { user,logOut } = useUserAuth();
  const navigate = useNavigate();

  console.log(user);
  const handleLogOut = async() =>
  {
    try
    {
      await logOut();
      navigate("/");
    }
    catch(err)
    {
      console.log(err.message);
    }
  }
  return (
    <>
    
    <div className = "p-4 box mt-3 text-center">Hello Welcome
    <br/>
    {user && user.email}
    </div>

    <div id="menu">
      <ul>
      <li><a href="http://localhost:3000/home">Home</a></li> 
      <li><a href="http://localhost:3000/poll">Create Poll</a></li> 
      <li><a href="http://localhost:3000/vote">Cast Vote</a></li> 
      <li><a href="http://localhost:3000/ResultsAdapter">Poll Results</a></li> 
      </ul>
    </div>
    
    
  
    <div styles={{'flex': 1}}>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={img1} alt="img1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} alt="img2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} alt="img3" />
          </SwiperSlide>

        </Swiper>
      </div>
      <div >
      <div className='d-grid gap-2'>
        <Button variant= "primary" onClick={handleLogOut} >Log out</Button>
    </div>
        
      </div>



    </>
  )
};

export default Home;
