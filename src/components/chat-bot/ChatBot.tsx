'use client'

import React from 'react';
import { useChatBotStore } from '@/store';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sleep } from '@/utils';

const brands = ["peugeot", "citroën", "ds", "fiat"];
const services = ["venta directa", "usados", "plan de ahorro", "postventa"];
const locations = ["córdoba", "buenos aires", "santa Fe"];

export const ChatBot = () => {
  const {
    service,
    brand,
    location,
    client,
    setService,
    setBrand,
    setLocation,
    resetChatBot,
    fullMessage,
    updateFullMessage
  } = useChatBotStore();

  const changeService = (service: string) => {
    setService(service);
    updateFullMessage();
  }

  const changeBrand = (brand: string) => {
    setBrand(brand);
    updateFullMessage();
  }

  const changeLocation = (location: string) => {
    setLocation(location);
    updateFullMessage();
  }

  const handleOpenChange = async (open: boolean) => {
    await sleep(3);
    if (!open) resetChatBot();
  };

  // Generate message without brand if "usados" is selected
  const generateFullMessage = () => {
    let message = `Hola, me comunico desde el sitio web oficial de Avec, estoy interesado en "${service.toUpperCase()}"`;
    if (service !== "usados" && brand.toUpperCase()) {
      message += ` de la marca "${brand.toUpperCase()}"`;
    }
    if (location) {
      message += ` en "${location.toUpperCase()}"`;
    }
    return message;
  }

  const goBack = () => {
    if (location) {
      setLocation("");
    } else if (brand) {
      setBrand("");
    } else if (service) {
      setService("");
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button variant="default" className='bg-[#0dc143] w-[50px] h-[50px] p-2 rounded-xl hover:bg-avecBlueColor'>
            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="#fff" />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-60 sm:w-80 h-[390px] border-none mr-2 sm:mr-6">
          <div className='bg-avecBlueColor h-10'></div>

          <div className='flex flex-col'>
            <div className='flex items-start p-4 pb-2 m-2 mt-1 ml-0 mr-0 gap-2'>
              <div className='bg-[#f2f2f2] p-4 rounded-md w-full'>
                <p className='text-xs opacity-50'>Bot de Avec</p>

                {/* SERVICES */}
                {service === "" && (
                  <>
                    <p className='text-black mb-2 font-medium text-sm'>¡Hola! ¿En qué te puedo ayudar?</p>
                    <div className='flex flex-col gap-2'>
                      {services.map(svc => (
                        <div key={svc}
                          className='bg-white py-1 px-3 cursor-pointer flex items-center gap-2 group hover:bg-avecBlueColor transition-all'
                          onClick={() => changeService(svc)}
                        >
                          <div className='w-4 h-4 bg-[#f2f2f2] rounded-full'></div>
                          <p className='capitalize text-sm text-black sm:transition-all rounded-md group-hover:text-white'>{svc}</p>
                        </div>
                      ))}
                      <a href='tel: +5491130000000'
                        className='bg-avecBlueColor border-[1px] border-blue-950 py-1 px-3 cursor-pointer flex items-center gap-2 group hover:bg-avecBlueColor transition-all'
                      >
                        <div className='w-4 h-4 bg-[#f2f2f2] rounded-full'></div>
                        <p className='capitalize text-sm text-white transition-all rounded-md group-hover:text-white sm:hidden'> (0800 000 000)</p>
                        <p className='capitalize text-sm text-white transition-all rounded-md group-hover:text-white hidden sm:block'>Llamar (0800 000 000)</p>
                      </a>
                    </div>
                  </>
                )}

                {/* BRANDS */}
                {service && service !== "usados" && brand === "" && (
                  <>
                    <p className='text-black mb-2 font-medium text-sm'>Elegi una marca</p>
                    <div className='flex flex-col gap-2'>
                      {brands.map(brd => (
                        <div key={brd}
                          className='bg-white py-1 px-3 cursor-pointer flex items-center gap-2 group hover:bg-avecBlueColor transition-all'
                          onClick={() => changeBrand(brd)}
                        >
                          <div className='w-4 h-4 bg-[#f2f2f2] rounded-full'></div>
                          <p className='capitalize text-sm text-black transition-all rounded-md group-hover:text-white'>{brd}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* LOCATIONS */}
                {service && (service !== "usados" ? brand : true) && location === "" && (
                  <>
                    <p className='text-black mb-2 font-medium text-sm'>Elegi una localidad</p>
                    <div className='flex flex-col gap-2'>
                      {locations.map(loc => (
                        <div key={loc}
                          className='bg-white py-1 px-3 cursor-pointer flex items-center gap-2 group hover:bg-avecBlueColor transition-all'
                          onClick={() => changeLocation(loc)}
                        >
                          <div className='w-4 h-4 bg-[#f2f2f2] rounded-full'></div>
                          <p className='capitalize text-sm text-black transition-all rounded-md group-hover:text-white'>{loc}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* WHATSAPP BUTTON */}
                {service && (service !== "usados" ? brand : true) && location && (
                  <>
                    <p className='text-black mb-2 font-medium text-sm'>{generateFullMessage()}</p>
                    <a href={`https://wa.me/5493585106415?text=${encodeURIComponent(generateFullMessage())}`} target="_blank" rel="noreferrer" className='bg-[#0dc143] py-1 px-3 cursor-pointer flex items-center gap-2'>
                      <div className='w-4 h-4 bg-[#f2f2f2] rounded-full'></div>
                      <p className='capitalize text-sm text-white rounded-md'>Enviar Whatsapp</p>
                    </a>
                  </>
                )}

                {/* RESET AND BACK BUTTONS */}
                <div className='flex justify-between mt-4'>
                  <Button variant="outline" onClick={goBack} disabled={service === ""}>
                    Volver
                  </Button>
                  <Button variant="outline" onClick={resetChatBot}>
                    Reiniciar
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
