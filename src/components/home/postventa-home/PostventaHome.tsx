'use client'

import { FormPostventa } from '@/components/forms/FormPostventa';
import { TitleHome } from '@/components/ui/my-ui/TitleHome';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

export const PostVentaHome = () => {

  // efecto hover en las cards
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // estado del formulario
  const [openForm, setOpenForm] = useState<'service' | 'accesorios' | 'repuestos' | null>(null);

  // Configuración dinámica del formulario
  const formConfig = {
    service: {
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
    <div className='container m-auto px-3 mt-10'>
      <TitleHome title="Sabemos lo que tu auto necesita" />
      <div className=' flex flex-col sm:grid sm:grid-rows-3 sm:grid-flow-col gap-4 h-[500px]  mb-10'>
        <div
          onClick={() => setOpenForm('service')}
          style={{ backgroundImage: `url('/images/postventa-home/postventa-service.webp')` }}
          className={`relative h-[300px] sm:h-auto sm:row-span-3 flex justify-center items-center bg-slate-300 bg-cover bg-center postventa-home-item rounded-xl overflow-hidden cursor-pointer`}
          onMouseEnter={() => setHoveredLink('service')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <h3 className='absolute text-white text-3xl sm:text-4xl font-bold z-20 uppercase'>Service</h3>
          <div className={`absolute top-0 left-0 h-full w-full transition-all duration-200   ${hoveredLink === 'service' ? 'bg-[#09165583] backdrop-blur-sm' : 'bg-[#09165583] '} z-10 transition-all`}></div>


        </div>

        <div
          onClick={() => setOpenForm('accesorios')}
          style={{ backgroundImage: `url('/images/postventa-home/postventa-accesorios.webp')` }}
          className='relative h-[300px] sm:h-auto sm:col-span-2 flex justify-center items-center bg-[center_center_2rem] bg-slate-200 bg-cover rounded-lg overflow-hidden cursor-pointer'
          onMouseEnter={() => setHoveredLink('accesorios')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <ChevronDown size={24} className='text-white z-20' />
          <h3 className='absolute text-white text-3xl sm:text-4xl font-bold z-20 uppercase'>Accesorios</h3>
          <div className={`absolute top-0 left-0 h-full w-full transition-all duration-200   ${hoveredLink === 'accesorios' ? 'bg-[#09165583] backdrop-blur-sm' : 'bg-[#09165583] '} z-10 transition-all`}></div>
        </div>

        <div
          onClick={() => setOpenForm('repuestos')}
          style={{ backgroundImage: `url('/images/postventa-home/postventa-repuestos.webp')` }}
          className='relative h-[300px] sm:h-auto sm:row-span-2 sm:col-span-2 flex justify-center items-center bg-slate-400 bg-cover rounded-lg overflow-hidden group cursor-pointer'
          onMouseEnter={() => setHoveredLink('repuestos')}
          onMouseLeave={() => setHoveredLink(null)}
        >


          <h3 className={`absolute text-white text-3xl sm:text-4xl font-bold z-20 uppercase flex flex-col justify-center items-center `}>Repuestos {/* <ChevronDown size={60} className='text-white z-20 sm:translate-y-72 sm:group-hover:translate-y-20 transition-all hidden sm:block' strokeWidth={1} /> */}</h3>
          <div className={`absolute top-0 left-0 h-full w-full transition-all duration-200  ${hoveredLink === 'repuestos' ? 'bg-[#09165583] backdrop-blur-sm' : 'bg-[#09165583]'} z-10 transition-all`}></div>
        </div>
      </div>

      {openForm && (
        <FormPostventa
          titleForm={formConfig[openForm].titleForm}
          serviceForm={formConfig[openForm].serviceForm} // esto se manda a la api para ver el servicio correspondiente en el mail
          isOpen={true}
          setIsOpen={(value) => setOpenForm(value ? openForm : null)}
        />
      )}
    </div>
  );
};
