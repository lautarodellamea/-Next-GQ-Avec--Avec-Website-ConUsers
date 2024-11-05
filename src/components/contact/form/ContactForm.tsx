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


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "@/components/hooks/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { MyToastAction } from "@/components/ui/my-toast/MyToastAction"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Por favor, introduzca su nombre.",
  }).max(50, {
    message: "Por favor, introduzca un nombre más corto.",
  }).refine((value) => value.trim() !== "", {
    message: "El nombre no puede contener solo espacios.",
  }),

  lastname: z.string().min(2, {
    message: "Por favor, introduzca su apellido.",
  }).max(50, {
    message: "Por favor, introduzca un apellido más corto.",
  }).refine((value) => value.trim() !== "", {
    message: "El apellido no puede contener solo espacios.",
  }),

  email: z
    .string()
    .email({ message: "Por favor, introduzca una dirección de correo electrónico válida." })
    .refine((value) => value.trim() !== "", {
      message: "El correo no puede contener solo espacios.",
    }),

  phone: z
    .string()
    .min(10, {
      message: "Por favor, introduzca un número de contacto sin 0 ni 15.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El teléfono no puede contener solo espacios.",
    }),

  brand: z
    .string()
    .min(1, {
      message: "Por favor, seleccione una marca.",
    })
    .refine((value) => value.trim() !== "", {
      message: "La marca no puede contener solo espacios.",
    }),

  service: z
    .string()
    .min(1, {
      message: "Por favor, seleccione un motivo de cconsulta.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El motivo de consulta no puede contener solo espacios.",
    }),

  locality: z
    .string()
    .min(1, {
      message: "Por favor, seleccione una sucursal.",
    })
    .refine((value) => value.trim() !== "", {
      message: "La sucursal no puede contener solo espacios.",
    }),

  consultation: z
    .string()
    .min(1, {
      message: "Por favor, escriba su consulta.",
    })
    .max(250, {
      message: "Por favor, menos de 250 caracteres.",
    })
    .refine((value) => value.trim() !== "", {
      message: "La consulta no puede contener solo espacios.",
    }),
})

export const ContactForm = () => {



  const [loading, setLoading] = useState(false)



  // 1. defino el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   name: "aaaa",
    //   lastname: "aaaa",
    //   email: "aaaa@gmail.com",
    //   phone: "1234567890",
    //   brand: "fiat",
    //   consultation: "aaaa",
    //   service: "aaaa",
    //   locality: "aaaa",
    // },
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      brand: "",
      consultation: "",
      service: "",
      locality: "",
    },
  })

  // console.log(form.getValues())

  // 2. defino el handler submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values })


    // Limpia los espacios en blanco antes de enviar
    const cleanedValues = {
      name: values.name.trim(),
      lastname: values.lastname.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      locality: values.locality.trim(),
      brand: values.brand.trim(),
      service: values.service.trim(),
      consultation: values.consultation.trim(),
    };

    console.log({ cleanedValues });


    setLoading(true);

    // Llamar a la API para enviar el correo
    try {
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
    }



    console.log("¡Formulario enviado!")
    form.reset()
  }


  return (

    <>
      <div>

        <div className="sm:mt-4 mb-4 sm:max-w-[60%] sm:mb-6">
          <h1 className="title">Contactate con nosotros</h1>

          <p className="text-slate-600 text-sm sm:text-base">
            Por favor, completa el siguiente formulario y pronto uno de nuestros asesores se comunicará contigo para proporcionarte más información.
          </p>
        </div>


        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl >
                      <Input className="bg-avecGrayInputColor   focus-visible:ring-gray-400" placeholder="Introduce tu nombre" disabled={loading} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Apellido */}
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" placeholder=" Introduce tu apellido" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" type=" number" placeholder="Introduce tu telefono" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Marca */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿En que marca esta interesado?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione una marca de interes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Marca</SelectLabel>
                            <SelectItem value="peugeot">Peugeot</SelectItem>
                            <SelectItem value="citroen">Citroën</SelectItem>
                            <SelectItem value="ds">DS Automobiles</SelectItem>
                            <SelectItem value="fiat">Fiat</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Sucursal */}
              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sucursal de interes</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione una sucursal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sucursal</SelectLabel>
                            <SelectItem value="cordoba">Córdoba</SelectItem>
                            <SelectItem value="buenos aires">Buenos Aires</SelectItem>
                            <SelectItem value="santa fe">Santa Fe</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              {/* Motivo de la consulta */}
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Cual es su motivo de consulta?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}
                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione un motivo de consulta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Motivo de consulta</SelectLabel>
                            <SelectItem value="ventas">Ventas</SelectItem>
                            <SelectItem value="postventa">Postventa</SelectItem>
                            <SelectItem value="planahorro">Plan de ahorro</SelectItem>
                            <SelectItem value="otros">Otros</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*Mensaje */}
            <FormField
              control={form.control}
              name="consultation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Cual es tu consulta?</FormLabel>
                  <FormControl>
                    <Textarea className="bg-avecGrayInputColor border-gray-200" rows={4} disabled={loading} placeholder="Introduce tu consulta..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />



            {/* Submit */}
            {
              loading ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Enviando
                </Button>
              ) : (
                <Button variant="avecBtnPrimary" type="submit">Enviar</Button>
              )
            }




          </form>

          {/* <BrandForm /> */}
          <img className="relative m-auto mt-10 mb-10 right-0 opacity-10" src="images/brands/brands.png" alt="logos" />

        </FormProvider>


      </div>




    </>
  )
}
