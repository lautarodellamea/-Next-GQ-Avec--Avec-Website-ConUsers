'use client'


import React from 'react'
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { generatePaginationNumbers } from '@/utils';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';


interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? '1'
  const currentPage = isNaN(+pageString) ? 1 : + pageString

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect('pathname')
  }


  const allPages = generatePaginationNumbers(currentPage, totalPages)
  // const allPages = generatePaginationNumbers(currentPage, 100)
  // console.log(allPages)


  const createPageUrl = (pageNumber: number | string) => {

    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}` // regresa al mismo url donde estoy
    }

    if (+pageNumber <= 0) {
      return `${pathname}` // href="/"
    }


    // si estoy en la ultima pagina y apreto next
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}` // regresa al mismo url donde estoy
    }

    // cualquier otra opcion
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`

  }



  return (

    <div className="flex text-center justify-center self-end mb-28 sm:mt-10 mt-2 transform scale-[0.6] sm:scale-100">

      <nav aria-label="Page navigation example">

        <ul className="flex list-style-none items-center gap-2">
          <li className="page-item mr-4">
            <Link className={clsx("page-link flex justify-center items-center w-[40px] h-[40px] relative  rounded-[16px] border-0 bg-avecBlueColorDark outline-none transition-all   text-white  hover:bg-avecBlueColorHover focus:shadow-none",
              {
                "opacity-20 pointer-events-none": currentPage === 1,
              }
            )} href={createPageUrl(currentPage - 1)}><ChevronLeft size={30} /></Link>
          </li>


          {
            allPages.map((page, index) => (
              /* el key lo pongo asi porque puede que tengoamos dos "...", "..." */
              <li key={page + "-" + index} className="page-item">
                <Link className={
                  clsx("page-link flex justify-center items-center w-[40px] h-[40px] relative  py-1.5 px-3 rounded-[16px] border-0 outline-none transition-all  font-semibold  focus:shadow-none",
                    {
                      "bg-avecLightBlueColor shadow-sm font-bold text-white hover:bg-avecLightBlueColor/80 hover:text-white": page === currentPage,
                      "hover:bg-avecGrayColor": page !== currentPage
                    }
                  )
                } href={createPageUrl(page)}>{page}</Link>
              </li>
            ))
          }

          <li className="page-item  ml-4">
            <Link className={clsx("page-link flex justify-center items-center w-[40px] h-[40px] relative  rounded-[16px] border-0 bg-avecBlueColorDark outline-none transition-all   text-white  hover:bg-avecBlueColorHover focus:shadow-none",
              {
                "opacity-20 pointer-events-none": currentPage === totalPages,
              })}
              href={createPageUrl(currentPage + 1)}><ChevronRight size={30} /></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
