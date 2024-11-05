
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
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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




export function FormCarUsado({ titleForm, serviceForm, isOpen, setIsOpen }: Props) {

  // const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast()

  const [loading, setLoading] = useState(false);


  // Definicion del formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consultation: "",
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
      consultation: values.consultation.trim(),
      service: values.service.trim()
    };

    console.log({ cleanedValues });

    // Aquí puedes llamar a la función para enviar el correo usando los valores limpios
    // Por ejemplo: await sendEmail(cleanedValues);

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
    setIsOpen(false);
  }


  // Función para manejar el cierre del diálogo
  /*   const handleClose = () => {
      setIsOpen(false); // Cierra el diálogo
      form.reset(); // Resetea el formulario
    };
   */


  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="hidden" asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>{titleForm}</DialogTitle>
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
                      <Input placeholder="Nombre y apellido..." {...field} />
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
          {/* <DialogFooter>
            <img src="/images/brands/brands.png" className="opacity-10" alt="" />
          </DialogFooter> */}
        </DialogContent>
      </Dialog>


    </div>
  )
}