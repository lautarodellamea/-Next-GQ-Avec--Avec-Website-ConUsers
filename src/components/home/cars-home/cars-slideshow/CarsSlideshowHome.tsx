'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './CarsSlideshowHome.css';

import { TitleHome } from '@/components/ui/my-ui/TitleHome';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Car } from '@/interfaces';
import Image from 'next/image';

interface Props {
  cars: Car[];
}

export const CarsSlideshowHome = ({ cars }: Props) => {

  return (
    <div className="CarsSlideshowHome container m-auto p-3 mt-24 mb-24 flex flex-col">

      {/* <TitleHome className='text-center' title="Usados Destacados de Avec" /> */}
      <TitleHome className='text-center' title="Descubrí nuestros usados destacados Avec" />

      <div>
        <Swiper
          style={{
            width: '100%',
            // height: '350px'
            // paddingLeft: '80px',
            // paddingRight: '80px',
            '--swiper-navigation-color': '#fff',
            // '--swiper-pagination-color': '#fff',


            '--swiper-navigation-size': '20px',

            // '--swiper-pagination-bullet-inactive-opacity': '0.5',

          } as React.CSSProperties}
          pagination
          navigation={true}
          autoplay={{
            delay: 3000
          }}
          loop={true}



          modules={[FreeMode, Navigation, Autoplay, Pagination]}

          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            // cuando la ventana sea >= 320px
            500: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // cuando la ventana sea >= 640px
            730: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            // cuando la ventana sea >= 1024px
            900: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            // cuando la ventana sea >= 1280px
            1280: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >

          {
            cars.map(car => (
              <SwiperSlide key={car.slug} className='shadow-lg '>
                <Link href={`/car/${car.slug}`} className='relative w-full  flex flex-col justify-between bg-[#ededed]'>
                  {/* TODO: VERE IMAGEN DEFAULT / VER DE DONDE SACO LA URL UNA VEZ DEPLOY */}
                  <Image width={500} height={500} src={`/images/usados/${car.images?.[0] ?? 'default.jpg'}`} alt={car.slug} className=' h-[200px] object-cover' />
                  <h4 className='pl-4 pr-4 mt-2 text-avecBlueColorDark text-base font-bold truncate uppercase'>{car.brand.name} {car.modelName} - {car.year}</h4>
                  <div className='flex flex-row gap-1 px-4 text-gray-500 '>

                    <p className='text-xs truncate '>{Number(car.km).toLocaleString('es-ES')} km - {car.transmission} - {car.fuelType}</p>

                  </div>
                  <span className='bg-avecLightBlueColor pt-2 pb-2 text-center text-white font-bold text-2xl mt-2 transition-all'>${Number(car.price).toLocaleString('es-ES')}</span>

                </Link>
              </SwiperSlide>
            ))
          }

        </Swiper>
      </div>

      <div className='hidden mq-450px:flex  flex-row items-center mt-8 self-center group border-[2px] border-avecLightBlueColor px-8 py-2 text-avecLightBlueColor transition-all cursor-pointer hover:bg-avecLightBlueColor rounded-sm hover:text-white '>
        <Link className='text-xl text-center  font-semibold ' href="/usados">Ver todos los usados destacados </Link>
        {/* <ChevronRight size={30} className='text-avecBlueColorDark transition-all group-hover:translate-x-1' /> */}
      </div>

      <div className=' mq-450px:hidden flex flex-row items-center mt-8 self-center group border-[1px] border-avecLightBlueColor px-6 py-1 text-avecLightBlueColor transition-all cursor-pointer hover:bg-avecLightBlueColor rounded-sm hover:text-white '>
        <Link className='text-base text-center  font-semibold ' href="/usados">Ver todos</Link>
        {/* <ChevronRight size={30} className='text-avecBlueColorDark transition-all group-hover:translate-x-1' /> */}
      </div>
    </div>
  );
}
