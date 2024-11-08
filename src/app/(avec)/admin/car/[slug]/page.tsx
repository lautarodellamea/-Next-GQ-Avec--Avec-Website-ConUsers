import { getCarBySlug } from "@/actions/cars/get-car-by-slug.action";
import { TitleHome } from "@/components";
import { redirect } from "next/navigation";
import { CarForm } from "./ui/CarForm";



interface Props {
  params: {
    slug: string;
  }
}



export default async function CarAdminPage({ params }: Props) {

  const { slug } = params;

  const car = await getCarBySlug(slug);

  if (!car) {
    redirect('/admin/cars')
  }

  const title = slug === "new" ? "Nuevo auto" : "Editar auto"


  return (
    <div className="top-separator">

      <TitleHome title={title} />
      <CarForm car={car} />
      <h1>{slug}</h1>
    </div>
  );
}