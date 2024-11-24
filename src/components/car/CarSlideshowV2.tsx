'use client'

import { Car } from '@/interfaces';
import ReactImageGallery from 'react-image-gallery';


interface Props {
  car: Car
  className?: string
}


export const CarSlideshowV2 = ({ car, className }: Props) => {


  // Construye el array de imágenes
  // const images = (car.images ?? []).map((image) => ({
  //   original: image,
  //   thumbnail: `/images/usados/${image}` || image,
  // }));

  const images = (car.images ?? []).length > 0
    ? car.images?.map((image) => {
      const isCloudinaryImage = image.startsWith("https://res.cloudinary.com");

      return {
        original: isCloudinaryImage ? `${image}` : `/images/usados/${image}`,
        thumbnail: isCloudinaryImage ? `${image}` : `/images/usados/${image}`,
      };
    })
    : [
      {
        original: "/images/placeholder.jpg", // Imagen predeterminada
        thumbnail: "/images/placeholder.jpg", // Thumbnail predeterminado
      },
    ];


  return (
    <div className={`${className}`}>


      {/*  <pre>
        {JSON.stringify(images, null, 2)}
      </pre> */}


      <div className='2xl:hidden'>

        <p className='font-medium'>{car.year} | {Number(car.km).toLocaleString('es-ES')} km</p>
        <h1 className={`antialiased font-bold text-4xl uppercase`}>{car.brand.name} {car.modelName}</h1>
        <h3 className="text-3xl font-light uppercase">{car.modelVersion}</h3>
        <div className="flex items-center gap-2  mt-4 mb-4">
          <p className="font-extrabold text-2xl lg:text-4xl xl:text-5xl">ARS</p>
          <p className="font-extrabold text-2xl lg:text-4xl xl:text-5xl">{Number(car.price).toLocaleString('es-ES')}</p>
        </div>
      </div>
      <div className=''><ReactImageGallery items={images} /></div>
    </div>

  );
};