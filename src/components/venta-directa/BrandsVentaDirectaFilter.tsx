/* eslint-disable @next/next/no-img-element */
'use client'

import { useFilterStore } from '@/store';
import React from 'react'

export const BrandsVentaDirectaFilter = () => {
  // Accede a singleSelectedBrand y setSingleBrand desde el store
  const singleSelectedBrand = useFilterStore((state) => state.singleSelectedBrand);
  const setSingleBrand = useFilterStore((state) => state.setSingleBrand);
  const resetFilters = useFilterStore((state) => state.resetFilters);



  const handleSelect = (brand: string) => {
    // Cambia la marca única seleccionada en el store
    setSingleBrand(brand);
  };

  return (
    <>
      <p className='text-sm text-center sm:text-xl mb-4 sm:mb-8 opacity-80'>
        Seleccioná el 0 km de la marca de tu interés
      </p>

      <div className="flex flex-row gap-2 justify-around xl:justify-center xl:gap-20 items-center mb-4">

        {/* Peugeot */}
        <div
          onClick={() => handleSelect("peugeot")}
          className="group cursor-pointer relative w-[100px] sm:w-[150px] h-[90px] sm:h-[150px] sm: transition-transform duration-200"
        >
          <div className={`bg-black rounded-md flex justify-center items-center w-full h-full transition-opacity duration-200 ${singleSelectedBrand === 'peugeot' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
            <img className="h-[80px] sm:h-[140px] w-[150px] sm:w-[130px]" src="/images/logos/Logo_Peugeot-01.svg" alt="Peugeot" />
          </div>
          <img
            className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-500  ${singleSelectedBrand === 'peugeot' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            src="/images/logos/Logo_Peugeot-01.svg"
            alt="Peugeot"
          />
        </div>

        {/* Citroën */}
        <div
          onClick={() => handleSelect("citroen")}
          className="group cursor-pointer relative w-[100px] sm:w-[150px] h-[90px] sm:h-[150px] sm: transition-transform duration-200"
        >
          <div className={`bg-black rounded-md flex justify-center items-center w-full h-full transition-opacity duration-200 ${singleSelectedBrand === 'citroen' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
            <img className="h-[80px] sm:h-[140px] w-[150px] sm:w-[140px] " src="/images/logos/Logo Citroën_2022_Isologo_white vertical.svg" alt="Citroën" />
          </div>
          <img
            className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-500 ${singleSelectedBrand === 'citroen' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            src="/images/logos/Logo Citroën_2022_Isologo_black vertical.svg"
            alt="Citroën"
          />
        </div>

        {/* DS */}
        <div
          onClick={() => handleSelect("ds")}
          className="group cursor-pointer relative w-[100px] sm:w-[150px] h-[90px] sm:h-[150px] sm: transition-transform duration-200"
        >
          <div className={`bg-black rounded-md flex justify-center items-center w-full h-full transition-opacity duration-200 ${singleSelectedBrand === 'ds' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
            <img className="h-[80px] sm:h-[140px] w-[150px] sm:w-[150px] " src="/images/logos/DS_Logo-08.svg" alt="DS" />
          </div>
          <img
            className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-500 ${singleSelectedBrand === 'ds' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            src="/images/logos/DS_Logo-07.svg"
            alt="DS"
          />
        </div>

        {/* Fiat */}
        <div
          onClick={() => handleSelect("fiat")}
          className="group cursor-pointer relative w-[100px] sm:w-[150px] h-[90px] sm:h-[150px] sm: transition-transform duration-200"
        >
          <div className={`bg-black rounded-md flex justify-center items-center w-full h-full transition-opacity duration-200 ${singleSelectedBrand === 'fiat' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
            <img className="h-[80px] sm:h-[140px] w-[150px] sm:w-[140px]" src="/images/logos/Logo_Fiat_white.svg" alt="Fiat" />
          </div>
          <img
            className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-500 ${singleSelectedBrand === 'fiat' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            src="/images/logos/Logo_Fiat.svg"
            alt="Fiat Plan"
          />
        </div>

      </div>

      {
        singleSelectedBrand && (
          <div className=" flex flex-row gap-2 justify-around xl:justify-center xl:gap-32 items-center mb-8">
            <button onClick={() => resetFilters()} className="transition-all hover:bg-avecLightBlueColor border-[1px] border-avecLightBlueColor text-avecLightBlueColor hover:text-white font-medium py-1 px-4 rounded">Mostrar todas las marcas</button>
          </div>
        )
      }


    </>
  );
};
