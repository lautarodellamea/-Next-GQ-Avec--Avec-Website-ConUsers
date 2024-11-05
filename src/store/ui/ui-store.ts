import { create } from 'zustand'

interface State {
  isSideMenuOpen: boolean
  openSideMenu: () => void
  closeSideMenu: () => void


  // isContactFormsSubmitted: boolean
  // contactFormsSubmitted: () => void
  // contactFormsNotSubmitted: () => void


  isScrolled: boolean
  setIsScrolled: (isScrolled: boolean) => void
}

export const useUiStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),


  // isContactFormsSubmitted: false,
  // contactFormsSubmitted: () => set({ isContactFormsSubmitted: true }),
  // contactFormsNotSubmitted: () => set({ isContactFormsSubmitted: false }),

  isScrolled: false,
  setIsScrolled: (isScrolled: boolean) => set({ isScrolled }),
}))