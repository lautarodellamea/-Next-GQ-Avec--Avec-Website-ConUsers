'use client'

import { useFilterStore } from "@/store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";

const brands = {
  peugeot: { value: "peugeot", label: "Peugeot" },
  citroen: { value: "citroen", label: "Citroën" },
  ds: { value: "ds", label: "DS Automobiles" },
  fiat: { value: "fiat", label: "Fiat" },
  renault: { value: "renault", label: "Renault" },
  toyota: { value: "toyota", label: "Toyota" },
  nissan: { value: "nissan", label: "Nissan" },
  ford: { value: "ford", label: "Ford" },
  chevrolet: { value: "chevrolet", label: "Chevrolet" },
  volkswagen: { value: "volkswagen", label: "Volkswagen" },
};
export const BrandFilter = () => {


  const [showAll, setShowAll] = useState(false);

  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const toggleBrand = useFilterStore((state) => state.toggleBrand);


  // console.log(selectedTransmissions)

  // Limitar el número de opciones mostradas según el estado
  const allBrands = Object.values(brands);
  const visibleBrands = showAll ? allBrands : allBrands.slice(0, 5);


  return (<Accordion type="single" collapsible className="w-full bg-avecGrayColor pl-4 border-[1px] border-gray-400 border-b-0">
    <AccordionItem value="item-1">
      <AccordionTrigger className="text-avecBlueColor font-bold text-lg">Marcas</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          {visibleBrands.map((brand) => (
            <div key={brand.value} className="flex items-center space-x-2">
              <Checkbox
                id={brand.value}
                checked={selectedBrands.includes(brand.value)}
                onCheckedChange={() => toggleBrand(brand.value)}
                className="checked:bg-avecLightBlueColor bg-white rounded border-gray-400 w-4 h-4"
              />
              <label
                htmlFor={brand.value}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {brand.label}
              </label>
            </div>
          ))}

          {/* Botón para mostrar más o menos */}
          {allBrands.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-medium mt-2 text-left text-avecLightBlueColor"
            >
              {showAll ? "Mostrar menos" : "Mostrar más..."}
            </button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  )
}
