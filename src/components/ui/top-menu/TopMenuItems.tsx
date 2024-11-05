'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from 'clsx';

interface Props {
  name: string
  path: string
}

export const TopMenuItems = ({ name, path }: Props) => {

  const pathname = usePathname()


  return (
    <Link href={path} className={clsx("text-white text-sm transition-all p-2 rounded-md hover:bg-blue-950",

      `${pathname === path ? 'bg-blue-950' : 'bg-transparent'}`,

    )}>
      {name}
    </Link>
  )
}
