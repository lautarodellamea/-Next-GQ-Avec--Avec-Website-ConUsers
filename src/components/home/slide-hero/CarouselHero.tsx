'use client'

import { EmblaOptionsType } from 'embla-carousel'


import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { CarouselSlideItem } from './CarouselSlideItem'
import { useEffect, useState } from 'react'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  className?: string
}


const CarouselHero: React.FC<PropType> = () => {
  // const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 })
  ])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)


  // para cambiar imagen de marcas en mobile y desktop
  const [slideId, setSlideId] = useState(6);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideId(7);
      } else {
        setSlideId(6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="embla w-full relative">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container h-full">

          <CarouselSlideItem
            text="Tenemos una amplia gama de modelos 0 km para que encuentres tu mejor opción."
            id={slideId}
            btnHref="autos-0km"
          />

          <CarouselSlideItem
            text="¿Listo para el cambio? Descubrí los planes de ahorro que tenemos para vos, y llevate tu próximo auto."
            id={2}
            btnHref="planes"
          />

          <CarouselSlideItem
            id={3}
            text="Encontrá variedad y precio en nuestra selección de USADOS."
            btnHref="usados"
          />

          <CarouselSlideItem
            text="Conocé nuestro servicio de Postventa."
            id={8}
            btnHref="postventa"
          />

        </div>
      </div>

      <div className="embla__controls flex flex-col justify-between items-center w-full">
        <div className="embla__buttons absolute flex justify-between w-full">
          <PrevButton className='embla__button ' onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton className='embla__button mx-3 size-10 rounded-[1rem] sm:size-12  flex items-center justify-center' onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarouselHero

