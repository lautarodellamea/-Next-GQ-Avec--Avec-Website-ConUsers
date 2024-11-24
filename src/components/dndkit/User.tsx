
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  user: { name: string, id: string }
}


export const User = ({ user }: Props) => {

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({
    id: user.id
  })


  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-violet-600 text-white p-4 rounded-md shadow-md my-4">
      <h1>
        {user.name}
      </h1>
    </div>
  )
}
