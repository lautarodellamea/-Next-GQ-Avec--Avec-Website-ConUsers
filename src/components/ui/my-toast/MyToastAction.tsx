import React from 'react'
import { ToastAction } from '../toast'
import clsx from 'clsx'

interface Props {
  variant?: string
}

export const MyToastAction = ({ variant }: Props) => {
  return (
    <ToastAction className={clsx("bg-red-600 text-white",
      variant === 'danger' ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-green-600 hover:bg-green-400 text-white'
    )} altText="Ok">Ok</ToastAction>
  )
}
