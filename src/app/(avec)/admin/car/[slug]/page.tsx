import { getCarBySlug } from "@/actions/cars/get-car-by-slug.action";
import { TitleHome } from "@/components";
import { redirect } from "next/navigation";
import { CarForm } from "./ui/CarForm";
import { getBrands } from "@/actions/brands/get-brands";




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

  const title = slug === "new" ? "Nuevo auto" : "Editar auto"


  return (
    <div className="top-separator">

      <TitleHome title={title} />
      <CarForm car={car ?? {}} brands={brands} />
      <h1>{slug}</h1>
    </div>
  );
}