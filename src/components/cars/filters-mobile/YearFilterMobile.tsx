'use client'

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Slider from '@mui/material/Slider';
import { useFilterStore } from '@/store';
import { getMinMaxValues } from '@/actions/cars/get-min-max-values.action';

function valuetext(value: number) {
  return `${value} years`;
}

const minDistance = 1;
const currentYear = new Date().getFullYear();

export const YearFilterMobile = () => {
  const { yearRange, setYearRange } = useFilterStore();

  // Estado local para el valor del slider
  const [value1, setValue1] = useState<number[]>([yearRange.min, yearRange.max]);

  // Valores de año mínimo y máximo
  const [minYearLimit, setMinYearLimit] = useState<number>(2000);
  const [maxYearLimit, setMaxYearLimit] = useState<number>(currentYear);

  // Efecto para actualizar el slider cuando `yearRange` cambie
  useEffect(() => {
    setValue1([yearRange.min, yearRange.max]);
  }, [yearRange]);

  // Efecto para obtener los valores mínimos y máximos de año
  useEffect(() => {
    const fetchMinMaxValues = async () => {
      const response = await getMinMaxValues();
      if (response.ok !== false) {
        setMinYearLimit(response.minYear);
        setMaxYearLimit(response.maxYear);
        setValue1([response.minYear, response.maxYear]);
        setYearRange(response.minYear, response.maxYear); // Configura el rango inicial
      }
    };

    fetchMinMaxValues();
  }, []);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      const updatedValues = [Math.min(newValue[0], value1[1] - minDistance), value1[1]];
      setValue1(updatedValues);
    } else {
      const updatedValues = [value1[0], Math.max(newValue[1], value1[0] + minDistance)];
      setValue1(updatedValues);
    }
  };

  const handleSliderCommit = () => {
    setYearRange(value1[0], value1[1]);
  };

  const handleMinYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minYear = parseInt(e.target.value);
    if (!isNaN(minYear)) {
      setValue1([minYear, value1[1]]);
    }
  };

  const handleMaxYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxYear = parseInt(e.target.value);
    if (!isNaN(maxYear)) {
      setValue1([value1[0], maxYear]);
    }
  };

  const handleMinYearBlur = () => {
    const [minYear, maxYear] = value1;
    if (minYear < minYearLimit) {
      setValue1([minYearLimit, maxYear]);
    } else if (minYear > maxYear - minDistance) {
      setValue1([maxYear - minDistance, maxYear]);
    }
    setYearRange(value1[0], value1[1]);
  };

  const handleMaxYearBlur = () => {
    const [minYear, maxYear] = value1;
    if (maxYear > maxYearLimit) {
      setValue1([minYear, maxYearLimit]);
    } else if (maxYear < minYear + minDistance) {
      setValue1([minYear, minYear + minDistance]);
    }
    setYearRange(value1[0], value1[1]);
  };



  return (
    <Accordion type="single" collapsible className="w-full bg-white pl-3 ml-2 border-b-[0.5px] border-gray-400">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-avecBlueColor font-bold text-lg py-2">Año</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <div className='flex flex-row pl-4 pr-4 gap-2 items-center'>
              <div>
                <label htmlFor="">Desde:</label>
                <Input
                  type="number"
                  placeholder="Min"
                  value={value1[0]}
                  onChange={handleMinYearChange}
                  onBlur={handleMinYearBlur}
                  className='bg-white ring-1 ring-inset ring-gray-300'
                />
              </div>
              <p>-</p>
              <div>
                <label className='mr-[1px]' htmlFor="">Hasta:</label>
                <Input
                  type="number"
                  placeholder="Max"
                  value={value1[1]}
                  onChange={handleMaxYearChange}
                  onBlur={handleMaxYearBlur}
                  className='bg-white ring-1 ring-inset ring-gray-300'
                />
              </div>
            </div>

            <div className='pl-6 pr-6'>
              <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                onChangeCommitted={handleSliderCommit}
                getAriaValueText={valuetext}
                disableSwap
                min={minYearLimit}
                max={maxYearLimit}
                sx={{
                  color: '#00a2df',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#00a2df',
                    border: '2px solid #00a2df',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#00a2df',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#00a2df',
                  },
                }}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

