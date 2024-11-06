'use client'

import Image from "next/image"
import { useState } from "react"
import { Car } from "@/interfaces"
import { FormCarPlan } from "@/components/forms/FormCarPlan"



interface Props {
  car: Car
}

export const CardGridItemPlanes = ({ car }: Props) => {

  const [openForm, setOpenForm] = useState<string | null>(null);

  return (
    <div className="relative cursor-pointer flex flex-col justify-between fade-in h-max-[350px] w-max-[350px] bg-[#ededed]">


      {/* title */}
      <div className=" relative flex flex-col items-center justify-center pt-2 z-20">
        <p className="group-hover:transform group-hover:scale-125   group-hover:-translate-y-8 transition-all text-[10px] text-center sm:text-xl sm:mt-2  font-bold sm:font-extrabold text-avecBlueColor truncate uppercase">{car.brand.name === "citroen" ? "CITROËN" : car.brand.name} {car.modelName} </p>
      </div>




      {/* img */}
      <div className="w-auto px-1 md:p-6 md:pt-2 group z-20 relative">

        {/* <img src={`/images/nuevos/${car.images[0]}`} alt={car.titulo}
          className="object-cover w-full group-hover:transform group-hover:scale-110 transition-all z-40" /> */}

        <Image
          onClick={() => setOpenForm('plan')}
          src={`/images/nuevos/${car.images?.[0] ?? 'default.jpg'}`}
          alt={car.slug}
          className="drop-shadow-2xl object-cover w-full group-hover:transform group-hover:scale-110  group-hover:-translate-y-2 transition-all z-40"
          width={800}
          height={800}

        />
      </div>


      {/* btn */}
      {/* <div className="h-[30px]"></div> */} {/* espacio */}
      {/* <p onClick={() => setOpenForm('plan')} className=" absolute bottom-0  w-full md:py-3 sm:font-bold text-sm sm:text-base text-white p-1 bg-avecLightBlueColor 2xl:px-2 hover:bg-avecBlueColor text-center cursor-pointer">Conocer más</p> */}

      <div onClick={() => setOpenForm('plan')} className="mt-auto">
        <p className="m-2 md:py-3 sm:font-bold text-sm sm:text-base text-white border-[1px] border-avecLightBlueColor p-1 2xl:px-2 bg-avecLightBlueColor hover:border-avecBlueColor hover:bg-avecBlueColor transition-all hover:text-white text-center cursor-pointer">
          Conocer más
        </p>
      </div>



      <FormCarPlan
        titleForm={`Vehículo ${car.brand.name === "citroen" ? "citroën".toUpperCase() : car.brand.name.toUpperCase()} ${car.modelName.toUpperCase()}`}
        serviceForm={`Plan de ahorro: ${car.brand.name === "citroen" ? "citroën" : car.brand.name} ${car.modelName} ${car.modelVersion}`}
        isOpen={openForm === 'plan'}
        setIsOpen={(value) => setOpenForm(value ? 'plan' : null)}
      />


    </div >
  )
}