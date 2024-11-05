'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterStore } from '@/store';

export const OrderByFilter = () => {
  const setOrderBy = useFilterStore((state) => state.setOrderBy);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value: string) => {
    let field = 'price';
    let direction = 'asc';

    switch (value) {
      case 'highest-price':
        field = 'price';
        direction = 'desc';
        break;
      case 'lowest-price':
        field = 'price';
        direction = 'asc';
        break;
      case 'highest-km':
        field = 'km';
        direction = 'desc';
        break;
      case 'lowest-km':
        field = 'km';
        direction = 'asc';
        break;
      case 'oldest':
        field = 'year';
        direction = 'asc';
        break;
      case 'newest':
        field = 'year';
        direction = 'desc';
        break;
      default:
        break;
    }

    setOrderBy({ field, direction });
    setSelectedValue(value); // Actualiza el valor seleccionado visualmente
  };

  return (
    <Accordion type="single" collapsible className="w-full bg-white pl-3 ml-2 border-b-[0.5px] border-gray-400">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-avecBlueColor font-bold text-lg py-2">
          Ordenar por
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSelectChange("highest-price")}
              className={`text-left py-1 ${selectedValue === "highest-price" ? "font-bold text-avecBlueColor" : ""}`}
            >
              Mayor precio
            </button>
            <button
              onClick={() => handleSelectChange("lowest-price")}
              className={`text-left py-1 ${selectedValue === "lowest-price" ? "font-bold text-avecBlueColor" : ""}`}
            >
              Menor precio
            </button>
            <button
              onClick={() => handleSelectChange("highest-km")}
              className={`text-left py-1 ${selectedValue === "highest-km" ? "font-bold text-avecBlueColor" : ""}`}
            >
              Mayor kilometraje
            </button>
            <button
              onClick={() => handleSelectChange("lowest-km")}
              className={`text-left py-1 ${selectedValue === "lowest-km" ? "font-bold text-avecBlueColor" : ""}`}
            >
              Menor kilometraje
            </button>
            <button
              onClick={() => handleSelectChange("oldest")}
              className={`text-left py-1 ${selectedValue === "oldest" ? "font-bold text-avecBlueColor" : ""}`}
            >
              Mayor antigüedad
            </button>
            <button
              onClick={() => handleSelectChange("newest")}
              className={`text-left py-1 ${selectedValue === "newest" ? "font-bold text-avecBlueColor" : ""}`}
            >
              Menor antigüedad
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
