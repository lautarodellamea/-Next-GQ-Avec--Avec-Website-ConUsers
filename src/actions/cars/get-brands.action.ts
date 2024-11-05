'use server'

import prisma from "@/lib/prisma"



export const getBrands = async () => {

  try {
    const brands = await prisma.brand.findMany({
      select: {
        name: true
      }
    })

    return brands
  } catch (error) {

    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener las marcas'
    }
  }


}