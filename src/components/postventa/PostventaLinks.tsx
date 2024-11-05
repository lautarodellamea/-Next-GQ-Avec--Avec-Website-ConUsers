
'use client'

import React, { useState } from 'react'

import "./Postventa.css"
import { FormPostventa } from '../forms/FormPostventa'

export const PostventaLinks = () => {


  const [openForm, setOpenForm] = useState<'postventa' | 'accesorios' | 'repuestos' | null>(null);

  // Configuración dinámica del formulario
  const formConfig = {
    postventa: {
      titleForm: "Service",
      serviceForm: "service"
    },
    accesorios: {
      titleForm: "Accesorios",
      serviceForm: "accesorios"
    },
    repuestos: {
      titleForm: "Repuestos",
      serviceForm: "repuestos"
    }
  };

  return (

    <div className='mb-2 container m-auto p-3 xl:mt-6'>
      <h4 className='text-2xl text-center sm:text-left sm:text-3xl mb-4 leading-6  font-semibold'>¿Qué servicio estás buscando?</h4>

      <div className='flex gap-2 text-white flex-col sm:grid md:grid-cols-3  md:flex-row md:gap-0 md:container md:m-auto'>

        <div
          onClick={() => setOpenForm('postventa')}
          style={{ backgroundImage: `url('/images/postventa-home/postventa-service.webp')` }}
          className='relative p-4 h-[200px] md:h-[350px] bg-cover bg-center transition-all flex justify-center items-center sm:items-start sm:justify-start sm:flex-col sm:pt-20 md:items-center overflow-hidden group cursor-pointer'
        >
          <div className='absolute top-0 left-0 h-full w-full bg-[#09165590]  group-hover:backdrop-blur-sm transition-all'></div>
          <h4 className='text-3xl sm:text-4xl font-bold uppercase z-20 md:top-10 relative group-hover:top-0 transition-all duration-300 '>Service</h4>
          <p className='hidden sm:block text-right  md:text-center z-20 transform translate-y-[300px]  group-hover:translate-y-[0px] transition-all duration-300 max-w-[400px]'>Tené la tranquilidad de un servicio efectivo y de excelencia.</p>
        </div>

        <div
          onClick={() => setOpenForm('accesorios')}
          style={{ backgroundImage: `url('/images/postventa-home/postventa-accesorios.webp')` }}
          className='relative p-4 h-[200px] md:h-[350px] bg-cover bg-center transition-all flex justify-center items-center sm:items-start sm:pt-20 sm:justify-start sm:flex-col md:items-center overflow-hidden group cursor-pointer'
        >
          <div className='absolute top-0 left-0 h-full w-full bg-[#09165590]  group-hover:backdrop-blur-sm transition-all'></div>
          <h4 className='text-3xl sm:text-4xl font-bold uppercase z-20 md:top-10 relative group-hover:top-0 transition-all duration-300'>Accesorios</h4>
          <p className='hidden sm:block md:text-center z-20 transform translate-y-[300px]  group-hover:translate-y-[0px] transition-all duration-300 max-w-[400px]'>Dale a tu auto un ese toque único, que van a llevar a tu experiencia de manejo al siguiente nivel.</p>
        </div>

        {/* <Link href="#" */}
        <div
          onClick={() => setOpenForm('repuestos')}
          style={{ backgroundImage: `url('/images/postventa-home/postventa-repuestos.webp')` }}
          className='relative p-4 h-[200px] md:h-[350px] bg-cover bg-center transition-all flex justify-center items-center sm:items-start sm:pt-20 sm:flex-col sm:justify-start md:items-center overflow-hidden group cursor-pointer'
        >
          <div className='absolute top-0 left-0 h-full w-full bg-[#09165590]  group-hover:backdrop-blur-sm transition-all'></div>
          <h4 className='text-3xl sm:text-4xl font-bold uppercase z-20 md:top-10 relative group-hover:top-0 transition-all duration-300'>Repuestos</h4>
          <p className='hidden sm:block  md:text-center z-20 transform translate-y-[300px]  group-hover:translate-y-[0px] transition-all duration-300 max-w-[400px]'>Te garantizamos la durabilidad y el rendimiento que esperas con repuestos diseñados específicamente para tu modelo.</p>
        </div>



      </div>



      {openForm && (
        <FormPostventa
          titleForm={formConfig[openForm].titleForm}
          serviceForm={formConfig[openForm].serviceForm}
          isOpen={true}
          setIsOpen={(value) => setOpenForm(value ? openForm : null)}
        />
      )}
    </div >

  )

}


