
'use client'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slideshow-mobile.css';
import Image from 'next/image';

interface Props {
  images: string[]
  title: string
  className?: string
}

export const CarMobileSlideshow = ({ images, title, className }: Props) => {



  return (
    <div className={className}>




      <Swiper
        pagination
        navigation={true}
        autoplay={{
          delay: 3000
        }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map(image => (
          <SwiperSlide
            key={image}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={`/images/usados/${image}`}
              alt={title}
              width={1920} // Resolución para pantallas grandes
              height={500} // Altura de la imagen para mantener proporción
              style={{
                width: '100vw',  // Ancho completo de la pantalla
                objectFit: 'cover'  // Ajusta la imagen para que cubra el contenedor sin distorsión
              }}
              className="mySwiper2-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
