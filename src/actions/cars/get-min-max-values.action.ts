'use server'

import prisma from "@/lib/prisma";

export const getMinMaxValues = async () => {
  try {
    //  valor mínimo y máximo de kilómetros, precios y años solo de autos con operationType "usado"
    const [minMaxKm, minMaxPrice, minMaxYear] = await Promise.all([
      prisma.car.aggregate({
        where: { operationType: "usado" },
        _min: { km: true },
        _max: { km: true },
      }),
      prisma.car.aggregate({
        where: { operationType: "usado" },
        _min: { price: true },
        _max: { price: true },
      }),
      prisma.car.aggregate({
        where: { operationType: "usado" },
        _min: { year: true },
        _max: { year: true },
      }),
    ]);

    return {
      minKm: Math.round(minMaxKm._min.km ?? 0),
      maxKm: Math.round(minMaxKm._max.km ?? 0),
      minPrice: Math.round(minMaxPrice._min.price ?? 0),
      maxPrice: Math.round(minMaxPrice._max.price ?? 0),
      minYear: Math.round(minMaxYear._min.year ?? 0),
      maxYear: Math.round(minMaxYear._max.year ?? 0),
    };
  } catch (error) {
    console.error("Error al obtener los valores mínimos y máximos:", error);
    return {
      ok: false,
      message: 'Error al obtener los valores mínimos y máximos',
      minKm: 0,
      maxKm: 0,
      minPrice: 0,
      maxPrice: 0,
      minYear: 0,
      maxYear: 0,
    };
  }
};
