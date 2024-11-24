'use server'


import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeCarStock = async (carId: string, inStock: string) => {


  const session = await auth();

  if (session?.user.role !== 'admin') {

    return {
      ok: false,
      message: 'No autorizado. Debe de ser un usuario administrador'
    }

  }


  try {

    const newRole = inStock === "1" ? '1' : '0'

    const car = await prisma.car.update({

      where: {
        id: carId
      },
      data: {
        inStock: Number(newRole)
      }

    })

    // revalidamos el path para que se vena los cambio
    revalidatePath('/admin/cars')

    return {
      ok: true,
      message: 'Rol actualizado',
    }

  } catch (error) {
    return {
      ok: false,
      message: "No se pudo actualizar, revisar logs," + error
    }
  }




}