'use server'

import prisma from "@/lib/prisma"
import bcryptjs from 'bcryptjs';

export const registerUser = async (name: string, email: string, password: string) => {


  try {

    // creamos el usuario en db mediante prisma
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: bcryptjs.hashSync(password),
      },
      select: { // aca definimos que es lo que quiero que me regrese
        id: true,
        name: true,
        email: true
      }
    })

    return {
      ok: true,
      user: user,
      message: 'Usuario creado correctamente'
    }





  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'Error al registrar el usuario'
    }

  }

}