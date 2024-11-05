
'use client'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slideshow-mobileV2.css';
import { Car } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormCarUsado } from '../forms/FormCarUsado';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import './slideshow-mobileV2.css';


interface Props {
  car: Car
  images: string[]
  className?: string
}

export const CarMobileSlideshowV2 = ({ car, images, className }: Props) => {

  const [openForm, setOpenForm] = useState<string | null>(null);

  const router = useRouter()

  return (
    <div className={className}>

      <div>
        <div className='flex justify-between'>

          <div className='flex flex-col'>
            <h1 className={`antialiased font-extrabold text-xl leading-5  mq-450px:text-3xl uppercase`}>{car.brand.name}</h1>
            <h1 className={`antialiased font-extrabold text-xl leading-5  mq-450px:text-3xl uppercase`}>{car.modelName}</h1>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
            className="h-fit text-avecLightBlueColor border-[1px] border-avecLightBlueColor font-semibold py-1 px-2  mq-450px:py-2 mq-450px:px-4 rounded text-[10px] mq-450px:text-xs mb-2 hover:bg-avecLightBlueColor hover:text-white transition-all">
            Volver atrás
          </button>
        </div>

        <div className='flex flex-row items-center gap-1 sm:gap-2 mb-4 mt-1'>
          <h3 className="text-xs mq-450px:text-lg  sm:text-xl font-semibold uppercase">{car.modelVersion}</h3>
          <h3 className="text-xs mq-450px:text-lg sm:text-base text-gray-500 ">|</h3>
          <p className='text-xs mq-450px:text-lg sm:text-xl text-gray-500 '>{car.year} - {Number(car.km).toLocaleString('es-ES')} km</p>
        </div>
      </div>



      <div className='CarSlideshowUsed'>
        <Swiper


          style={{
            width: '100%',
            // height: '350px'
            // paddingLeft: '80px',
            // paddingRight: '80px',
            '--swiper-navigation-color': '#191d30',
            '--swiper-pagination-color': '#fff',


            '--swiper-navigation-size': '20px',

            // '--swiper-pagination-bullet-inactive-opacity': '0.5',

          } as React.CSSProperties}
          pagination
          navigation={true}
          autoplay={{
            delay: 3000
          }}


          modules={[FreeMode, Navigation, Autoplay, Pagination]}

          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            // cuando la ventana sea >= 320px
            // 500: {
            //   slidesPerView: 2,
            //   spaceBetween: 10,

            // },
            // cuando la ventana sea >= 640px
            // 730: {
            //   slidesPerView: 3,
            //   spaceBetween: 5,
            // },
            // cuando la ventana sea >= 1024px
            // 900: {
            //   slidesPerView: 4,
            //   spaceBetween: 5,
            // },
            // cuando la ventana sea >= 1280px
            // 1280: {
            //   slidesPerView: 5,
            //   spaceBetween: 10,
            // },
          }}
        >


          {
            images.map(image => (
              <SwiperSlide key={image} className='shadow-lg '>
                <div className='relative w-full  flex flex-col justify-between bg-[#ededed]'>
                  <img src={`/images/usados/${image ?? 'default.jpg'}`} alt={image} className='h-[200px] mq-300px:h-[250px] mq-350px:h-[300px] mq-400px:h-[350px] mq-450px:h-[400px] mq-650px:h-[450px] mq-750px:h-[500px] mq-850px:h-[550px]  mq-900px:h-[600px] object-cover' />

                </div>
              </SwiperSlide>
            ))
          }

        </Swiper>
      </div>


      <div className="flex items-center gap-2  mt-4 mb-3">
        <p className="font-extrabold text-2xl mq-450px:text-2xl">ARS</p>
        <p className="font-extrabold text-2xl mq-450px:text-5xl">{Number(car.price).toLocaleString('es-ES')}</p>
      </div>

      <button
        onClick={() => setOpenForm('usado')}
        className='bg-avecLightBlueColor w-full h-[52px]  text-white py-2 font-bold hover:bg-avecBlueColor transition-all'>
        Consultar
      </button>

      <Accordion type="single" collapsible className="w-full border-[1px] border-avecLightBlueColor mt-2 -py-1">
        <AccordionItem value="item-1">
          <AccordionTrigger >
            <div className='relative text-center flex justify-center text-md font-bold w-full pl-[38px]'>Características</div>
          </AccordionTrigger>
          <AccordionContent>
            <div >
              <div className='grid grid-cols-2 mq-450px:grid-cols-3 mq-450px:text-md gap-4 p-4  xl:px-10 pt-2'>
                <div>
                  <p className="font-medium">Kilometraje:</p>
                  <p className="font-bold capitalize">{Number(car.km).toLocaleString('es-ES')}</p>
                </div>
                <div>
                  <p className="font-medium">Color:</p>
                  <p className="font-bold capitalize">{car.color}</p>
                </div>
                <div>
                  <p className="font-medium">Año</p>
                  <p className="font-bold capitalize">{car.year}</p>
                </div>
                <div>
                  <p className="font-medium">Combustible:</p>
                  <p className="font-bold capitalize">{car.fuelType === "N/A" ? "-" : car.fuelType}</p>
                </div>
                <div>
                  <p className="font-medium">Motor:</p>
                  <p className="font-bold capitalize">{car.engine === "N/A" ? "-" : car.engine}</p>
                </div>
                <div>
                  <p className="font-medium">Puertas:</p>
                  <p className="font-bold capitalize">{car.doors}</p>
                </div>
                <div>
                  <p className="font-medium">Transmisión</p>
                  <p className="font-bold capitalize">{car.transmission === "N/A" ? "-" : car.transmission}</p>

                </div>
                <div>
                  <p className="font-medium">Categoría</p>
                  <p className="font-bold capitalize">{car.bodyStyle === "N/A" ? "-" : car.bodyStyle}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>








      <FormCarUsado
        titleForm={`Vehiculo ${car.brand.name.toUpperCase()} ${car.modelName.toUpperCase()}`}
        serviceForm={`Usados ${car.brand.name} ${car.modelName} ${car.modelVersion}`}
        isOpen={openForm === 'usado'}
        setIsOpen={(value) => setOpenForm(value ? 'usado' : null)}
      />
    </div >
  );
};
