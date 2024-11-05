import { create } from 'zustand'

interface ChatBotState {
  service: string;
  brand: string;
  location: string;
  client: string;
  fullMessage: string
  setService: (service: string) => void;
  setBrand: (brand: string) => void;
  setLocation: (location: string) => void;
  resetChatBot: () => void;
  updateFullMessage: () => void;
}

export const useChatBotStore = create<ChatBotState>()((set) => ({
  service: "",
  brand: "",
  location: "",
  client: "",
  fullMessage: '',
  setService: (service) => set(() => ({ service, client: service })),
  setBrand: (brand) => set((state) => ({ brand, client: `${state.client} ${brand}` })),
  setLocation: (location) => set((state) => ({ location, client: `${state.client} ${location}` })),
  resetChatBot: () => set({ service: "", brand: "", location: "", client: "", fullMessage: "" }),
  updateFullMessage: () => set((state) => ({
    fullMessage: `Hola, me comunico desde el sitio web de Avec. Estoy interesado en el servicio de ${state.service.toUpperCase()}, relacionado con la marca ${state.brand.toUpperCase()}. Me gustaría recibir atención en la sucursal de ${state.location.toUpperCase()}.`
  })),
}));