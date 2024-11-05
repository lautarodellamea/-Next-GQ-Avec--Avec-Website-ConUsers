import React from 'react'
import { TitleHome } from '../my-ui/TitleHome'

interface Props {
  title: string
  className?: string
  imgBg: string
}

export const Banner = ({ title, imgBg, className }: Props) => {
  return (
    <div
      style={{ backgroundImage: `url("/images/${imgBg}")` }}
      className={`bg-cover bg-fixed bg-center h-[250px] sm:h-[400px] w-full flex items-center justify-center mb-4 sm:mb-6 relative p-3 ${className}`}>
      <div className='absolute top-0 left-0 h-full w-full bg-black opacity-50'></div>

      <TitleHome title={title} className="text-white container text-center mt-20 z-20 text-xl sm:text-2xl text-balance" />
    </div>
  )
}
