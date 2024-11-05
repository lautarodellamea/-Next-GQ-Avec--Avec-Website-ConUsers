import { avecFont } from '@/config'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col-reverse items-center justify-center h-[100vh] p-3 container m-auto lg:flex-row'>
      <div className='xl:max-w-[500px]'>

        <h2 className={`text-3xl font-bold text-avecBlueColor uppercase lg:text-5xl ${avecFont.className}`}>Hubo un error en tu ruta</h2>
        <p className='font-semibold mt-2 lg:text-xl'>En Avec nos encargamos de que siempre encuentres el mejor camino.</p>
        <p className='mb-4 mt-2 font-semibold lg:text-xl'>Te dejamos un enlace para que retomes al sitio.</p>
        <Link href="/" className=' bg-avecLightBlueColor hover:bg-avecBlueColor transition-all px-4 py-2 text-white max-w-fit '>Volver al inicio</Link>
      </div>


      <Image width={1000} height={1000} className='xl:w-[800px]' src="/images/Error 404_imagen.webp" alt="" />
    </div>
  )
}