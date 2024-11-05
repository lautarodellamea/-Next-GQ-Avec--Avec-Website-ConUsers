import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export const CheckButton = () => {
  return (
    <Button disabled={true}
      className="w-full sm:w-[20%] bg-green-500"> <Check className="mr-2 h-4 w-4" /> Enviado con exito
    </Button>

  )
}
