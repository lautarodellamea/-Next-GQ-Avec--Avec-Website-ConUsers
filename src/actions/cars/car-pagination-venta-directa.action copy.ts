'use server';

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";



interface PaginationOptions {
  page?: number;
  take?: number;
}

interface FilterOptions extends PaginationOptions {
  brands?: string[]; // Se espera un array con marcas como 'Peugeot', 'Citroën', 'Fiat'
}

export const getPaginatedCarVentaDirectaWithImages = async ({
  page = 1,
  take = 12,
  brands,
}: FilterOptions = {}) => {
  // Validación para páginas incorrectas
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(take)) || take < 1) take = 12;

  try {
    // Construcción del filtro
    const whereClause: Prisma.CarWhereInput = { operationType: { in: ["plan", "nuevo"] } }; // Filtro de tipo de operación

    // Filtro de marcas
    if (brands && brands.length > 0) {
      const brandsFromDb = await prisma.brand.findMany({
        where: {
          name: { in: brands },
        },
        select: { id: true },
      });

      // Asegúrate de que se encontró al menos una marca
      if (brandsFromDb.length > 0) {
        whereClause.brandId = { in: brandsFromDb.map(brand => brand.id) }; // Usa los IDs encontrados
      }
    }

    // Obtengo los autos y sus imágenes
    const cars = await prisma.car.findMany({
      where: whereClause,
      take: Number(take),
      skip: (Number(page) - 1) * Number(take),
      include: {
        CarImage: {
          take: 2,
          select: { url: true },
        },
        brand: {
          select: { name: true },
        },
      },
    });

    // Conteo de autos y páginas
    const totalCounter = await prisma.car.count({ where: whereClause });
    const totalPages = Math.ceil(totalCounter / Number(take));

    // console.log("Total Counter:", totalCounter);
    // console.log("Total Pages:", totalPages);
    // console.log("Take:", take);

    return {
      currentPage: Number(page),
      totalPages: totalPages,
      cars: cars.map(car => ({
        ...car,
        brandName: car.brand.name,
        images: car.CarImage.map(image => image.url),
      })),
    };

  } catch (error) {
    console.error(error); // log del error original
    throw new Error(`Error al obtener los autos: ${error}`);
  }
};
