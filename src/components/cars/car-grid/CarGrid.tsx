import { Car } from "@/interfaces"
import { CardGridItem } from "./CarGridItem"


interface Props {
  cars: Car[]

}


export const CarGrid = ({ cars }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 mb-10 lg:gap-4 container m-auto">

      {
        cars.map(car => (
          <CardGridItem key={car.slug} car={car} />
        ))
      }

    </div>
  )
}
