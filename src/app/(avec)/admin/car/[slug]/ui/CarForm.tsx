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

import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Checkbox } from "@/components"
import { Car, CarImage, OnlyBrand } from "@/interfaces"
import Image from "next/image"


interface Props {
  car: Car & { CarImage?: CarImage[] },
  brands: OnlyBrand[],
}


const formSchema = z.object({

  vin: z.string().min(2, {
    message: "Por favor, introduzca el VIN.",
  }).max(50, {
    message: "Por favor, introduzca un VIN más corto.",
  }).refine((value) => value.trim() !== "", {
    message: "El VIN no puede contener solo espacios.",
  }),

  licensePlate: z.string().min(2, {
    message: "Por favor, introduzca la patente/dominio.",
  }).max(50, {
    message: "Por favor, introduzca una patente más corta.",
  }).refine((value) => value.trim() !== "", {
    message: "El VIN no puede contener solo espacios.",
  }).refine((value) => /^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$/.test(value.trim()), {
    message: "La patente debe tener el formato AAA333 o AA333AA (SOLO LETRAS MAYUSCULAS).", /* AAA333, AA333AA */
  }),

  operationType: z
    .string()
    .min(1, {
      message: "Por favor, seleccione un tipo de operación.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El tipo de operación no puede contener solo espacios.",
    }),

  brandId: z
    .string(),
  // brandId: z
  //   .string()
  //   .min(1, {
  //     message: "Por favor, seleccione una marca.",
  //   })
  //   .refine((value) => value.trim() !== "", {
  //     message: "La marca no puede contener solo espacios.",
  //   }),

  modelName: z.string().min(2, {
    message: "Por favor, introduzca el nombre del modelo.",
  }).max(50, {
    message: "Por favor, introduzca un nombre de modelo más corto.",
  }).refine((value) => value.trim() !== "", {
    message: "El nombre del modelo no puede contener solo espacios.",
  }),

  modelVersion: z.string().min(2, {
    message: "Por favor, introduzca la version del modelo.",
  }).max(50, {
    message: "Por favor, introduzca una version del modelo más corta.",
  }).refine((value) => value.trim() !== "", {
    message: "La version del modelo no puede contener solo espacios.",
  }),

  engine: z.string().min(2, {
    message: "Por favor, introduzca el motor.",
  }).max(50, {
    message: "Por favor, introduzca un valor mas corto.",
  }).refine((value) => value.trim() !== "", {
    message: "El valor del motor no puede contener solo espacios.",
  }),

  slug: z.string().min(2, {
    message: "Por favor, introduzca el slug.",
  }).max(50, {
    message: "Por favor, introduzca una slug más corta.",
  }).refine((value) => value.trim() !== "", {
    message: "El slug no puede contener solo espacios.",
  }),

  price: z.number().min(2, {
    message: "Por favor, introduzca el precio.",
  }),

  currency: z
    .string()
    .min(1, {
      message: "Por favor, seleccione el tipo de moneda.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El tipo de moneda no puede contener solo espacios.",
    }),

  km: z.number({
    required_error: "Por favor, introduzca el kilometraje.",
  })
    .nonnegative({ message: "La cantidad de km no puede ser negativa." }),

  year: z.number({
    required_error: "Por favor, introduzca el año.",
  })
    .min(1800, { message: "El año no puede ser menor a 1800." })
    .max(new Date().getFullYear(), { message: `El año no puede ser mayor al año actual.` }),

  doors: z.number({
    required_error: "Por favor, introduzca la cantidad de puertas.",
  })
    .nonnegative({ message: "La cantidad de puertas no puede ser negativa." }),

  fuelType: z
    .string()
    .min(1, {
      message: "Por favor, seleccione un tipo de combustible.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El tipo de combustible no puede contener solo espacios.",
    }),

  bodyStyle: z
    .string()
    .min(1, {
      message: "Por favor, seleccione un tipo de carrocería.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El tipo de carrocería no puede contener solo espacios.",
    }),

  transmission: z
    .string()
    .min(1, {
      message: "Por favor, seleccione un tipo de transmisión.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El tipo de transmisión no puede contener solo espacios.",
    }),

  color: z
    .string()
    .min(1, {
      message: "Por favor, seleccione un color.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El color no puede contener solo espacios.",
    }),

  location: z
    .string()
    .min(1, {
      message: "Por favor, seleccione una sucursal.",
    })
    .refine((value) => value.trim() !== "", {
      message: "La sucursal no puede contener solo espacios.",
    }),

  vehicleTier: z
    .string()
    .min(1, {
      message: "Por favor, seleccione el tier del vehículo.",
    })
    .refine((value) => value.trim() !== "", {
      message: "El tier del vehículo no puede contener solo espacios.",
    }),

  description: z
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

  images: z.array(z.string()),

  /* images: z
    .custom<FileList>((value) => value instanceof FileList && value.length > 0, {
      message: "Por favor, suba al menos una imagen.",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
        ),
      {
        message: "Solo se permiten archivos de imagen en formato PNG, JPEG o JPG.",
      }
    ), */

  inStock: z.boolean()
})

