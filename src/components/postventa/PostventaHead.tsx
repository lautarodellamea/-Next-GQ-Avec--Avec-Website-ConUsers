import React from 'react'

export const PostventaHead = () => {
  return (
    <div className='flex flex-col  gap-4 sm:gap-10 container m-auto p-3 pb-0'>
      <h3 className='text-2xl sm:text-4xl font-bold text-avecBlueColor'>Tu auto, nuestro compromiso: bienvenido al servicio de postventa</h3>
      <div className='flex xl:flex-row flex-col-reverse gap-4 sm:gap-10 justify-between'>
        <div className='flex-1 flex flex-col gap-4'>
          <h4 className='text-2xl sm:text-3xl font-semibold '>¿Por qué elegirnos?</h4>
          <p>Porque en nuestros concesionarios te brindamos el cuidado que tu auto necesita, con <strong>calidad y excelencia de quienes son especialistas</strong></p>
          <p>En <strong>AVEC</strong> entendemos que tu vehículo es más que un medio de transporte, es parte de tu estilo de vida. Por eso lo damos todo por tu auto, en la reparación, en el cuidado y en el mantenimiento.</p>
          <p>Nos dedicamos a ofrecerte un <strong>servicio de Postventa de calidad</strong> que te dé seguridad y te mantenga siempre en movimiento.</p>
        </div>
        <div className='flex-2 h-[250px] sm:w-full xl:w-[700px] bg-[url("/images/postventa/postventa-img.webp")] bg-cover bg-center'>

          {/* <img className='object-fill' src="/images/postventa/postventa-img.webp" alt="" /> */}
        </div>
      </div>
    </div>
  )
}
