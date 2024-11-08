/* eslint-disable @next/next/no-img-element */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import Link from "next/link"
import { login } from "@/actions/auth/login.action"
import { registerUser } from "@/actions/auth/register.action"


const formSchema = z.object({

  name: z.string().min(2, {
    message: "Por favor, introduzca su nombre.",
  }).max(50, {
    message: "El nombre debe tener menos de 50 caracteres.",
  }).refine((value) => value.trim() !== "", {
    message: "El nombre no puede contener solo espacios.",
  }),



  email: z
    .string()
    .email({ message: "Por favor, introduzca una dirección de correo electrónico válida." })
    .refine((value) => value.trim() !== "", {
      message: "El correo no puede contener solo espacios.",
    }),


  password: z
    .string()
    .min(4, {
      message: "Por favor, introduzca su contraseña.",
    })
    .refine((value) => value.trim() !== "", {
      message: "La contraseña no puede contener solo espacios.",
    }),


})

export const NewAccountForm = () => {

  const [errorMessage, seterrorMessage] = useState<string>('')

  const [loading, setLoading] = useState(false)



  // 1. defino el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // console.log(form.getValues())

  // 2. defino el handler submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values })

    // Limpia los espacios en blanco antes de enviar
    const cleanedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };

    console.log({ cleanedValues });

    setLoading(true);

    // server actions del register
    const resp = await registerUser(cleanedValues.name, cleanedValues.email, cleanedValues.password)

    if (!resp.ok) {
      seterrorMessage(resp.message)
      return
    }

    console.log({ resp })

    // server action del login
    await login(cleanedValues.email.toLowerCase(), cleanedValues.password)
    window.location.replace("/")


    setLoading(false);

    // Llamar a la API para enviar el correo
    /*  try {
       const response = await fetch('/api/send', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(cleanedValues),
       });
 
       const result = await response.json();
 
       if (response.ok) {
         console.log('¡Correo enviado exitosamente!', result);
 
         toast({
           title: "Formulario enviado correctamente",
           description: "Se ha enviado el formulario exitosamente.",
           action: (
             // <ToastAction className="bg-green-500 text-white" altText="Ok">Ok</ToastAction>
             <MyToastAction />
           ),
         });
 
         setLoading(false);
 
 
       } else {
         console.error('Error al enviar el correo:', result.error);
         setLoading(false);
         toast({
           title: "Error al enviar el formulario",
           description: " Se ha producido un error al enviar el formulario, comuniquese con soporte info@avec.com.",
           action: (
             <MyToastAction variant="danger" />
           ),
         });
       }
     } catch (error) {
       console.error('Hubo un problema al enviar el correo:', error);
 
       setLoading(false);
       toast({
         title: "Error al enviar el formulario",
         description: " Se ha producido un error al enviar el formulario, comuniquese con soporte info@avec.com.",
         action: (
           <MyToastAction variant="danger" />
         ),
       });
     } */



    console.log("¡Formulario enviado!")
    form.reset()
  }


  return (

    <>
      <div>

        {/*  <div className="sm:mt-4 mb-4 sm:max-w-[60%] sm:mb-6">
          <h1 className="title">Panel Administrativo</h1>

          <p className="text-slate-600 text-sm sm:text-base">
            Por favor, completá el siguiente formulario y pronto uno de nuestros asesores se comunicará contigo para proporcionarte más información.
          </p>
        </div> */}


        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <div className="grid grid-cols-1 gap-4 w-[600px]">



              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" type=" text" placeholder="Introduce tu nombre" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" type=" email" placeholder="Introduce tu correo" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Número */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" type="password" placeholder="Introduce tu contraseña" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>





            <span className="text-red-500">{errorMessage}</span>

            {/* Submit */}
            {
              loading ? (
                <Button className="w-full" disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Creando
                </Button>
              ) : (
                <Button className="w-full" variant="avecBtnPrimary" type="submit">Crear cuenta</Button>
              )
            }




          </form>

        </FormProvider>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login"
          className="btn-secondary text-center">
          <Button className="w-full bg-[#f4f4f4] text-avecBlueColor hover:bg-avecBlueColor hover:text-white" variant="avecBtnPrimary" type="submit">Ingresar</Button>
        </Link>


      </div>




    </>
  )
}
