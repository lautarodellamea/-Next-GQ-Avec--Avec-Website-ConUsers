'use client'

import React, { useEffect, useState } from 'react'

import { Car, CarImage as CarWithImage, OnlyBrand } from "@/interfaces"
import { CarImageForm } from './CarImageForm'

import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

interface Props {
  car: Partial<Car> & { CarImage?: CarWithImage[] },
  brands: OnlyBrand[],
}

export const CarImageFormContainer = ({ car }: Props) => {

  const [arrayImages, setArrayImages] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const initialImages = car.CarImage?.map(image => ({
      id: image.id.toString(),  // Aseguramos que id sea un string
      name: image.url  // Usamos `url` como `name` para mantener la estructura deseada
    })) || [];

    setArrayImages(initialImages);
    console.log('initialImages', initialImages)
  }, [car]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const oldIndex = arrayImages.findIndex(img => img.id === active.id);
    const newIndex = arrayImages.findIndex(img => img.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(arrayImages, oldIndex, newIndex);
      console.log('newOrder', newOrder);
      setArrayImages(newOrder);
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <h1 className="text-2xl font-bold">Users List</h1>

      <SortableContext
        items={arrayImages}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* <pre>{JSON.stringify(car, null, 2)}</pre> */}
          {
            arrayImages.map(image => (
              <CarImageForm image={{ id: image.id, url: image.name }} slug={car.slug} key={image.id} />
            ))
          }
        </div>
      </SortableContext>
    </DndContext>
  )
}
