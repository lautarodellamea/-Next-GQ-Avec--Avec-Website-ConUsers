'use client'

import Image from "next/image";
import { useState } from "react";
import { Car } from "@/interfaces";
import { FormCarPlan } from "@/components/forms/FormCarPlan";

interface Props {
  car: Car;
}

export const CarGridItemVentaDirecta = ({ car }: Props) => {
  const [openForm, setOpenForm] = useState<string | null>(null);

  return (
    <div className="relative cursor-pointer flex flex-col justify-between fade-in w-full border-[1px] border-avecLightBlueColor">
      {/* title */}
      <div className="relative flex flex-col items-center justify-center pt-2 z-20">
        <p className="group-hover:transform group-hover:scale-125 group-hover:-translate-y-8 transition-all text-[10px] text-center sm:text-xl sm:mt-2 font-bold sm:font-extrabold text-avecBlueColor truncate uppercase">
          {car.brand.name === "citroen" ? "CITROËN" : car.brand.name} {car.modelName}
        </p>
      </div>

      {/* img */}
      <div className="flex-grow w-auto px-1 md:p-6 md:pt-2 group z-20 relative" onClick={() => setOpenForm('venta-directa')}>
        <Image
          src={`/images/nuevos/${car.images?.[0] ?? 'default.jpg'}`}
          alt={car.slug}
          className="drop-shadow-2xl object-cover w-full  group-hover:transform group-hover:scale-110 group-hover:-translate-y-2 transition-all z-40"
          width={800}
          height={800}
        />
      </div>

      {/* btn */}
      <div className="mt-auto" onClick={() => setOpenForm('venta-directa')}>
        <p className="m-2 md:py-3 sm:font-bold text-sm sm:text-base text-gray-500 border-[1px] border-gray-400 p-1 2xl:px-2 hover:bg-avecLightBlueColor hover:border-avecLightBlueColor transition-all hover:text-white text-center cursor-pointer">
          Conocer más
        </p>
      </div>

      <FormCarPlan
        titleForm={`Vehiculo ${car.brand.name === "citroen" ? "CITROËN" : car.brand.name.toUpperCase()} ${car.modelName.toUpperCase()}`}
        serviceForm={`Venta directa: ${car.brand.name === "citroen" ? "CITROËN" : car.brand.name} ${car.modelName} ${car.modelVersion}`}
        isOpen={openForm === 'venta-directa'}
        setIsOpen={(value) => setOpenForm(value ? 'venta-directa' : null)}
      />
    </div>
  );
};
