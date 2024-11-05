'use client'

import { useUiStore } from '@/store'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  name: string
  path: string
}

export const SidebarItem = ({ name, path }: Props) => {

  const closeSideMenu = useUiStore(state => state.closeSideMenu);

  const pathname = usePathname()
  const isPath: boolean = pathname === path



  return (
    <Link href={path} key={name} onClick={closeSideMenu} className={clsx(" p-2 rounded  font-medium transition-all",
      isPath ? 'bg-avecBlueColorDark text-white hover:bg-avecBlueColorDark' : 'text-slate-600 hover:bg-gray-100'
    )}>
      {name}
    </Link>
  )
}
