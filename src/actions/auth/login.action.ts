'use server';

import { signIn } from '@/auth.config';
import prisma from '@/lib/prisma';
// import { sleep } from '@/utils';
// import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // await sleep(2);

    // aca iria google, lo que tengamos, en este caso solo tenemos credentials
    // await signIn('credentials, github, google', formData);
    console.log({ formData: Object.fromEntries(formData) })
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,

    });


    return "Success"

  } catch (error) {


    /* if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      } */

    // en el caso de que las credenciales sean incorrectas
    // if ((error as any).type === 'CredentialsSignin') {
    //   return 'Invalid credentials';
    // }

    // deberiamos evaluar el tipo de error y acorde a eso reaccionar
    console.log(error)
    return 'CredentialsSignin'

    // return 'UnknownError'
  }
  // throw error;
}


export const login = async (email: string, password: string) => {

  try {

    const user = await prisma.user.findUnique({ where: { email } });
    if (user?.role === 'banned') {
      return {
        ok: false,
        message: 'Cuenta bloqueada. Contacte al administrador.',
      };
    }

    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    // Restablecer intentos fallidos al inicio de sesión exitoso
    await prisma.user.update({
      where: { email },
      data: {
        failedAttempts: 0,
        role: 'user',
      },
    });


    return {
      message: 'Login successful',
      ok: true
    }


  } catch (error) {

    // esto lo veremos y analizaremos del lado del servidor (podriamos phacer un logger xD)
    console.log(error)

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        failedAttempts: {
          increment: 1,
        },
      },
    });

    // Verificar si el usuario alcanzó 5 intentos fallidos
    if (updatedUser.failedAttempts >= 5) {
      // Asignar rol 'banned'
      await prisma.user.update({
        where: { email },
        data: {
          role: 'banned',
        },
      });

      return {
        ok: false,
        message: 'Cuenta bloqueada por múltiples intentos fallidos.',
      };
    }


    return {
      ok: false,
      message: 'No se pudo iniciar sesion'
    }

  }

}