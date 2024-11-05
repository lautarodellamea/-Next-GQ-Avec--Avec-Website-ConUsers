'use client'

import React, { useState } from 'react'
import { Car } from '@/interfaces'
import { FormCarUsado } from '../forms/FormCarUsado'

import './slideshow-mobile.css';
import { useRouter } from 'next/navigation';

interface Props {
  car: Car
}

export const CarInfo = ({ car }: Props) => {
  const router = useRouter()

  const [openForm, setOpenForm] = useState<string | null>(null);


  return (
    <div className='mySwiper2-info'>

      <div className='hidden 2xl:block'>
        <p className='font-medium'>{car.year} | {Number(car.km).toLocaleString('es-ES')} km</p>
        <h1 className={`antialiased font-bold text-4xl uppercase`}>{car.brand.name} {car.modelName}</h1>
        <h3 className="text-3xl font-light uppercase">{car.modelVersion}</h3>
        <div className="flex items-center gap-2  mt-4 mb-4">
          <p className="font-extrabold text-2xl lg:text-4xl xl:text-5xl">ARS</p>
          <p className="font-extrabold text-2xl lg:text-4xl xl:text-5xl">{Number(car.price).toLocaleString('es-ES')}</p>
        </div>
      </div>

      <div className='border-[1px] border-avecLightBlueColor p-2 mt-[163px] xl:mt-[173px] 2xl:mt-0'>
        <div >
          <p className='mb-2 mt-2 text-xl font-bold xl:pl-6 underline'>Caracteristicas:</p>
          <div className='grid grid-cols-2 gap-4 p-1  xl:px-10 pt-2'>
            <div>
              <p className="font-medium">Kilometraje:</p>
              <p className="font-bold uppercase">{Number(car.km).toLocaleString('es-ES')}</p>
            </div>
            <div>
              <p className="font-medium">Color:</p>
              <p className="font-bold uppercase">{car.color}</p>
            </div>
            <div>
              <p className="font-medium">Año</p>
              <p className="font-bold uppercase">{car.year}</p>
            </div>
            <div>
              <p className="font-medium">Combustible:</p>
              <p className="font-bold uppercase">{car.fuelType === "N/A" ? "-" : car.fuelType}</p>
            </div>
            <div>
              <p className="font-medium">Motor:</p>
              <p className="font-bold uppercase">{car.engine === "N/A" ? "-" : car.engine}</p>
            </div>
            <div>
              <p className="font-medium">Puertas:</p>
              <p className="font-bold uppercase">{car.doors}</p>
            </div>
            <div>
              <p className="font-medium">Transmisión</p>
              <p className="font-bold uppercase">{car.transmission === "N/A" ? "-" : car.transmission}</p>

            </div>
            <div>
              <p className="font-medium">Categoría</p>
              <p className="font-bold uppercase">{car.bodyStyle === "N/A" ? "-" : car.bodyStyle}</p>
            </div>
          </div>
        </div>

        {/* V2 */}
        <div className='flex gap-1'>
          <button
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
            className="border-[1px] border-avecLightBlueColor w-full text-avecLightBlueColor self-end font-bold py-2 px-2  text-xs hover:bg-avecLightBlueColor hover:text-white transition-all mt-6">
            Volver atrás
          </button>
          <button
            onClick={() => setOpenForm('usado')}
            className='border-[1px] border-avecLightBlueColor bg-avecLightBlueColor w-full text-white self-end font-bold py-2 px-2  text-xs hover:bg-avecBlueColor hover:border-avecBlueColor hover:text-white transition-all mt-6 '>
            Consultar
          </button>

        </div>

        {/*  <button
          onClick={() => setOpenForm('usado')}
          className='bg-avecLightBlueColor w-full mt-4 text-white py-2 font-bold hover:bg-avecBlueColor transition-all'>
          Contactanos
        </button> */}
      </div>

      {/* <button
        onClick={(e) => {
          e.preventDefault()
          router.back()
        }}
        className="border-[1px] border-avecLightBlueColor w-full text-avecLightBlueColor self-end font-bold py-2 px-2  text-xs hover:bg-avecLightBlueColor hover:text-white transition-all mq-1000px:mt-36 mq-1150px:mt-36">
        Volver atrás
      </button> */}




      <FormCarUsado
        titleForm={`Vehículo ${car.brand.name.toUpperCase()} ${car.modelName.toUpperCase()}`}
        serviceForm={`Usados ${car.brand.name} ${car.modelName} ${car.modelVersion}`}
        isOpen={openForm === 'usado'}
        setIsOpen={(value) => setOpenForm(value ? 'usado' : null)}
      />


    </div >
  )
}