export const CarForm = ({ car, brands }: Props) => {



  const [loading, setLoading] = useState(false)


  // console.log(brands)
  // console.log(car)

  // 1. defino el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      ...car,

    },
    /*  defaultValues: {
       vin: "123ASD",
       licensePlate: "AAA333",
       operationType: "usado",
       brand: "peugeot",
       modelName: "3008",
       modelVersion: "aa",
       engine: "1.6",
       slug: "asd_asd",
       price: 1000,
       currency: "ars",
       // km: 1234,
       // year: 2000,
       // doors: 0,
       fuelType: "nafta",
       bodyStyle: "sedan",
       transmission: "automatico",
       color: "rojo",
       location: "santa fe",
       vehicleTier: "generico",
       description: "-",
       inStock: true,
     } */

  })

  // console.log(form.getValues())

  // 2. defino el handler submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values })


    // Limpia los espacios en blanco antes de enviar
    const cleanedValues = {
      vin: values.vin.trim(),
      licensePlate: values.licensePlate.trim(),
      operationType: values.operationType.trim(),
      brandId: values.brandId,
      modelName: values.modelName.trim(),
      modelVersion: values.modelVersion.trim(),
      engine: values.engine.trim(),
      slug: values.slug.trim(),
      price: values.price,
      currency: values.currency.trim(),
      km: Number(values.km),
      year: Number(values.year),
      doors: Number(values.doors),
      fuelType: values.fuelType.trim(),
      bodyStyle: values.bodyStyle.trim(),
      transmission: values.transmission.trim(),
      color: values.color.trim(),
      location: values.location.trim(),
      vehicleTier: values.vehicleTier.trim(),
      description: values.description.trim(),
      images: values.images,
      inStock: values.inStock,

    };

    console.log({ cleanedValues });


    setLoading(true);





    // console.log("¡Formulario enviado!")
    // form.reset()
  }


  return (

    <>
      <div>




        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">

              {/* VIN */}
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIN</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" placeholder="Ingrese el VIN" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Patente */}
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patente (Dominio)</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" placeholder="Ingrese la patente" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tipo de operacion */}
              <FormField
                control={form.control}
                name="operationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de operación</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Tipo de operación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Operación</SelectLabel>
                            <SelectItem value="usado">Usado</SelectItem>
                            <SelectItem value="nuevo">0 KM</SelectItem>
                            <SelectItem value="plan">Plan</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Marca */}
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value || ""}
                        disabled={loading}
                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione la marca" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Marca</SelectLabel>
                            {brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nombre del modelo */}
              <FormField
                control={form.control}
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del modelo</FormLabel>
                    <FormControl >
                      <Input className="bg-avecGrayInputColor focus-visible:ring-gray-400" placeholder="Ingrese el nombre del modelo" disabled={loading} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Version del modelo */}
              <FormField
                control={form.control}
                name="modelVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Versión del modelo</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" placeholder="Ingrese la version del modelo" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Motor */}
              <FormField
                control={form.control}
                name="engine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motor</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" type=" number" placeholder="Ingrese el motor" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl >
                      <Input className="bg-avecGrayInputColor focus-visible:ring-gray-400" placeholder="Ingrese el slug" disabled={loading} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precio */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-avecGrayInputColor"
                        type="number"
                        placeholder="Ingrese el precio"
                        disabled={loading}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Conversión a número
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Moneda */}
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moneda</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione la moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Moneda</SelectLabel>
                            <SelectItem value="ars">Peso Argentino</SelectItem>
                            <SelectItem value="usd">Dólar</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kilometraje */}
              <FormField
                control={form.control}
                name="km"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kilometraje</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-avecGrayInputColor"
                        type="number"
                        placeholder="Ingrese el kilometraje"
                        disabled={loading}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value)); // Permite vacío
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Año */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-avecGrayInputColor"
                        type="number"
                        placeholder="Ingrese el año" disabled={loading}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value)); // Permite vacío
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Puertas */}
              <FormField
                control={form.control}
                name="doors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puertas</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-avecGrayInputColor"
                        type="number"
                        placeholder="Ingrese la cantidad de puertas"
                        disabled={loading}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value)); // Permite vacío
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Combustible */}
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Combustible</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione el tipo de combustible" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Combustible</SelectLabel>
                            <SelectItem value="nafta">Nafta</SelectItem>
                            <SelectItem value="diesel">Diésel</SelectItem>
                            <SelectItem value="gnc">GNC</SelectItem>
                            <SelectItem value="hibrido">Hibrido</SelectItem>
                            <SelectItem value="eléctrico">Electrico</SelectItem>

                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Segmento */}
              <FormField
                control={form.control}
                name="bodyStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione la marca" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Segmento</SelectLabel>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="sedan">Sedán</SelectItem>
                            <SelectItem value="pickup">Pickup</SelectItem>
                            <SelectItem value="furgon">Furgón</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Transmision */}
              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transmisión</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione la marca" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Transmisión</SelectLabel>
                            <SelectItem value="automatico">Automático</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input className="bg-avecGrayInputColor" placeholder="Ingrese el color" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Localidad */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sucursal</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione la sucursal" />
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

              {/*Mensaje */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción (opcional)</FormLabel>
                    <FormControl>
                      <Textarea className="bg-avecGrayInputColor border-gray-200" rows={4} disabled={loading} placeholder="Ingrese la descripción..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tier del vehículo */}
              <FormField
                control={form.control}
                name="vehicleTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier del vehículo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}

                      >
                        <SelectTrigger className={`w-full bg-avecGrayInputColor ${field.value ? 'text-black' : 'text-gray-500'}`}>
                          <SelectValue placeholder="Seleccione la sucursal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tier del vehículo</SelectLabel>
                            <SelectItem value="generico">Genérico</SelectItem>
                            <SelectItem value="importado">Importado</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock */}
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row  gap-3">
                    <FormLabel className="mt-2">En stock</FormLabel>
                    <FormControl>
                      <Checkbox disabled={loading} {...field} onCheckedChange={field.onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Imagenes */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imágenes del vehículo</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-avecGrayInputColor"
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                        disabled={loading}
                        onChange={(e) => field.onChange(e.target.files)} // Captura el FileList de archivos
                      // Configura el valor a `undefined` para evitar errores en la gestión del valor de archivos
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



            </div>














            {/* Submit */}
            {
              loading ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Cargar
                </Button>
              ) : (
                <Button variant="avecBtnPrimary" type="submit">Cargar</Button>
              )
            }




          </form>

          {/* <BrandForm /> */}
          <img className="relative m-auto mt-10 mb-10 right-0 opacity-10" src="images/brands/brands.png" alt="logos" />

        </FormProvider>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {
            car.CarImage?.map(image => (
              <div key={car.slug}>
                <Image key={image.id}
                  src={`/images/usados/${image.url}`}
                  width={300}
                  height={300}
                  className="rounded shadow-md"
                  alt={car.slug ?? ''}
                />
                <button>Eliminar</button>
              </div>

            ))
          }
        </div>


      </div >




    </>
  )
}
