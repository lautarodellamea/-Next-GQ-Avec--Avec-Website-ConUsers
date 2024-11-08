export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table

import { Pagination } from "@/components";

import Link from "next/link";

import { getPaginatedCarWithImages } from "@/actions/cars/car-pagination.action";
import Image from "next/image";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function CarsAdminPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { cars, currentPage, totalPages } =
    await getPaginatedCarWithImages({ page });

  return (
    <div className="top-separator">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold ">Mantenimiento de Autos</h1>
        <div className="bg-avecLightBlueColor text-white px-4 py-2 font-semibold cursor-pointer hover:bg-avecBlueColor transition-all">
          <Link href="/admin/product/new" className="btn-primary">
            Cargar Auto
          </Link>
        </div>
      </div>

      <div className="mb-10 ">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Marca
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Modelo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Transmision
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Combustible
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr
                key={car.slug}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/car/${car.slug}`}>
                    <Image
                      src={`/images/usados/${car.images?.[0] ?? "default.jpg"}`}
                      width={80}
                      height={80}
                      alt={car.slug}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/car/${car.slug}`}
                    className="hover:underline"
                  >
                    {car.brand.name.toUpperCase()}
                  </Link>
                </td>
                <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap">
                  {car.modelName}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {Number(car.price).toLocaleString("es-AR")}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {car.inStock}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {car.fuelType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}