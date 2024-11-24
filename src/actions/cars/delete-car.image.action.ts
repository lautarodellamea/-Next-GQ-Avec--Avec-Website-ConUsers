'use server'

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '')


export const deleteCarImage = async (imageId: number, imageUrl: string) => {

  console.log("click")

  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'No se pueden borrar imagenes de FileSystem'
    }
  }

  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
  // console.log({ imageName })


  try {

    await cloudinary.uploader.destroy(`gq-avec/${imageName}`)
    const deleteImage = await prisma.carImage.delete({
      where: {
        id: imageId
      },
      select: {
        car: {
          select: {
            slug: true
          }
        }
      }
    })


    // revalidar los path
    revalidatePath('/admin/cars')
    revalidatePath(`/admin/cars/${deleteImage.car.slug}`)
    revalidatePath(`/cars/${deleteImage.car.slug}`)






  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'No se pudo eliminar la imagen',
    }
  }
}

