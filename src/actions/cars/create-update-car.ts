'use server'

import prisma from "@/lib/prisma";
import { Car } from "@prisma/client";
import { z } from "zod";


const carSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  vin: z.string().min(3).max(255),
  licensePlate: z.string().min(3).max(255),
  operationType: z.string().min(3).max(255),
  brandId: z.string().uuid(),
  modelName: z.string().min(3).max(255),
  modelVersion: z.string().min(3).max(255),
  engine: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val)),



  inStock: z.string(),
  currency: z.string(),

  km: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val)),
  year: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val)),
  doors: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val)),

  fuelType: z.string(),
  bodyStyle: z.string(),
  transmission: z.string(),
  color: z.string(),
  location: z.string(),
  vehicleTier: z.string(),
  description: z.string(),
  // gender: z.nativeEnum(Gender),
});


export const createUpdateCar = async (formData: FormData) => {

  console.log(formData)

  const data = Object.fromEntries(formData)
  const carParsed = carSchema.safeParse(data)

  // si todo sale bien devuelve true
  console.log(carParsed.success)


  if (!carParsed.success) {
    console.log(carParsed.error)
    return { ok: false }
  }


  // console.log(carParsed.data)
  const car = carParsed.data
  car.slug = car.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, ...rest } = car
  // haremos una prisma transaction, en caso de dar error hace un rollback
  const prismaTx = await prisma.$transaction(
    async (tx) => {

      let product: Car




      if (id) {
        // actualizar
        product = await prisma.car.update({
          where: { id },
          data: {
            ...rest,
            inStock: rest.inStock === "true" ? 1 : 0,
          }
        })
        console.log({ updatedProduct: product })

      } else {
        // crear
      }





      return {

      }
    }
  )


  return {
    ok: true
  }

}