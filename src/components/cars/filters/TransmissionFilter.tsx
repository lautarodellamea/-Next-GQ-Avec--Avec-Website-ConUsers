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

const transmissions = {
  automatico: { value: "automatico", label: "Automático" },
  manual: { value: "manual", label: "Manual" },
};
export const TransmissionFilter = () => {

  const [showAll, setShowAll] = useState(false);

  const selectedTransmissions = useFilterStore((state) => state.selectedTransmissions);
  const toggleTransmission = useFilterStore((state) => state.toggleTransmission);


  // console.log(selectedTransmissions)

  // Limitar el número de opciones mostradas según el estado
  const allTransmissions = Object.values(transmissions);
  const visibleTransmissions = showAll ? allTransmissions : allTransmissions.slice(0, 5);


  return (
    <Accordion type="single" collapsible className="w-full bg-avecGrayColor pl-4 border-[1px] border-gray-400 border-b-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-avecBlueColor font-bold text-lg">Transmisión</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {visibleTransmissions.map((transmission) => (
              <div key={transmission.value} className="flex items-center space-x-2">
                <Checkbox
                  id={transmission.value}
                  checked={selectedTransmissions.includes(transmission.value)}
                  onCheckedChange={() => toggleTransmission(transmission.value)}
                  className="checked:bg-avecLightBlueColor bg-white rounded border-gray-400 w-4 h-4"
                />
                <label
                  htmlFor={transmission.value}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {transmission.label}
                </label>
              </div>
            ))}

            {/* Botón para mostrar más o menos */}
            {allTransmissions.length > 5 && (
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
  );
}