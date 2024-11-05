'use client'

import React, { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from '../button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { embeddedMaps } from '@/data'
import { MapEmbebed } from './MapEmbebed'

export const consecionariasOptionsMenuMobile = [
  {
    value: "citroen-cordoba",
    label: "Citroën Córdoba",
  },
  {
    value: "citroen-florida",
    label: "Citroën Florida",
  },
  {
    value: "citroen-caba",
    label: "Citroën CABA",
  },
  {
    value: "citroen-buenos-aires-postventa",
    label: "Citroën Buenos Aires Postventa",
  },
  {
    value: "citroen-caba-postventa",
    label: "Citroën CABA Postventa",
  },
  {
    value: "peugeot-cordoba",
    label: "Peugeot Córdoba",
  },
  {
    value: "peugeot-rosario",
    label: "Peugeot Rosario",
  },
  {
    value: "ds-store-cordoba",
    label: "DS Store Córdoba",
  },
  {
    value: "fiat-rosario-central",
    label: "Fiat Rosario (Central)",
  },
  {
    value: "fiat-rosario-centro",
    label: "Fiat Rosario (Centro)",
  }
];


export const MapContainer = () => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [activeMap, setActiveMap] = useState("Citroën Córdoba")

  useEffect(() => {
  }, [value])


  return (
    <div className=' m-auto flex flex-col justify-center items-center gap-2  bg-slate-50 pt-5'>

      {/* <h4 className='font-bold text-2xl sm:text-4xl text-center'>Nos podés encontrar en:</h4> */}
      <p className='px-3 text-center mb-2'>Seleccione la sucursal para ubicarla en el mapa</p>

      <div className='sm:hidden'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between"
            >
              {value
                ? consecionariasOptionsMenuMobile.find((framework) => framework.value === value)?.label
                : "Selecciona la sucursal..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0">
            <Command>
              {/* <CommandInput placeholder="Busca la sucursal..." /> */}
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {consecionariasOptionsMenuMobile.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setActiveMap(framework.label)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

      </div>
      <div className='hidden sm:flex w-full  flex-row justify-center gap-2 flex-wrap sm:max-w-[800px] 2xl:max-w-full '>
        {
          embeddedMaps.map(map => (
            <Button size="sm" className='text-[12px]  px-2 hover:pb-[3px] transition-all ' key={map.id} onClick={() => setActiveMap(map.name)}>{map.name}</Button>
          ))
        }
      </div>

      <div className='flex flex-row gap-2 w-full relative '>
        {
          embeddedMaps.map(map => (
            <MapEmbebed key={map.id} nameMap={map.name} srcMap={map.mapLink} activeMap={activeMap} />)
          )
        }
      </div>
    </div>



  )
}

