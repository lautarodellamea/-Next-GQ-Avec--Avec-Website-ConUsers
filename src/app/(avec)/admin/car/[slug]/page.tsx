import { getCarBySlug } from "@/actions/cars/get-car-by-slug.action";
import { TitleHome } from "@/components";
import { redirect } from "next/navigation";
import { getBrands } from "@/actions/brands/get-brands";
import { CarFormV2 } from "./ui/CarFormV2";




interface Props {
  params: {
    slug: string;
  }
}



export default async function CarAdminPage({ params }: Props) {

  const { slug } = params;


  const [car, brands] = await Promise.all([
    getCarBySlug(slug),
    getBrands()
  ]);


  if (!car && slug !== "new") {
    redirect('/admin/cars')
  }

  const title = slug === "new" ? "Nuevo vehículo" : "Editar vehículo";
  const isNewCar = slug === "new" ? "isNew" : "isUsed";


  return (
    <div className="top-separator">

      <TitleHome title={title} />
      {/* <CarForm car={car ?? {}} brands={brands} isNewCar={isNewCar} /> */}
      <CarFormV2 car={car ?? {}} brands={brands} isNewCar={isNewCar} />
    </div>
  );
}