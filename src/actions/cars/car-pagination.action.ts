'use server';

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface PaginatedCarResponse {
  currentPage: number;
  totalPages: number;
  cars: {
    vin: string;
    licensePlate: string;
    operationType: string;
    brand: {
      name: string;
    };
    modelName: string;
    modelVersion: string;
    year: number;
    km: number;
    color: string;
    transmission: string;
    price: number;
    fuelType: string;
    location: string;
    engine: string;
    description: string | null;
    images: string[];
    inStock: number;
    slug: string;
    bodyStyle: string;
    doors: number;
    currency: string;
  }[];
}

interface PaginationOptions {
  page?: number;
  take?: number;
}

interface FilterOptions extends PaginationOptions {
  brands?: string[];
  bodyStyles?: string[];
  transmissions?: string[];
  fuelTypes?: string[];
  priceRange?: { min: number; max: number };
  yearRange?: { min: number; max: number };
  mileageRange?: { min: number; max: number };
  orderBy?: { field: string; direction: string };
}

export const getPaginatedCarWithImages = async ({
  page = 1,
  take = 12,
  brands,
  bodyStyles,
  transmissions,
  fuelTypes,
  priceRange,
  yearRange,
  mileageRange,
  orderBy,
}: FilterOptions = {}): Promise<PaginatedCarResponse> => {

  // Validación de page y take
  const validPage = isNaN(Number(page)) || page < 1 ? 1 : page;
  const validTake = isNaN(Number(take)) || take < 1 ? 12 : take;

  try {
    // Construcción del filtro
    const whereClause: Prisma.CarWhereInput = {
      operationType: "usado",
    };
    // Filtro de marcas
    if (brands && brands.length > 0) {
      const brandsFromDb = await prisma.brand.findMany({
        where: { name: { in: brands } },
        select: { id: true },
      });
      if (brandsFromDb.length > 0) {
        whereClause.brandId = { in: brandsFromDb.map(brand => brand.id) };
      }
    }

    // Otros filtros
    if (fuelTypes && fuelTypes.length > 0) whereClause.fuelType = { in: fuelTypes };
    if (transmissions && transmissions.length > 0) whereClause.transmission = { in: transmissions };
    if (bodyStyles && bodyStyles.length > 0) whereClause.bodyStyle = { in: bodyStyles };
    if (yearRange) whereClause.year = { gte: yearRange.min, lte: yearRange.max };
    if (mileageRange) whereClause.km = { gte: mileageRange.min, lte: mileageRange.max };
    if (priceRange) whereClause.price = { gte: priceRange.min, lte: priceRange.max };

    // Ordenamiento
    const orderByClause = orderBy ? { [orderBy.field]: orderBy.direction } : undefined;

    // Obtención de autos y sus imágenes
    const cars = await prisma.car.findMany({
      where: whereClause,
      take: Number(validTake),
      skip: (Number(validPage) - 1) * Number(validTake),
      include: {
        CarImage: { take: 2, select: { url: true } },
        brand: { select: { name: true } },
      },
      orderBy: orderByClause,
    });

    // Conteo de autos y cálculo de páginas totales
    const totalCounter = await prisma.car.count({ where: whereClause });
    const totalPages = Math.ceil(totalCounter / Number(validTake));




    return {
      currentPage: validPage,
      totalPages: totalPages,
      cars: cars.map(car => ({
        images: car.CarImage.map(image => image.url),
        vin: car.vin,
        licensePlate: car.licensePlate,
        operationType: car.operationType,
        brand: { name: car.brand.name },
        modelName: car.modelName,
        modelVersion: car.modelVersion,
        year: car.year,
        km: car.km,
        color: car.color,
        transmission: car.transmission,
        price: car.price,
        fuelType: car.fuelType,
        location: car.location,
        engine: car.engine,
        description: car.description,
        inStock: car.inStock,
        slug: car.slug,
        bodyStyle: car.bodyStyle,
        doors: car.doors,
        currency: car.currency,

      })),

    };

  } catch (error) {
    console.error("Error al obtener los autos:", error);
    throw new Error(`Error al obtener los autos: ${error}`);
  }
};
