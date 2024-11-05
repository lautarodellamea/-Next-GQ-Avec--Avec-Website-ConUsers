'use client';

import { FuelTypeFilter } from './FuelTypeFilter';
import { TransmissionFilter } from './TransmissionFilter';
import { YearFilter } from './YearFilter';
import { BrandFilter } from './BrandFilter';
import { KmFilter } from './KmFilter';
import { PriceFilter } from './PriceFilter';
import { BodyStyleFilter } from './BodyStyleFilter';
import { OrderByAndResetBtn } from './OrderByAndResetBtn';
import { getMinMaxValues } from '@/actions/cars/get-min-max-values.action';
import { useEffect, useState } from 'react';
import { useFilterStore } from '@/store';
import { InitialValuesFilter } from '@/interfaces';

export const ContainerFilters = () => {
  const [initialValues, setInitialValues] = useState<InitialValuesFilter | null>(null);
  const setMinMaxValues = useFilterStore((state) => state.setMinMaxValues);

  useEffect(() => {
    const fetchMinMaxValues = async () => {
      const response = await getMinMaxValues();

      if (response.ok !== false) {
        const { minYear, maxYear, minPrice, maxPrice, minKm, maxKm } = response;

        // Configura los valores iniciales en el estado de Zustand
        setMinMaxValues(minYear, maxYear, minPrice, maxPrice, minKm, maxKm);

        // Guarda estos valores en el estado local
        setInitialValues(response);
      }
    };

    fetchMinMaxValues();
  }, [setMinMaxValues]);

  return (
    <div className='relative flex flex-col max-w-[350px]'>
      {initialValues && (
        <OrderByAndResetBtn />
      )}
      <BrandFilter />
      <PriceFilter />
      <KmFilter />
      <YearFilter />
      <TransmissionFilter />
      <FuelTypeFilter />
      <BodyStyleFilter />

      {/* Mostrar initialValues en la interfaz */}
      {/* <pre className='mt-4 bg-gray-100 p-2 rounded text-xs overflow-auto'>
        {JSON.stringify(initialValues, null, 2)}
      </pre> */}
    </div>
  );
};
