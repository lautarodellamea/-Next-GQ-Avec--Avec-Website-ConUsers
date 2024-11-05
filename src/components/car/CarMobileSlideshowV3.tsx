'use client';


import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./slideshow-mobileV3.css";



import { Car } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormCarUsado } from '../forms/FormCarUsado';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  car: Car;
  className?: string;
}

export const CarMobileSlideshowV3 = ({ car, className }: Props) => {
  const [openForm, setOpenForm] = useState<string | null>(null);
  const router = useRouter();

  // Construye el array de imágenes
  const images = (car.images ?? []).map((image) => ({
    original: `/images/usados/${image}`,
    thumbnail: `/images/usados/${image}`,
  }));

  return (
    <div className={className}>
      <div>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <h1 className='antialiased font-extrabold text-xl leading-5 mq-450px:text-3xl uppercase'>{car.brand.name}</h1>
            <h1 className='antialiased font-extrabold text-xl leading-5 mq-450px:text-3xl uppercase'>{car.modelName}</h1>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="h-fit text-avecLightBlueColor border-[1px] border-avecLightBlueColor font-semibold py-1 px-2 mq-450px:py-2 mq-450px:px-4 rounded text-[10px] mq-450px:text-xs mb-2 hover:bg-avecLightBlueColor hover:text-white transition-all">
            Volver atrás
          </button>
        </div>

        <div className='flex flex-row items-center gap-1 sm:gap-2 mb-4 mt-1'>
          <h3 className='text-xs mq-450px:text-lg sm:text-xl font-semibold uppercase'>{car.modelVersion}</h3>
          <h3 className='text-xs mq-450px:text-lg sm:text-base text-gray-500'>|</h3>
          <p className='text-xs mq-450px:text-lg sm:text-xl text-gray-500'>{car.year} - {Number(car.km).toLocaleString('es-ES')} km</p>
        </div>
      </div>



      <div className=''>
        <ImageGallery
          items={images}
          additionalClass="my-custom-gallery"
        />
      </div>

      <div className='flex items-center gap-2 mt-4 mb-3'>
        <p className='font-extrabold text-2xl mq-450px:text-2xl'>ARS</p>
        <p className='font-extrabold text-2xl mq-450px:text-5xl'>{Number(car.price).toLocaleString('es-ES')}</p>
      </div>

      <button
        onClick={() => setOpenForm('usado')}
        className='bg-avecLightBlueColor w-full h-[52px] text-white py-2 font-bold hover:bg-avecBlueColor transition-all'>
        Consultar
      </button>

      <Accordion type="single" collapsible className="w-full border-[1px] border-avecLightBlueColor mt-2 -py-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className='relative text-center flex justify-center text-md font-bold w-full pl-[38px]'>Características</div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='grid grid-cols-2 mq-450px:grid-cols-3 mq-450px:text-md gap-4 p-4 xl:px-10 pt-2'>
              <div>
                <p className="font-medium">Kilometraje:</p>
                <p className="font-bold capitalize">{Number(car.km).toLocaleString('es-ES')}</p>
              </div>
              <div>
                <p className="font-medium">Color:</p>
                <p className="font-bold uppercase">{car.color}</p>
              </div>
              <div>
                <p className="font-medium">Año</p>
                <p className="font-bold uppercase">{car.year}</p>
              </div>
              <div>
                <p className="font-medium">Combustible:</p>
                <p className="font-bold uppercase">{car.fuelType === "N/A" ? "-" : car.fuelType}</p>
              </div>
              <div>
                <p className="font-medium">Motor:</p>
                <p className="font-bold uppercase">{car.engine === "N/A" ? "-" : car.engine}</p>
              </div>
              <div>
                <p className="font-medium">Puertas:</p>
                <p className="font-bold uppercase">{car.doors}</p>
              </div>
              <div>
                <p className="font-medium">Transmisión</p>
                <p className="font-bold uppercase">{car.transmission === "N/A" ? "-" : car.transmission}</p>
              </div>
              <div>
                <p className="font-medium">Categoría</p>
                <p className="font-bold uppercase">{car.bodyStyle === "N/A" ? "-" : car.bodyStyle}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <FormCarUsado
        titleForm={`Vehículo ${car.brand.name.toUpperCase()} ${car.modelName.toUpperCase()}`}
        serviceForm={`Usados ${car.brand.name} ${car.modelName} ${car.modelVersion}`}
        isOpen={openForm === 'usado'}
        setIsOpen={(value) => setOpenForm(value ? 'usado' : null)}
      />
    </div>
  );
};
