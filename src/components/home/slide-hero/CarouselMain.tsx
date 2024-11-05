// import { slideHero as SLIDES } from '@/data'
import './base.css'
import CarouselHero from './CarouselHero'
import './embla.css'


import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export const CarouselMain = () => {
  return (
    <CarouselHero slides={SLIDES} options={OPTIONS} className="relative basis-3/4" />
  )
}
