'use server'
import prisma from "@/lib/prisma";
import { Car } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '')


const carSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  vin: z.string().min(1).max(255),
  licensePlate: z.string().min(1).max(255),
  operationType: z.string().min(1).max(255),
  brandId: z.string().uuid(),
  modelName: z.string().min(1).max(255),
  modelVersion: z.string().min(1).max(255),
  engine: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
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
  // description: z.string(),
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

  try {
    // haremos una prisma transaction, en caso de dar error hace un rollback
    const prismaTx = await prisma.$transaction(
      async (tx) => {

        let car: Car




        if (id) {
          // actualizar
          car = await prisma.car.update({
            where: { id },
            data: {
              ...rest,
              inStock: rest.inStock === "true" ? 1 : 0,
            }
          })
          console.log({ updatedCar: car })

        } else {
          // crear
          car = await prisma.car.create({
            data: {
              ...rest,
              inStock: rest.inStock === "true" ? 1 : 0,
            }
          })



        }

        // console.log({ createdCar: car })
        // proceso de carga y guardado de imagenes
        // recorrer las imagenes y guardarlas
        if (formData.getAll('images')) {
          console.log(formData.getAll('images'))

          // el resultado de la funcion de abajo debera darme algo como esot: [https://url1.jpg, https://url2.jpg]
          const images = await uploadImages(formData.getAll('images') as File[])

          console.log("Carga de imagenes: ", images)

          if (!images) {
            // con que lanzemos una excepcion en la transaccion, se hace un rollback
            throw new Error('No se pudieron cargar las imagenes, rollingback')
          }

          await prisma.carImage.createMany({
            data: images.map(image => ({
              url: image!,
              carId: car.id
            }))
          })
        }

        return {
          car
        }
      }
    )

    // una vez actualizado o creado el producto actualizamos las rutas donde aparece
    revalidatePath('/admin/cars')
    revalidatePath(`/admin/cars/${car.slug}`)
    revalidatePath(`/cars/${car.slug}`)

    return {
      ok: true,
      car: prismaTx.car
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al crear o actualizar el auto'
    }
  }

  return {
    ok: true
  }

}



const uploadImages = async (images: File[]) => {

  try {

    const uploadPromises = images.map(async (image) => {


      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')


        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {

          folder: 'gq-avec'

        }).then(r => r.secure_url)

      } catch (error) {
        console.log(error)
        return null
      }

    })

    const uploadImages = await Promise.all(uploadPromises)
    return uploadImages

  } catch (error) {
    console.log(error)
    return null
  }
}