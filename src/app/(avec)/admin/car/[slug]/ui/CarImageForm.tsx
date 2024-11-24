import { deleteCarImage } from "@/actions/cars/delete-car.image.action"
import { CarImage } from "@/components"
import React from 'react'


import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  image: { id: number, url: string }
  slug: string
}

export const CarImageForm = ({ image, slug }: Props) => {

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({
    id: image.id
  })


  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      key={image.id}
      className="w-full"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CarImage key={image.id}
        src={image.url}
        width={300}
        height={300}
        className="rounded-t shadow-md object-cover"
        alt={slug ?? ''}
      />
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded-b-xl"
        type="button"
        onClick={() => deleteCarImage(image.id, image.url)}
      >Eliminar</button>
    </div>
  )
}
