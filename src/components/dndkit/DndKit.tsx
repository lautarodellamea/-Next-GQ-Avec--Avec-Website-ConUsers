'use client'

import { useState } from "react"
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { User } from "./User"

export const DndKit = () => {

  const [people, setPeople] = useState([
    {
      name: 'Lautaro01',
      id: "abc",
    },
    {
      name: 'Lautaro02',
      id: "xyz",
    },
    {
      name: 'Lautaro03',
      id: "jkl",
    }
  ])

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log('drag end')
    console.log('active', active.id)
    console.log('over', over.id)

    const oldIndex = people.findIndex(person => person.id === active.id)
    const newIndex = people.findIndex(person => person.id === over.id)

    console.log('oldIndex', oldIndex)
    console.log('newIndex', newIndex)

    const newOrder = arrayMove(people, oldIndex, newIndex)
    console.log('newOrder', newOrder)
    setPeople(newOrder)


  }


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <h1 className="text-2xl font-bold">Users List</h1>

      <SortableContext
        items={people}
        strategy={horizontalListSortingStrategy}
      >
        {/* component */}
        <div className="flex flex-row gap-2">
          {
            people.map(user => (
              <User key={user.id} user={user} />
            ))
          }
        </div>

      </SortableContext>

    </DndContext>
  )
}
