'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Car } from "@/interfaces"




interface Props {
  car: Car
}

export const CardGridItem = ({ car }: Props) => {

  const [displayImage, setDisplayImage] = useState(car.images?.[0] ?? 'default.jpg')

  return (
    <Link href={`/car/${car.slug}`} className="rounded-md overflow-hidden fade-in h-max-[500px] bg-[#ededed]">
      <div className="h-[130px] sm:h-[200px] 2xl:h-[250px]">
        <Image
          src={`/images/usados/${displayImage}`}
          alt={car.slug}
          className="object-cover w-full h-full"
          width={400}
          height={400}

          onMouseEnter={() => setDisplayImage(car.images?.[1] ?? 'default.jpg')}
          onMouseLeave={() => setDisplayImage(car.images?.[0] ?? 'default.jpg')}
        />
      </div>



      <div className="relative flex flex-col sm:flex-col 2xl:flex-row  2xl:justify-between items-start  p-2 overflow-hidden ">
        <div className="flex flex-col md:px-2">
          <div className="flex flex-col sm:flex-row sm:gap-1">
            <p className="text-sm sm:text-lg font-bold text-avecBlueColor truncate uppercase">{car.brand.name === "citroen" ? "CITROËN" : car.brand.name}</p>
            <p className="text-sm sm:text-lg font-bold text-avecBlueColor truncate uppercase"> {car.modelName}</p>
            <p className="text-[10px] sm:text-lg font-bold text-avecBlueColor truncate hidden sm:inline lg:hidden 2xl:inline"> - {car.year}</p>
          </div>

          <div className="flex flex-row gap-1  text-sm w-[200px]">
            <p className='text-[10px] sm:text-xs truncate sm:hidden'>{car.year}</p>
            <p className='text-[10px] sm:text-xs truncate sm:hidden'>-</p>
            <p className='text-[10px] sm:text-xs truncate'>{Number(car.km).toLocaleString('es-ES')} km</p>
            <p className='text-[10px] sm:text-xs hidden sm:inline truncate'>-</p>
            <p className='text-[10px] sm:text-xs hidden sm:inline truncate'>{car.transmission === "automatico" ? "automático" : car.transmission}</p>
            <p className='text-[10px] sm:text-xs truncate '>- {car.fuelType}</p>
            {/* <p className="text-sm truncate">{Number(car.km).toLocaleString('es-ES')} km  </p>
            <p> | </p>
            <p>{car.transmission}</p>
            <p className="hidden sm:block"> | </p>
            <p className="hidden sm:block">{car.fuelType}</p> */}
          </div>

          <span className="text-sm font-bold  text-avecBlueColorDark sm:text-xl 2xl:mt-2">$ {Number(car.price).toLocaleString('es-ES')}</span>


        </div>
        <div className="w-full 2xl:w-fit 2xl:absolute 2xl:bottom-0 2xl:right-0 mt-2  sm:pb-2 2xl:p-4  ">

          <p className="text-[10px] sm:text-sm w-full 2xl:w-fit text-white p-1 bg-avecLightBlueColor 2xl:px-2 2xl:mt-2 hover:bg-avecBlueColor text-center">Ver más</p>

        </div>
      </div>



    </Link >
  )
}