import { Car } from "@/interfaces"
import { CardGridItemPlanes } from "./CarGridItemPlanes"


interface Props {
  cars: Car[]

}


export const CarGridPlanes = ({ cars }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-10 lg:grid-cols-3 lg:gap-14 mb-10 ">

      {
        cars.map(car => (
          <CardGridItemPlanes key={car.slug} car={car} />
        ))
      }

    </div>
  )
}
