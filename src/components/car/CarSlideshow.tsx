'use client'
import { useState } from 'react';


// Import Swiper React components
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from 'next/image';
import { Car } from '@/interfaces';





interface Props {
  car: Car
  images: string[]
  className?: string
}


export const CarSlideshow = ({ car, images, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();


  return (
    <div className={`CarSlideshow ${className} max-w-[800px]`}>

      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          maxHeight: '600px',
          // maxWidth: '700px'
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000
        }}
        thumbs={{ swiper: thumbsSwiper }}
        // thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}, // si me da error (ya se soluciono)
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >

        {
          images.map(image => (
            <SwiperSlide className='cursor-pointer' key={image}>
              <Image
                src={`/images/usados/${image}`}
                alt={car.slug}
                width={1024}
                height={800}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }


      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map(image => (
            <SwiperSlide className='cursor-pointer' key={image}>
              <Image
                src={`/images/usados/${image}`}
                alt={car.slug}
                width={300}
                height={300}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div >

  );
};