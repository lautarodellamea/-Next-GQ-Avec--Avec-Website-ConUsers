'use client'

import { useUiStore } from '@/store';
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BtnSidebar() {
  const { isScrolled } = useUiStore((state) => state)

  const openSideMenu = useUiStore(state => state.openSideMenu);

  return (
    <Button className={`sm:mr-6 mq-950px:hidden ${isScrolled ? "text-slate-800" : ""}`} onClick={openSideMenu} variant="avecMenuOpen" size="icon">
      <Menu className="h-8 w-8" />
    </Button>
  )
}