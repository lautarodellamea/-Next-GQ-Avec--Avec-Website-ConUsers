'use client';

import { changeCarStock } from "@/actions/cars/change-car-stock.action";
import { CarImage } from "@/components";
import { Car } from "@/interfaces";
import Link from "next/link";

interface Props {
  cars: Car[];
}

export const CarsTable = ({ cars }: Props) => {
  return (
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
            Acción
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
            Modelo y versión
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
            Kilometraje
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Disponible
          </th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr
            key={car.slug}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <Link href={`/car/${car.slug}`}>
                <CarImage
                  src={car.images[0]}
                  width={80}
                  height={80}
                  alt={car.slug}
                  className="w-20 h-20 object-cover rounded"
                />
              </Link>
            </td>
            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
              <div className="flex gap-2">
                <Link
                  href={`/admin/car/${car.slug}`}
                  className="hover:underline bg-avecLightBlueColor text-white p-2"
                >
                  Editar
                </Link>
                <Link
                  href={`/car/${car.slug}`}
                  className="hover:underline bg-avecLightBlueColor text-white p-2"
                >
                  Ver
                </Link>
              </div>
            </td>
            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              {car.brand.name.toUpperCase()}
            </td>
            <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap">
              {car.modelName.toUpperCase()} {car.modelVersion.toUpperCase()}
            </td>

            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              ARS$ {Number(car.price).toLocaleString("es-AR")}
            </td>

            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              {Number(car.km).toLocaleString("es-AR")} KM
            </td>

            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              <select
                value={car.inStock}
                onChange={(e) => changeCarStock(car.id, e.target.value)}
                className="text-sm w-full p-2 text-gray-900">
                <option value="1">Si</option>
                <option value="0">No</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
