import { getCarBySlug } from "@/actions/cars/get-car-by-slug.action";
import { CarInfo, CarSlideshowV2 } from "@/components";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarMobileSlideshowV3 } from '../../../../components/car/CarMobileSlideshowV3';

interface Props {
  params: {
    slug: string;
  };
}

// TODO: VER
// Función para generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const car = await getCarBySlug(slug);

  // if (!car) {
  //   return {
  //     title: "Coche no encontrado",
  //     description: "El coche que estás buscando no existe.",
  //   };
  // }

  // return {
  //   title: `${car.brand.name.toUpperCase()} ${car.modelName.toUpperCase()} - ${car.year}`,
  //   description: `Descubre más sobre el ${car.brand.name} ${car.modelName} del año ${car.year} con transmisión ${car.transmission} y un kilometraje de ${car.km} km.`,
  //   openGraph: {
  //     title: `${car.brand.name.toUpperCase()} ${car.modelName.toUpperCase()} - ${car.year}`,
  //     description: `Descubre más sobre el ${car.brand.name} ${car.modelName} del año ${car.year}.`,
  //     images: car.images.map((url) => ({
  //       url,
  //       alt: `${car.brand.name} ${car.modelName}`,
  //     })),
  //   },
  // };

  return {
    title: car?.brand.name ?? "Producto no encontrado",
    description: car?.description ?? "",
    openGraph: {
      title: car?.brand.name ?? "Producto no encontrado",
      description: car?.description ?? "",
      // images: [], // https://misitioweb.com/products/image.png
      images: [`/images/usados/${car?.images[1]}`],
    },
  };
}

export default async function CarBySlugPage({ params }: Props) {
  const { slug } = params;

  // Llamada al server action para obtener el coche por su slug
  const car = await getCarBySlug(slug);

  // Si no existe el coche, mostramos la página 404
  if (!car) {
    notFound();
  }

  return (
    <div className="md:container m-auto mb-20 grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 mt-24">
      <div className="cols-span-1 md:col-span-1 lg:col-span-2">
        {/* Mobile Slideshow */}
        {/* <CarMobileSlideshowV2 car={car} images={car.images} className="block lg:hidden" /> */}
        <CarMobileSlideshowV3 car={car} className="block lg:hidden" />

        {/* Desktop Slideshow */}
        {/* <CarSlideshow car={car} images={car.images} className="hidden lg:block" /> */}
        <CarSlideshowV2 car={car} className="hidden lg:block" />
      </div>

      {/* Detalles */}
      {/* <div className="hidden lg:block col-span-1 px-5 relative 2xl:-left-40 mt-12"> */}
      <div className="hidden lg:block col-span-1 px-5 relative  mt-12"> {/* V2 */}
        <CarInfo car={car} />
      </div>
    </div>
  );
}
