'use client';

import React, { useEffect, useState } from 'react';
import { CarGrid } from '../car-grid/CarGrid';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { ContainerFilters } from './ContainerFilters';
import { useFilterStore } from '@/store';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { getPaginatedCarWithImages } from '@/actions/cars/car-pagination.action';

interface Props {
  searchParams: {
    page?: string;
  };
}

export interface CarResponse {
  bodyStyle: string;
  brand: {
    name: string;
  };
  brandName?: string;
  CarImage?: { url: string }[];
  color: string;
  currency: string;
  description: string;
  doors: number;
  engine: string;
  fuelType: string;
  images: string[];
  inStock: number;
  km: number;
  licensePlate: string;
  location: string;
  modelName: string;
  modelVersion: string;
  operationType: string;
  price: number;
  slug: string;
  transmission: string;
  vin: string;
  year: number;
  brandId?: string;
}

interface CarsData {
  cars: CarResponse[];
  currentPage: number;
  totalPages: number;
}

export const CarsWithFilters = ({ searchParams }: Props) => {
  const [loading, setLoading] = useState(false);
  const [carsData, setCarsData] = useState<CarsData>({ cars: [], currentPage: 1, totalPages: 1 });
  const router = useRouter();
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // Filtros del estado global
  const selectedTransmissions = useFilterStore((state) => state.selectedTransmissions);
  const selectedFuelTypes = useFilterStore((state) => state.selectedFuelTypes);
  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const selectedBodyStyles = useFilterStore((state) => state.selectedBodyStyles);
  const yearRange = useFilterStore((state) => state.yearRange);
  const mileageRange = useFilterStore((state) => state.mileageRange);
  const priceRange = useFilterStore((state) => state.priceRange);
  const orderBy = useFilterStore((state) => state.orderBy);

  useEffect(() => {
    setLoading(true);
    const fetchCars = async () => {
      const { cars, currentPage, totalPages } = await getPaginatedCarWithImages({
        page,
        take: 12,
        transmissions: selectedTransmissions,
        fuelTypes: selectedFuelTypes,
        brands: selectedBrands,
        yearRange: yearRange,
        mileageRange: mileageRange,
        priceRange: priceRange,
        bodyStyles: selectedBodyStyles,
        orderBy: { field: orderBy.field, direction: orderBy.direction },
      });

      if (cars.length === 0 && page !== 1) {
        router.push('/usados?page=1');
      } else {
        setCarsData({ cars: cars as CarResponse[], currentPage, totalPages } as CarsData);
      }

      setLoading(false);
    };

    fetchCars();
  }, [page, selectedTransmissions, selectedFuelTypes, selectedBrands, yearRange, mileageRange, priceRange, selectedBodyStyles, orderBy]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 relative px-3'>
      <div className='hidden lg:block lg:col-span-1'>
        <ContainerFilters />
      </div>

      <div className='sm:col-span-4 lg:col-span-3'>
        {loading ? (
          <div className='flex justify-center items-center h-48'>
            <LoaderCircle className='animate-spin text-avecLightBlueColor' size={40} />
          </div>
        ) : carsData.cars.length > 0 ? (
          <>
            <CarGrid cars={carsData.cars} />
            <Pagination totalPages={carsData.totalPages} />
          </>
        ) : (
          <div className='flex justify-center items-center h-48'>
            <p className='text-gray-500'>Sin resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};
