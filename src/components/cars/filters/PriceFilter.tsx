'use client';

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
  return `$${formatNumber(value)}`;
}

const minDistance = 5000000; // Mínima diferencia de 100,000
const stepValue = 100000;

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-ES').format(value);
};

export const PriceFilter = () => {
  const {
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
    setMinMaxValues
  } = useFilterStore();

  const [value1, setValue1] = useState<number[]>([priceRange.min, priceRange.max]);

  useEffect(() => {
    const fetchMinMaxValues = async () => {
      const response = await getMinMaxValues();
      if (response.ok !== false) {
        setMinMaxValues(response.minYear, response.maxYear, response.minPrice, response.maxPrice, response.minKm, response.maxKm);
        setValue1([response.minPrice, response.maxPrice]);
        setPriceRange(response.minPrice, response.maxPrice);
      }
    };

    fetchMinMaxValues();
  }, [setMinMaxValues, setPriceRange]);

  useEffect(() => {
    setValue1([priceRange.min, priceRange.max]);
  }, [priceRange]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;

    if (newValue[1] - newValue[0] < minDistance) {
      if (event.type === 'mousemove' || event.type === 'pointermove') {
        if (newValue[0] === value1[0]) {
          setValue1([newValue[0], newValue[0] + minDistance]);
        } else {
          setValue1([newValue[1] - minDistance, newValue[1]]);
        }
      }
    } else {
      setValue1(newValue as number[]);
    }
  };

  const handleSliderChangeCommitted = () => {
    setPriceRange(value1[0], value1[1]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = parseInt(e.target.value.replace(/\./g, ''));
    if (!isNaN(minPrice)) {
      setValue1([minPrice, value1[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = parseInt(e.target.value.replace(/\./g, ''));
    if (!isNaN(maxPrice)) {
      setValue1([value1[0], maxPrice]);
    }
  };

  const handleMinPriceBlur = () => {
    const [minPrice, maxPrice] = value1;
    if (minPrice < minPrice) {
      setValue1([minPrice, maxPrice]);
    } else if (minPrice > maxPrice - minDistance) {
      setValue1([maxPrice - minDistance, maxPrice]);
    }
    setPriceRange(value1[0], value1[1]);
  };

  const handleMaxPriceBlur = () => {
    const [minPrice, maxPrice] = value1;
    if (maxPrice > maxPrice) {
      setValue1([minPrice, maxPrice]);
    } else if (maxPrice < minPrice + minDistance) {
      setValue1([minPrice, minPrice + minDistance]);
    }
    setPriceRange(value1[0], value1[1]);
  };

  return (
    <Accordion type="single" collapsible className="w-full bg-avecGrayColor pl-0 pr-0 px-4 border-[1px] border-gray-400 border-b-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-avecBlueColor font-bold text-lg pl-4">Precio</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 ">
            <div className='flex flex-row pl-4 pr-4 gap-2 items-center'>
              <div>
                <label htmlFor="">Desde:</label>
                <Input
                  type="text"
                  placeholder="Min $"
                  value={formatNumber(value1[0])}
                  onChange={handleMinPriceChange}
                  onBlur={handleMinPriceBlur}
                  className='bg-white ring-1 ring-inset ring-gray-300'
                />
              </div>
              <p>-</p>
              <div>
                <label className='mr-[1px]' htmlFor="">Hasta:</label>
                <Input
                  type="text"
                  placeholder="Max $"
                  value={formatNumber(value1[1])}
                  onChange={handleMaxPriceChange}
                  onBlur={handleMaxPriceBlur}
                  className='bg-white ring-1 ring-inset ring-gray-300'
                />
              </div>
            </div>

            <div className='pl-6 pr-6'>
              <Slider
                getAriaLabel={() => 'Minimum price'}
                value={value1}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
                getAriaValueText={valuetext}
                disableSwap
                min={minPrice}
                max={maxPrice}
                step={stepValue}
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
