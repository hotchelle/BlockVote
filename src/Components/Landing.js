import React, { useRef, useState, Button } from "react";
// Import Swiper React components
import { Form } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";

import img1 from "./Assets/img1.png";
import img2 from "./Assets/img2.png";
import img3 from "./Assets/img3.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export default function App() {
  return (
    <div>
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
        
      </div>

    </div>
  );
}