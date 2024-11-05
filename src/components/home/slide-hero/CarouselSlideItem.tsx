import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface Props {
  id: number
  text: string
  classNme?: string,
  btnHref: string
}

export const CarouselSlideItem = ({ id, text, classNme, btnHref }: Props) => {



  const backgroundImage = `url('/images/carousel-hero/hero-img-${id}.webp')`;
  return (
    <div
      // className={`embla__slide bg-[url('/images/hero-img-prueba-${id}.webp')] bg-fixed bg-center bg-cover relative`}
      className={`embla__slide bg-fixed bg-center bg-cover relative ${classNme}`}
      style={{ backgroundImage, height: '100%' }}

    >
      <div className='carousel-texts container m-auto absolute flex flex-col gap-2  pl-[5%] pr-8 sm:pr-0 bottom-32 sm:ml-[5%]  max-w-[550px] xl:max-w-[650px] select-none z-20'>
        <p className=' text-white text-2xl  font-bold sm:text-2xl xl:text-3xl '>{text}</p>

        <Link href={btnHref}>  <Button variant="avecHeroBtn" className='bg-avecLightBlueColor' >Ver más</Button></Link>
      </div>
      <div className='absolute top-0 left-0 h-full  w-full bg-black opacity-30 z-10'></div>
    </div>
  )
}
