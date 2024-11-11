'use server'

import prisma from "@/lib/prisma"

export const getCarBySlug = async (slug: string) => {

  try {

    const car = await prisma.car.findFirst({
      include: {
        CarImage: true,
        brand: {
          select: {
            name: true
          }
        }
      },
      where: {
        slug: slug
      }
    })

    if (!car) return null

    return {
      ...car,
      images: car.CarImage.map(image => image.url),
    }

  } catch (error) {
    throw new Error(`Error al obtener el carro por su slug ${error}`)
  }
}