'use client'

import { useFilterStore } from "@/store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"


const fuelTypes = {
  nafta: { value: "nafta", label: "Nafta" },
  diesel: { value: "diesel", label: "Diésel" },
  gnc: { value: "gnc", label: "GNC" },
  hibrido: { value: "hibrido", label: "Híbrido" },
  electrico: { value: "electrico", label: "Eléctrico" },
};

export const FuelTypeFilterMobile = () => {
  const selectedFuelTypes = useFilterStore((state) => state.selectedFuelTypes);
  const toggleFuelType = useFilterStore((state) => state.toggleFuelType);


  // console.log(selectedFuelTypes)


  return (
    <Accordion type="single" collapsible className="w-full bg-white pl-3 ml-2 border-b-[0.5px] border-gray-400">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-avecBlueColor font-bold text-lg py-2">Combustible</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {Object.values(fuelTypes).map((fuelType) => (
              <div key={fuelType.value} className="flex items-center space-x-2">
                <Checkbox
                  id={fuelType.value}
                  checked={selectedFuelTypes.includes(fuelType.value)}
                  onCheckedChange={() => toggleFuelType(fuelType.value)}
                  className="bg-white rounded border-gray-400 w-4 h-4"
                />
                <label
                  htmlFor={fuelType.value}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {fuelType.label}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion >
  )
}
