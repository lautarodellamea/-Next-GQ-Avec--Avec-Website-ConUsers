"use client"

import { createUpdateCar } from "@/actions/cars/create-update-car";
import { deleteCarImage } from "@/actions/cars/delete-car.image.action";
import { CarImage } from "@/components";
import { OnlyBrand, Car, CarImage as CarWithImage } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


interface Props {
  car: Partial<Car> & { CarImage?: CarWithImage[] },
  brands: OnlyBrand[],
  isNewCar: string
}

interface FormInputs {
  vin: string,
  licensePlate: string,
  operationType: string,
  modelName: string,
  modelVersion: string,
  year: number,
  km: number,
  color: string,
  transmission: string,
  price: number,
  fuelType: string,
  location: string,
  engine: string,
  description?: string,
  inStock: number,
  slug: string,
  doors: number,
  currency: string,
  bodyStyle: string,
  vehicleTier: string,
  brandId: string,
  images?: FileList,
}




export const CarFormV2 = ({ car, brands, isNewCar }: Props) => {

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  // console.log(brands)
  // console.log(car)

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...car,
      description: undefined,
      images: undefined
    }
  });

  // genera el slug dinámicamente solo si el auto es nuevo
  useEffect(() => {
    if (isNewCar === "isNew") {
      const brandName = brands.find((brand) => brand.id === getValues("brandId"))?.name || "";
      const modelName = getValues("modelName") || "";
      const modelVersion = getValues("modelVersion") || "";
      const year = getValues("year") || "";
      const km = getValues("km") || "";

      if (brandName && modelName && modelVersion && year && km) {
        const generatedSlug = `${brandName}-${modelName}-${modelVersion}-${year}-${km}`
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""); // Elimina caracteres no alfanuméricos
        setValue("slug", generatedSlug); // Establece el valor del slug
      }
    }
  }, [
    isNewCar,
    brands,
    watch("brandId"),
    watch("modelName"),
    watch("modelVersion"),
    watch("year"),
    watch("km")
  ]);

  /* envio del formulario */
  const onSubmit = async (data: FormInputs) => {
    // console.log({ data })

    setLoading(true)

    const formData = new FormData()

    const { images, ...carToSave } = data

    if (isNewCar === "isNew") {
      formData.append('inStock', 'true')
    } else {
      formData.append('inStock', 'false')
    }

    if (car.id) {
      formData.append('id', car.id)
    }
    formData.append('vin', carToSave.vin);
    formData.append('licensePlate', carToSave.licensePlate);
    formData.append('operationType', carToSave.operationType);
    formData.append('brandId', carToSave.brandId);
    formData.append('modelName', carToSave.modelName);
    formData.append('modelVersion', carToSave.modelVersion);
    formData.append('engine', carToSave.engine);
    formData.append('slug', carToSave.slug);
    formData.append('price', carToSave.price.toString());
    // formData.append('inStock', carToSave.inStock.toString());
    formData.append('currency', carToSave.currency);
    formData.append('km', carToSave.km.toString());
    formData.append('year', carToSave.year.toString());
    formData.append('doors', carToSave.doors.toString());
    formData.append('fuelType', carToSave.fuelType);
    formData.append('bodyStyle', carToSave.bodyStyle);
    formData.append('transmission', carToSave.transmission);
    formData.append('color', carToSave.color);
    formData.append('location', carToSave.location);
    formData.append('vehicleTier', carToSave.vehicleTier);
    // formData.append('description', carToSave.description);


    console.log(images)
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }
    console.log(formData)

    console.log(images)

    const { ok, car: updatedCar } = await createUpdateCar(formData)

    console.log({ ok })

    if (!ok) {
      alert('No se pudo actualizar el vehículo')
      setLoading(false)
      return
    }

    // Resetear solo el campo `images`
    setValue("images", undefined); // Esto limpia el campo de imágenes

    setLoading(false)

    router.replace(`/admin/car/${updatedCar?.slug}`)
  }


  /* eliminacion de imagen con dialog */
  const [selectedImage, setSelectedImage] = useState<CarWithImage | null>(null);

  const onDelete = async () => {
    if (!selectedImage) return;

    setLoading(true);
    await deleteCarImage(selectedImage.id, selectedImage.url);
    setSelectedImage(null); // Cierra el diálogo después de eliminar
    setLoading(false);
  };


  // useEffect(() => {
  //   if (isNewCar === "isNew") {
  //     const brandName = brands.find((brand) => brand.id === form.watch("brandId"))?.name || "";
  //     const modelName = form.watch("modelName") || "";
  //     const modelVersion = form.watch("modelVersion") || "";
  //     const year = form.watch("year") || "";
  //     const km = form.watch("km") || "";

  //     if (brandName && modelName && modelVersion && year && km) {
  //       const generatedSlug = `${brandName}-${modelName}-${modelVersion}-${year}-${km}`
  //         .toLowerCase()
  //         .replace(/\s+/g, "-")
  //         .replace(/[^\w-]/g, "");
  //       form.setValue("slug", generatedSlug);
  //     }
  //   }
  // }, [isNewCar, brands, form.watch("brandId"), form.watch("modelName"), form.watch("modelVersion"), form.watch("year"), form.watch("km"), form]);



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 lg:grid-cols-3 gap-3">
        {/* Textos */}
        <div className="w-full col-span-2">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            <div className="flex flex-col mb-2">
              <span>Vin</span>
              <input disabled={loading} type="text" className="p-2 border rounded-md bg-gray-200" {...register("vin", { required: true })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Patente</span>
              <input disabled={loading} type="text" className="p-2 border rounded-md bg-gray-200" {...register("licensePlate", { required: true })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Tipo de operación</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("operationType", { required: true })}>
                <option value="">[Seleccione]</option>
                <option value="usado">Usado</option>
                <option value="nuevo">0 KM</option>
                <option value="planes">Plan</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <span>Marca</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("brandId", { required: true })}>
                <option value="">[Seleccione]</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <span>Nombre del modelo</span>
              <input disabled={loading} type="text" className="p-2 border rounded-md bg-gray-200" {...register("modelName", { required: true })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Versión del modelo</span>
              <input disabled={loading} type="text" className="p-2 border rounded-md bg-gray-200" {...register("modelVersion", { required: true })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Motor</span>
              <input disabled={loading} type="text" className="p-2 border rounded-md bg-gray-200" {...register("engine", { required: true })} />
            </div>

            {isNewCar !== "isNew" && (
              <div className="flex flex-col mb-2">
                <span>Slug</span>
                <input disabled={loading} type="text" className="p-2 border rounded-md bg-gray-200" {...register("slug", { required: true })} />
              </div>
            )}

            <div className="flex flex-col mb-2">
              <span>Precio</span>
              <input disabled={loading} type="number" className="p-2 border rounded-md bg-gray-200" {...register("price", { required: true, min: 0 })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Moneda</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("currency", { required: true })}>
                <option value="">[Seleccione]</option>
                <option value="ars">ARS</option>
                <option value="usd">USD</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <span>Kilometraje</span>
              <input disabled={loading} type="number" className="p-2 border rounded-md bg-gray-200" {...register("km", { required: true, min: 0 })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Año</span>
              <input disabled={loading} type="number" className="p-2 border rounded-md bg-gray-200" {...register("year", { required: true, min: 0 })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Puertas</span>
              <input disabled={loading} type="number" className="p-2 border rounded-md bg-gray-200" {...register("doors", { required: true, min: 0 })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Tipo de combustible</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("fuelType", { required: true })}>
                <option value="">[Seleccione]</option>
                <option value="nafta">Nafta</option>
                <option value="diesel">Diésel</option>
                <option value="gnc">GNC</option>
                <option value="electrico">Eléctrico</option>
                <option value="hibrido">Hibrido</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <span>Segmento</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("bodyStyle", { required: true })}>
                <option value="">[Seleccione]</option>
                <option value="hatchback">Hatchback</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedán</option>
                <option value="pickup">Pickup</option>
                <option value="furgon">Furgón</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <span>Transmisión</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("transmission", { required: true })}>
                <option value="">[Seleccione]</option>
                <option value="automatico">Automático</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <span>Color</span>
              <input disabled={loading} type="text" className="p-2 border rounded-md bg-gray-200" {...register("color", { required: true })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Sucursal</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("location", { required: true })}>
                <option value="">[Seleccione]</option>
                <option value="cordoba">Córdoba</option>
                <option value="buenos aires">Buenos Aires</option>
                <option value="santa fe">Santa Fe</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <span>Tier del vehículo</span>
              <select disabled={loading} className="p-2 border rounded-md bg-gray-200" {...register("vehicleTier", { required: true })}>
                <option value="">[Seleccione]</option>
                <option value="generico">Genérico</option>
                <option value="Importado">Importado</option>
              </select>
            </div>

          </div>
          <button className={`mt-2 w-60 font-semibold bg-avecLightBlueColor hover:bg-avecBlueColor transition-all text-white py-2 px-6 block ${loading && 'opacity-50 pointer-events-none'}`}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>


        <div className="w-full col-span-1">
          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              disabled={loading}
              {...register('images')}
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif, image/webp"
            />
          </div>

          <div className="flex flex-wrap gap-2 gap-y-10 sm:grid grid-cols-5  lg:grid-cols-2  xl:gap-y-0 xl:gap-x-2">
            {
              car.CarImage?.map(image => (
                <div className="w-[100px] sm:w-full h-[100px] sm:h-[150px] lg:h-[145px] xl:h-[180px]" key={image.id}>
                  <CarImage
                    key={image.id}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded-t shadow-md h-[110px] xl:h-[150px] w-full object-cover"
                    alt={car.slug ?? ''}
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(image)} // Selecciona la imagen actual
                    className="bg-red-600 text-white w-full rounded-b-sm hover:bg-red-700 transition-all">
                    Eliminar
                  </button>
                </div>
              ))
            }

            <AlertDialog open={!!selectedImage}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar esta imagen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción eliminará permanentemente la imagen seleccionada. ¿Estás seguro de que deseas continuar?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setSelectedImage(null)}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className={`bg-red-600 hover:bg-red-700 hover:brightness-125 ${loading && 'opacity-50 pointer-events-none'}`}>
                    {loading ? 'Eliminando...' : 'Eliminar'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

      </form >






    </>
  );
};





