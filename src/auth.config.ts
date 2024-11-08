/* Sacar el desactivado */

import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    jwt({ token, user }) {
      //console.log({ token, user }) // el user de aca, es todo lo que me da la funcion al devolverme el rest en el ultimo return, yo quiero agregarlo a mi token para poder obtener esa info
      if (user) {
        token.data = user
      }

      return token
    },
    session({ session, token, user }) {
      console.log({ session, token, user })

      // agregamos la propiedad data a nuestro objeto de session
      // en la seccion de profile ahora veremos mas detalles sobre el usuario
      session.user = token.data as any

      return session
    }
  },
  session: {
    // Duración del token en segundos (por ejemplo, 1 hora)
    maxAge: 60 * 60, // 1 hora
    // updateAge: 24 * 60 * 60, // Tiempo de actualización del token (por ejemplo, 24 horas)

    // TODO: VERIFICAR  SI ESTO ANDA
    updateAge: 60 * 60, // Tiempo de actualización del token (por ejemplo, 24 horas)
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

        // console.log("Received credentials:", credentials);
        // console.log("Validation result:", parsedCredentials);

        // console.log(parsedCredentials.success)

        if (!parsedCredentials.success) return null;


        const { email, password } = parsedCredentials.data;
        // console.log("auth.config.ts")
        // console.log({ email, password });

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          }
        })

        if (!user) {
          console.log("User not found.");
          return null;
        }

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) {
          console.log("Passwords do not match.");
          return null;
        }

        // Regresar el usuario
        const { password: _, ...rest } = user
        // console.log(rest)

        return rest
      },
    }),
  ]
};


export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);