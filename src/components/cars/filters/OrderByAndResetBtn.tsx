'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from '@/store';



export const OrderByAndResetBtn = () => {
  const setOrderBy = useFilterStore((state) => state.setOrderBy);

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
  };

  const handleReset = () => {
    // Forzar la recarga completa de la página
    window.location.reload();
  };

  return (
    <div className='2xl:flex 2xl:flex-row 2xl:justify-between xl:items-end mb-2'>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[150px] xl:w-[180px] 2xl:w-[230px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="highest-price">Mayor precio</SelectItem>
            <SelectItem value="lowest-price">Menor precio</SelectItem>
            <SelectItem value="highest-km">Mayor kilometraje</SelectItem>
            <SelectItem value="lowest-km">Menor kilometraje</SelectItem>
            <SelectItem value="oldest">Mayor antigüedad</SelectItem>
            <SelectItem value="newest">Menor antigüedad</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <button
        onClick={handleReset}
        className='text-avecLightBlueColor font-medium text-sm rounded hover:underline pl-2'
      >
        Limpiar Filtros
      </button>
    </div>
  );
};
