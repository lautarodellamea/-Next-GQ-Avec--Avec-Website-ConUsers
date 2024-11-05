'use client'

import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination/Pagination'
import { useFilterStore } from '@/store';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react'
import { BrandsPlanesFilter } from './BrandsPlanesFilter';
import { getPaginatedCarPlanesWithImages } from '@/actions/cars/car-pagination-planes.action';
import { PaginatedCarResponse } from '@/interfaces';
import { CarGridPlanes } from './CarGridPlanes';

interface Props {
  searchParams: {
    page?: string;
  };
}

export const CarsPlanes = ({ searchParams }: Props) => {
  const [loading, setLoading] = useState(false);
  const [carsData, setCarsData] = useState<PaginatedCarResponse>({ cars: [], currentPage: 1, totalPages: 1 });

  const router = useRouter();

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // Filtros del estado global

  const singleSelectedBrand = useFilterStore((state) => state.singleSelectedBrand);
  const setSingleBrand = useFilterStore((state) => state.setSingleBrand);





  useEffect(() => {
    setLoading(true);
    const fetchCars = async () => {
      const { cars, currentPage, totalPages } = await getPaginatedCarPlanesWithImages({
        page,
        take: 12,
        brands: singleSelectedBrand == null ? [] : [singleSelectedBrand],

      });


      if (cars.length === 0 && page !== 1) {
        // Si no hay autos y no estamos en la página 1, volver a la página 1
        router.push('/planes?page=1');

      } else {
        setCarsData({ cars, currentPage, totalPages });
      }

      console.log(cars)
      // console.log(totalPages)

      setLoading(false);
    };

    fetchCars();
  }, [page, singleSelectedBrand]);

  // reseteo filtro al renderizar por primera vez
  useEffect(() => {
    setSingleBrand("")
  }, [])


  return (
    <>
      <div className='flex flex-col gap-4 relative px-3'>
        <div className=''>
          <BrandsPlanesFilter />
        </div>


        <div >
          {loading ? (
            <div className='flex justify-center items-center h-48'>
              <LoaderCircle className='animate-spin text-avecLightBlueColor' size={40} />
            </div>
          ) : carsData.cars.length > 0 ? (
            <>
              <CarGridPlanes cars={carsData.cars} />
              <Pagination totalPages={carsData.totalPages} />
            </>
          ) : (
            <div className='flex justify-center items-center h-48'>
              <p className='text-gray-500'>Sin resultados</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
