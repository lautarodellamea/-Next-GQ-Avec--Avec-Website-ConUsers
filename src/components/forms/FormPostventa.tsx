/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "../hooks/use-toast"
import { MyToastAction } from "../ui/my-toast/MyToastAction"


interface Props {
  titleForm: string
  serviceForm: string

  // para manejar que forulario voy a abrir
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Esquematizacion del formulario */
const formSchema = z.object({

  name: z.string().min(2, {
    message: "Por favor, introduzca su nombre.",
  }).max(50, {
    message: "Por favor, introduzca un nombre más corto.",
  }).refine((value) => value.trim() !== "", {
    message: "El nombre no puede contener solo espacios.",
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

  service: z.string()
})




export function FormPostventa({ titleForm, serviceForm, isOpen, setIsOpen }: Props) {

  const { toast } = useToast()

  const [loading, setLoading] = useState(false);


  // Definicion del formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      brand: "",
      locality: "",
      consultation: "",

      // aca paso la prop para saber que formulario/servicio se envio
      service: serviceForm
    },
    // defaultValues: {
    //   name: "Lautaro Della Mea",
    //   email: "lautarodm@gmail.com",
    //   phone: "3585106416",
    //   locality: "cordoba",
    //   consultation: "Mensaje de consulta de prueba",
    // },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values })

    // Limpia los espacios en blanco antes de enviar
    const cleanedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      brand: values.brand.trim(),
      locality: values.locality.trim(),
      consultation: values.consultation.trim(),
      service: values.service.trim()
    };

    console.log({ cleanedValues });

    // aca podemos llamar a la función para enviar el correo usando los valores limpios
    // Por ejemplo: await sendEmail(cleanedValues); *mas abajo lo hago*

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
        console.log('FormService.tsx: ¡Correo enviado exitosamente!', result);

        /* toast que indica que el correo ha sido enviado */
        toast({
          title: "Formulario enviado correctamente",
          description: "Se ha enviado el formulario exitosamente.",
          action: (
            <MyToastAction />
          ),
        });

        setLoading(false);


      } else {
        console.error('FormService.tsx: Error al enviar el correo:', result.error);
        setLoading(false);

        /* toast que indica que el correo no ha sido enviado (relacionados con la api) */
        toast({
          title: "Error al enviar el formulario",
          description: "Se ha producido un error al enviar el formulario, comuniquese con soporte info@avec.com.",
          action: (
            <MyToastAction variant="danger" />
          ),
        });
      }
    } catch (error) {
      console.error('Hubo un problema al enviar el correo:', error);
      setLoading(false);

      /* toast que indica que el correo no ha sido enviado (errores de red o de ejecución) */
      toast({
        title: "Error al enviar el formulario",
        description: "Se ha producido un error al enviar el formulario, comuniquese con soporte info@avec.com.",
        action: (
          <MyToastAction variant="danger" />
        ),
      });

    }

    console.log("FormService.tsx: ¡Formulario enviado!")
    form.reset()
    setIsOpen(false);
  }



  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="hidden" asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Avec - {titleForm}</DialogTitle>
            <DialogDescription>
              Por favor rellena este formulario para realizar una consulta y nos pondremos en contacto contigo.
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">

              {/* NOMBRE */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Nombre</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Nombre y apellido..." {...field} autoFocus={false} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input type="email" placeholder="Email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TELEFONO */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Teléfono</FormLabel> */}
                    <FormControl>
                      <Input type="number" placeholder="Teléfono..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SERVICIO */}
              {/*               {
                serviceForm === 'usado' && (
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servicio</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Servicio..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              } */}

              {/* MARCA */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Sucursal</FormLabel> */}
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                          className={`w-full ${field.value ? 'text-black' : 'text-gray-500'}`}
                        >
                          <SelectValue placeholder="Selecciona una marca" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Marcas</SelectLabel>
                            <SelectItem value="cordoba">Peugeot</SelectItem>
                            <SelectItem value="citröen">Citroën</SelectItem>
                            <SelectItem value="ds automobiles">DS Automobiles</SelectItem>
                            <SelectItem value="fiat">Fiat</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SUCURSAL */}
              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Sucursal</FormLabel> */}
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                          className={`w-full ${field.value ? 'text-black' : 'text-gray-500'}`}
                        >
                          <SelectValue placeholder="Selecciona la sucursal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sucursales</SelectLabel>
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

              {/* MENSAJE */}
              <FormField
                control={form.control}
                name="consultation"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Mensaje</FormLabel> */}
                    <FormControl>
                      <Textarea placeholder="Consulta..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* SERVICIO */}
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Nombre</FormLabel> */}
                    <FormControl>
                      <Input  {...field} className="hidden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </form>
          </FormProvider>
          {/*  <DialogFooter>
            <img src="/images/brands/brands.png" className="opacity-10" alt="" />
          </DialogFooter> */}
        </DialogContent>
      </Dialog>


    </div>
  )
}