'use client'

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SlidersHorizontal } from "lucide-react"
import { OrderByFilter } from "./OrderByFilter"
import { BrandFilterMobile } from "./BrandFilterMobile"
import { PriceFilterMobile } from "./PriceFilterMobile"
import { KmFilterMobile } from "./KmFilterMobile"
import { YearFilterMobile } from "./YearFilterMobile"
import { BodyStyleFilterMobile } from "./BodyStyleFilterMobile"
import { TransmissionFilterMobile } from "./TransmissionFilterMobile"
import { FuelTypeFilterMobile } from "./FuelTypeFilterMobile"

export function DrawerFilter() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  const handleReset = () => {
    // Forzar la recarga completa de la página
    window.location.reload();
  };


  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-0 w-full h-[60px] z-[100] bg-avecLightBlueColor text-white rounded-t-lg m-auto hover:bg-avecBlueColor">
          <div className="flex flex-row gap-1 items-center justify-center">
            <SlidersHorizontal className="h-5 " />
            <span className="text-lg">Filtros</span>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="overflow-y-hidden z-[110]" aria-describedby={undefined}>
        <div className="relative mx-auto w-full max-w-sm">
          <DrawerHeader >
            <DrawerTitle><button
              onClick={handleReset}
              className='text-avecLightBlueColor font-medium text-sm rounded hover:underline pl-2'
            >
              Limpiar Filtros
            </button></DrawerTitle>
            <DrawerDescription id="drawer-description">
              Usa los filtros para refinar los resultados de búsqueda.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 max-h-[70vh] overflow-y-auto z-[100]">
            <div className="flex flex-col items-center justify-center space-x-2">
              <OrderByFilter />
              <BrandFilterMobile />
              <PriceFilterMobile />
              <KmFilterMobile />
              <YearFilterMobile />
              <BodyStyleFilterMobile />
              <TransmissionFilterMobile />
              <FuelTypeFilterMobile />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">
                <p>Cerrar</p>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
