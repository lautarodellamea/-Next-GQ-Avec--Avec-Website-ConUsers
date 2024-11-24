export const revalidate = 0;

import { Pagination } from "@/components";

import Link from "next/link";

import { CarsTable } from "./ui/CarsTable";
import { getPaginatedCarWithImagesAdmin } from "@/actions/cars/car-admin-pagination.action";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function CarsAdminPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { cars, totalPages } =
    await getPaginatedCarWithImagesAdmin({ page });

  return (
    <div className="top-separator">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold ">Mantenimiento de Vehículos</h1>
        <div className="bg-avecLightBlueColor text-white px-4 py-2 font-semibold cursor-pointer hover:bg-avecBlueColor transition-all">
          <Link href="/admin/car/new" className="btn-primary">
            Cargar Auto
          </Link>
        </div>
      </div>

      <div className="mb-10 ">

        <CarsTable cars={cars} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}