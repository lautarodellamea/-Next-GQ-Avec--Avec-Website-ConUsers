'use server'


import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {


  const session = await auth();

  if (session?.user.role !== 'admin') {

    return {
      ok: false,
      message: 'No autorizado. Debe de ser un usuario administrador'
    }

  }


  try {

    const newRole = role === 'admin' ? 'admin' : 'user'

    const user = await prisma.user.update({

      where: {
        id: userId
      },
      data: {
        role: newRole
      }

    })

    // revalidamos el path para que se vena los cambio
    revalidatePath('/admin/users')

    return {
      ok: true,
      message: 'Rol actualizado',
    }

  } catch (error) {
    return {
      ok: false,
      message: "No se pudo actualizar, revisar logs"
    }
  }




}