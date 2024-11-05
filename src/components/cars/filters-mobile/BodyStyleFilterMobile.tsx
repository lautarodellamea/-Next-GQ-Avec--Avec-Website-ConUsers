'use client'

import { useFilterStore } from "@/store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"


const bodyStyles = {
  hatchback: { value: "hatchback", label: "Hatchback" },
  suv: { value: "suv", label: "SUV" },
  sedan: { value: "sedan", label: "Sedán" },
  pickup: { value: "pick up", label: "Pickup" },
  furgon: { value: "furgon", label: "Furgón" },
  // coupe: { value: "coupe", label: "Coupe" },
  otros: { value: "otros", label: "Otros" },
};

export const BodyStyleFilterMobile = () => {
  const selectedBodyStyles = useFilterStore((state) => state.selectedBodyStyles);
  const toggleBodyStyle = useFilterStore((state) => state.toggleBodyStyle);


  // console.log(selectedBodyStyles)


  return (
    <Accordion type="single" collapsible className="w-full bg-white pl-3 ml-2 border-b-[0.5px] border-gray-400">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-avecBlueColor font-bold text-lg py-2">Segmento</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {Object.values(bodyStyles).map((bodyStyle) => (
              <div key={bodyStyle.value} className="flex items-center space-x-2">
                <Checkbox
                  id={bodyStyle.value}
                  checked={selectedBodyStyles.includes(bodyStyle.value)}
                  onCheckedChange={() => toggleBodyStyle(bodyStyle.value)}
                  className="bg-white rounded border-gray-400 w-4 h-4"
                />
                <label
                  htmlFor={bodyStyle.value}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {bodyStyle.label}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion >
  )
}
