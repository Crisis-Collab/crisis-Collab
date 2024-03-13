import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import img4 from "../../../assets/img3.jpeg";


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './News.css'

import { Parallax, Pagination, Navigation } from 'swiper/modules';

const News = () => {
  return (
    <div className='m-4  rounded-2xl shadow-2xl'>
        
        <div className='h-72'>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper rounded-3xl m-4"
      >
        <div
          slot="container-start"
          className="parallax-bg  "
          // style={{
          //   'background-image':
          //     'url("/src/assets/img7.jpg")',
          // }}
          data-swiper-parallax="-23%"
        ></div>
       
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            News Headline
          </div>
          <div className="subtitle text-xs m-2" data-swiper-parallax="-200">
            01/12/24, Wednesday
          </div>
          <div className="text-base w-1/2 " data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
            
          </div>
          <img src={img4} alt="Your Image" className=" p-6 relative ml-96 bottom-56 left-96 h-56" />
       
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            News Headline
          </div>
          <div className="subtitle text-xs m-2" data-swiper-parallax="-200">
            01/12/24, Wednesday
          </div>
          <div className="text-base w-1/2 " data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
            
          </div>
          <img src={img4} alt="Your Image" className=" p-6 relative ml-96 bottom-56 left-96 h-56" />
       
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            News Headline
          </div>
          <div className="subtitle text-xs m-2" data-swiper-parallax="-200">
            01/12/24, Wednesday
          </div>
          <div className="text-base w-1/2 " data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
            
          </div>
          <img src={img4} alt="Your Image" className=" p-6 relative ml-96 bottom-56 left-96 h-56" />
       
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            News Headline
          </div>
          <div className="subtitle text-xs m-2" data-swiper-parallax="-200">
            01/12/24, Wednesday
          </div>
          <div className="text-base w-1/2 " data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
            
          </div>
          <img src={img4} alt="Your Image" className=" p-6 relative ml-96 bottom-56 left-96 h-56" />
       
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            News Headline
          </div>
          <div className="subtitle text-xs m-2" data-swiper-parallax="-200">
            01/12/24, Wednesday
          </div>
          <div className="text-base w-1/2 " data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
            
          </div>
          <img src={img4} alt="Your Image" className=" p-6 relative ml-96 bottom-56 left-96 h-56" />
       
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            News Headline
          </div>
          <div className="subtitle text-xs m-2" data-swiper-parallax="-200">
            01/12/24, Wednesday
          </div>
          <div className="text-base w-1/2 " data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
            
          </div>
          <img src={img4} alt="Your Image" className=" p-6 relative ml-96 bottom-56 left-96 h-56" />
       
        </SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}

export default News
