import { locations } from "@/data"
import { MapPinHouse } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export const Locations = () => {
  return (
    <div className="container m-auto flex justify-center flex-col  py-10 px-2 cursor-pointer select-none">
      <h4 className='font-bold text-2xl sm:text-4xl text-center mb-6'>Nos podés encontrar en:</h4>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          // loop: true,

        }}
        autoplay={2000}
        className="container py-2 w-full mq-430px:w-[90%] sm:w-[90%]"
      >
        <CarouselContent className="w-full">

          {
            locations.map((location) => (
              <CarouselItem key={location.mapsLink} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 ">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex  items-start justify-center p-6  h-[200px]  ">
                      <div key={location.nombre} className="flex flex-col justify-center items-center text-center">
                        <div className="bg-avecWhiteColor p-4 rounded-full shadow-sm">
                          <MapPinHouse className="w-8 h-8 text-slate-500 stroke-1 mq-430px:w-5 mq-430px:h-5" />
                        </div>
                        <h4 className="font-bold mt-3 capitalize leading-[16px]">{location.nombre}</h4>

                        <a className="hover:underline hover:text-avecLightBlueColor mt-2" href={location.mapsLink} target="_blank" rel="noopener noreferrer nofollow external" >{location.direccion}</a>
                        <a className="hover:underline hover:text-avecLightBlueColor mt-2" href={`tel:${location.telefono}`}>(0351) 5892000</a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          }

        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex sm:ml-2" />
        <CarouselNext className="hidden sm:flex  sm:mr-2 " />
      </Carousel>




    </div>
  )
}
