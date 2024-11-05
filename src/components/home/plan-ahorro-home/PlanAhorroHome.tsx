import { Button } from '@/components/ui/button'
import { TitleHome } from '@/components/ui/my-ui/TitleHome'
import Link from 'next/link'
import React from 'react'

export const PlanAhorroHome = () => {
  return (
    <div className='container m-auto p-3 pt-10'>
      <TitleHome title="Tu próximo 0 km de la mano de Avec" />

      <div className='rounded-xl bg-center overflow-hidden bg-[url("/images/plan-ahorro/bg-plan-ahorro-01.webp")] sm:bg-center   bg-cover bg-no-repeat text-white w-full py-16 relative h-[500px] p-4  sm:pl-8 flex flex-col justify-between mq-600px:justify-center '>


        <div className='absolute top-0 left-0 h-full  w-full bg-black opacity-50 z-10'></div>

        <h4 className='text-2xl font-bold  z-20 leading-6 mb-6 mq-400px:mb-2 mq-400px:text-3xl mq-400px:leading-8 mq-400px:max-w-[600px]'>Tu nuevo vehículo está más cerca de lo que crees.</h4>
        {/*  <p className='max-w-[800px] pr-20 mb-1'>
          Tu próximo 0km está mas cerca de lo que crees. 
        </p> */}
        <div className='relative z-20'>
          <p className='max-w-[800px] pr-20 z-20 leading-4 text-[14px] mq-400px:text-lg mq-400px:leading-normal mq-400px:max-w-[600px]'>
            ¿Estás listo para el cambio? Empezá el nuevo camino hacia tu 0 km con nuestros planes de ahorro, con cuotas accesibles y opciones a tu medida.
          </p>
          <Link href="/planes"><Button variant="outline" className="bg-tranparent text-white mt-4 relative z-20" >Quiero mi plan</Button></Link>
        </div>

      </div>


    </div >
  )
}
