'use server'

import prisma from "@/lib/prisma"


export const getBrands = async () => {
  try {

    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return brands


  } catch (error) {
    console.log(error)
    return []
  }
}