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
import { useEffect, useState } from "react"
import Link from "next/link"
import { useFormState } from "react-dom"
import { InfoIcon } from "lucide-react"
import { authenticate, login } from "@/actions/auth/login.action"


const formSchema = z.object({


  email: z
    .string()
    .email({ message: "Por favor, introduzca una dirección de correo electrónico válida." })
    .refine((value) => value.trim() !== "", {
      message: "El correo no puede contener solo espacios.",
    }),


  password: z
    .string()
    .min(3, {
      message: "Por favor, introduzca su contraseña.",
    })
    .refine((value) => value.trim() !== "", {
      message: "La contraseña no puede contener solo espacios.",
    })


})

export const LoginForm = () => {
  const [errorMessage, seterrorMessage] = useState<string>('')
  // const router = useRouter()

  const [state, dispatch] = useFormState(authenticate, undefined)
  // console.log({ state })

  const [loading, setLoading] = useState(false)


  useEffect(() => {

    if (state === "Success") {
      // redireccionar
      // router.replace("/")
      window.location.replace("/") // usamos esto para que al logear se refresque y se renderize todod e nuevo mostrando asi lo que debe y no tener que hacer un reload nosotros mismos, el replace hace el refresh del navegador (esto se usa solo del lado del cliente)
    }

  }, [state])



  // 1. defino el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  // 2. defino el handler submit
  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log({ values })

    setLoading(true);

    // server action del login
    const resp = await login(values.email, values.password)
    // console.log(resp)

    if (!resp.ok) {
      seterrorMessage(resp.message)
      setLoading(false);
      form.reset()
      return
    }
    seterrorMessage("")
    // setLoading(false);
    window.location.replace("/profile")


    // console.log("¡Formulario enviado!")
    form.reset()
  }



  return (

    <>
      <div>

        <div className="max-w-[600px] sm:w-[600px]">
          <h1 className="title">Panel Administrativo</h1>
          {/* <p className="text-slate-600 text-sm sm:text-base ">
            Por favor, completá el siguiente formulario y pronto uno de nuestros asesores se comunicará contigo para proporcionarte más información.
          </p> */}
        </div>



        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} action={dispatch} className="space-y-4">

            <div className="grid grid-cols-1 gap-4 max-w-[600px]">



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



            {state === "CredentialsSignin" && (
              <div className="flex flex-row mb-2 gap-1">
                <InfoIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">
                  Credenciales incorrectas
                </p>
              </div>
            )}
            {errorMessage && (
              <div className="flex flex-row mb-2 gap-1">
                <InfoIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">
                  Credenciales incorrectas
                </p>
              </div>
            )}



            {/* Submit */}
            {
              loading ? (
                <Button className="w-full" disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Ingresando
                </Button>
              ) : (
                <Button className="w-full" variant="avecBtnPrimary" type="submit">Ingresar</Button>
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
          href="/auth/new-account"
          className="btn-secondary text-center">
          <Button className="w-full bg-[#f4f4f4] text-avecBlueColorDark hover:bg-avecBlueColor hover:text-white" variant="avecBtnPrimary" type="submit">Crear Cuenta</Button>
        </Link>

      </div>




    </>
  )
}

