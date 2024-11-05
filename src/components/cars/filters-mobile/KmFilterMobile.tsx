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

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-ES').format(value);
};

function valuetext(value: number) {
  return `${value} km`;
}

const minDistance = 50000; // Mínima diferencia de 10,000 km
const stepValue = 10000;

export const KmFilterMobile = () => {
  const {
    mileageRange,
    setMileageRange,
    minMileage,
    maxMileage,
    setMinMaxValues,
  } = useFilterStore();

  const [value1, setValue1] = useState<number[]>([mileageRange.min, mileageRange.max]);

  // Efecto para inicializar los valores mínimos y máximos de kilómetros desde el store
  useEffect(() => {
    const fetchMinMaxValues = async () => {
      const response = await getMinMaxValues();
      if (response.ok !== false) {
        setMinMaxValues(response.minYear, response.maxYear, response.minPrice, response.maxPrice, response.minKm, response.maxKm);
        setValue1([response.minKm, response.maxKm]);
        setMileageRange(response.minKm, response.maxKm); // Configura el rango inicial de kilómetros
      }
    };

    fetchMinMaxValues();
  }, [setMinMaxValues, setMileageRange]);

  // Efecto para sincronizar el estado local con `mileageRange`
  useEffect(() => {
    setValue1([mileageRange.min, mileageRange.max]);
  }, [mileageRange]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;

    // Asegurarse de que la diferencia mínima sea respetada
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
    setMileageRange(value1[0], value1[1]);
  };

  const handleMinKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minKm = parseInt(e.target.value.replace(/\./g, ''), 10);
    if (!isNaN(minKm)) {
      setValue1([minKm, value1[1]]);
    }
  };

  const handleMaxKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxKm = parseInt(e.target.value.replace(/\./g, ''), 10);
    if (!isNaN(maxKm)) {
      setValue1([value1[0], maxKm]);
    }
  };

  const handleMinKmBlur = () => {
    const [minKm, maxKm] = value1;
    if (minKm < minMileage) {
      setValue1([minMileage, maxKm]);
    } else if (minKm > maxKm - minDistance) {
      setValue1([maxKm - minDistance, maxKm]);
    }
    setMileageRange(value1[0], value1[1]);
  };

  const handleMaxKmBlur = () => {
    const [minKm, maxKm] = value1;
    if (maxKm > maxMileage) {
      setValue1([minKm, maxMileage]);
    } else if (maxKm < minKm + minDistance) {
      setValue1([minKm, minKm + minDistance]);
    }
    setMileageRange(value1[0], value1[1]);
  };


  return (
    <Accordion type="single" collapsible className="w-full bg-white pl-3 ml-2 border-b-[0.5px] border-gray-400">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-avecBlueColor font-bold text-lg py-2">Kilómetros</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <div className='flex flex-row pl-4 pr-4 gap-2 items-center'>
              <div>
                <label htmlFor="">Desde:</label>
                <Input
                  type="text"
                  placeholder="Min km"
                  value={formatNumber(value1[0])}
                  onChange={handleMinKmChange}
                  onBlur={handleMinKmBlur}
                  className='bg-white ring-1 ring-inset ring-gray-300'
                />
              </div>
              <p>-</p>
              <div>
                <label className='mr-[1px]' htmlFor="">Hasta:</label>
                <Input
                  type="text"
                  placeholder="Max km"
                  value={formatNumber(value1[1])}
                  onChange={handleMaxKmChange}
                  onBlur={handleMaxKmBlur}
                  className='bg-white ring-1 ring-inset ring-gray-300'
                />
              </div>
            </div>

            <div className='pl-6 pr-6'>
              <Slider
                value={value1}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
                getAriaValueText={valuetext}
                disableSwap
                min={minMileage}
                max={maxMileage}
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
