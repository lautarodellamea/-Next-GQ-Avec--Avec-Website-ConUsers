'use client'

import "../../../styles/ui/sidebar.css"
import { Button } from '../button';
import { menuItems } from '@/data';
import { SidebarItem } from './SidebarItem';
import { useUiStore } from '@/store';
import { X } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from "next/image";


export const Sidebar = () => {


  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUiStore(state => state.closeSideMenu);


  return (
    <div>

      {/* Background black */}
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[750] bg-black opacity-70 "
            onClick={closeSideMenu}
          />
        )
      }

      {/* Background blur */}
      {/* Este blur se ve en el contenedor padre y depende de su altura */}
      {/* {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[750] backdrop-filter backdrop-blur-sm"
            onClick={closeSideMenu}
          />

        )
      } */}

      {/* Sidemenu */}
      <nav
        className={
          clsx(
            "max-w-xl w-[80%] fixed p-5 right-0 top-0  h-screen bg-white z-[800] shadow-2xl transform transition-all duration-300",
            isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )
        }
      >

        <Button className='absolute top-4 right-4' onClick={closeSideMenu} variant="avecMenuClose" size="icon">
          <X className="h-6 w-6 relative" />
        </Button>



        <Link onClick={closeSideMenu} href="/" className='sidebar-logo'>
          <svg className='sidebar-logo-svg w-[150px] relative -left-4 mb-2' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 180 57">
            <g>
              <g id="Capa_1">
                <g>
                  <path d="M79.29,14.23c.13.08.23.18.31.31.08.13.11.27.11.43s-.04.29-.11.42c-.08.13-.18.24-.31.31-.13.08-.27.12-.43.12s-.3-.04-.43-.12c-.13-.08-.23-.18-.31-.31-.07-.13-.11-.27-.11-.42s.04-.29.11-.42c.08-.13.18-.24.31-.31.13-.08.27-.12.43-.12s.3.04.43.11ZM78.53,14.42c-.1.06-.18.14-.23.24-.06.1-.09.21-.09.32s.03.22.09.32c.06.1.13.18.23.23.1.06.21.09.32.09s.23-.03.33-.09c.1-.06.18-.14.23-.24.06-.1.09-.21.09-.32s-.03-.22-.09-.32c-.06-.1-.13-.18-.23-.23-.1-.06-.21-.09-.32-.09s-.23.03-.33.09ZM79.05,14.6c.06.03.11.06.15.1l-.12.15s-.06-.06-.1-.08c-.04-.02-.07-.03-.11-.03-.06,0-.12.02-.16.07-.04.04-.06.1-.06.16s.02.12.06.17c.04.04.1.07.16.07.03,0,.07,0,.11-.03.04-.02.07-.04.1-.07l.12.14s-.1.08-.16.11c-.06.03-.12.04-.18.04-.08,0-.16-.02-.22-.05-.07-.04-.12-.09-.15-.15-.04-.06-.06-.14-.06-.21s.02-.15.06-.21c.04-.06.09-.11.16-.15.07-.04.14-.05.22-.05.06,0,.12.01.18.04Z" />
                  <path className="logo-sidebar-svg " d="M45.18,28.37l8.28-13.92c.07-.11.19-.18.32-.18h6.77c.08,0,.09.07.03.18l-7.74,13.92" />
                  <path className="logo-sidebar-svg " d="M37.73,28.37l-8.17,13.74c-.06.1-.08.21-.04.29.04.08.12.13.22.13h6.73c.17,0,.36-.12.46-.28l8.25-13.87h-7.45Z" />
                  <path className="logo-sidebar-svg " d="M83.59,42.07l-6.99-27.51c-.04-.16-.19-.28-.36-.28h-7.38c-.13,0-.25.07-.32.18l-16.09,27.05h-.9v1.02h8.28c.13,0,.26-.07.32-.19l2.6-4.68h11.42l1,4.58c.04.17.19.29.36.29h7.69c.11,0,.22-.05.29-.14.07-.09.09-.21.07-.32ZM66.23,31.43l4.76-8.57,1.86,8.57h-6.61Z" />
                  <path className="logo-sidebar-svg " d="M52.82,28.37l-8.17,13.74c-.06.1-.08.21-.04.29.04.08.12.13.22.13h6.73c.17,0,.36-.12.46-.28l8.25-13.87h-7.45Z" />
                  <g>
                    <path className="logo-sidebar-svg " d="M105.88,21.04l-10.47,21.31c-.05.11-.16.17-.28.17h-7.91c-.14,0-.27-.1-.3-.24l-5.32-21.31c-.05-.2.1-.39.3-.39h7.39c.15,0,.28.1.31.25l2.64,12.57c.01.06.09.07.12.01l5.39-12.64c.05-.12.16-.19.29-.19h7.56c.23,0,.38.24.28.45Z" />
                    <path className="logo-sidebar-svg " d="M122.01,21.6c1.67.83,2.94,2,3.83,3.51.89,1.51,1.33,3.25,1.33,5.24,0,.94-.1,1.92-.31,2.94-.03.15-.16.25-.31.25h-14.71s-.07.03-.06.07c.14,1.04.56,1.84,1.24,2.39.7.56,1.63.85,2.78.85,1.61,0,3.12-.52,4.54-1.57.13-.09.3-.08.41.03l3.69,3.8c.12.13.12.34-.02.45-2.5,2.17-5.47,3.25-8.91,3.25-2.37,0-4.44-.4-6.21-1.21-1.77-.81-3.14-1.96-4.11-3.47-.97-1.51-1.45-3.25-1.45-5.24,0-2.39.54-4.54,1.61-6.45,1.07-1.91,2.55-3.4,4.44-4.48,1.88-1.07,4-1.61,6.37-1.61,2.23,0,4.18.42,5.85,1.25ZM119.47,28.66c0-.81-.26-1.46-.77-1.96-.51-.5-1.18-.75-2.02-.75-.91,0-1.76.33-2.54.99-.76.64-1.35,1.48-1.78,2.51-.02.04.01.09.06.09h6.87s.06-.02.06-.05c.07-.3.11-.58.11-.84Z" />
                    <path className="logo-sidebar-svg " d="M133.25,41.58c-1.56-.82-2.76-1.98-3.61-3.49-.85-1.51-1.27-3.27-1.27-5.28,0-2.45.54-4.62,1.61-6.51,1.07-1.9,2.57-3.37,4.5-4.41,1.92-1.05,4.12-1.57,6.59-1.57,2.28,0,4.25.5,5.91,1.49,1.57.94,2.73,2.26,3.49,3.95.07.15,0,.34-.15.41l-5.97,2.8c-.15.07-.33.01-.41-.14-.29-.57-.68-1.02-1.16-1.34-.56-.38-1.24-.56-2.02-.56-1.18,0-2.16.5-2.94,1.49-.78.99-1.17,2.27-1.17,3.83,0,1.26.28,2.26.85,3,.56.74,1.34,1.11,2.34,1.11,1.55,0,2.74-.72,3.57-2.16.08-.15.27-.19.42-.11l5.45,2.89c.16.08.22.28.13.43-.99,1.67-2.38,2.97-4.17,3.91-1.9.99-4.05,1.49-6.47,1.49-2.1,0-3.92-.41-5.48-1.23Z" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </Link>


        {/* Menu */}
        <div className='flex flex-col gap-2'>
          {menuItems.map((menuItem) => (
            <SidebarItem key={menuItem.name} {...menuItem} />
          ))}
        </div>

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10" />


        <div>
          <Image width={600} height={600} src="/images/brands/brands.png" alt="logos-marcas-avec" className="opacity-10" />
        </div>


      </nav>


    </div>
  )
}