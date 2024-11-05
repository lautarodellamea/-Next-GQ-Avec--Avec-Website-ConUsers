import React from 'react'

interface Props {
  title: string
  className?: string
}

export const TitleHome = ({ title, className }: Props) => {
  return (
    <h4 className={`text-2xl text-center sm:text-3xl md:text-4xl font-bold mb-4 ${className}`}>{title}</h4>
  )
}
