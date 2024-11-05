import { create } from "zustand";

interface FilterState {
  selectedBrands: string[];
  selectedBodyStyles: string[];
  selectedTransmissions: string[];
  selectedFuelTypes: string[];
  priceRange: { min: number; max: number };
  yearRange: { min: number; max: number };
  mileageRange: { min: number; max: number };

  // minYear: number;
  // maxYear: number;
  minPrice: number;
  maxPrice: number;
  minMileage: number;
  maxMileage: number;

  toggleBrand: (brand: string) => void;
  toggleBodyStyle: (bodyStyle: string) => void;
  toggleTransmission: (transmission: string) => void;
  toggleFuelType: (fuelType: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setYearRange: (min: number, max: number) => void;
  setMileageRange: (min: number, max: number) => void;

  resetFilters: () => void;
  setMinMaxValues: (minYear: number, maxYear: number, minPrice: number, maxPrice: number, minMileage: number, maxMileage: number) => void;

  orderBy: { field: string; direction: string };
  setOrderBy: (orderBy: { field: string; direction: string }) => void;

  singleSelectedBrand: string | null;
  setSingleBrand: (brand: string) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  selectedBrands: [],
  selectedBodyStyles: [],
  selectedTransmissions: [],
  selectedFuelTypes: [],
  priceRange: { min: 0, max: 50000000 },
  yearRange: { min: 0, max: 2024 },
  mileageRange: { min: 0, max: 600000 },

  // minYear: 2009,
  // maxYear: 2024,
  minPrice: 0,
  maxPrice: 50000000,
  minMileage: 0,
  maxMileage: 600000,

  toggleBrand: (brand) => set((state) => ({
    selectedBrands: state.selectedBrands.includes(brand)
      ? state.selectedBrands.filter((b) => b !== brand)
      : [...state.selectedBrands, brand],
  })),
  toggleBodyStyle: (bodyStyle) => set((state) => ({
    selectedBodyStyles: state.selectedBodyStyles.includes(bodyStyle)
      ? state.selectedBodyStyles.filter((s) => s !== bodyStyle)
      : [...state.selectedBodyStyles, bodyStyle],
  })),
  toggleTransmission: (transmission) => set((state) => ({
    selectedTransmissions: state.selectedTransmissions.includes(transmission)
      ? state.selectedTransmissions.filter((t) => t !== transmission)
      : [...state.selectedTransmissions, transmission],
  })),
  toggleFuelType: (fuelType) => set((state) => ({
    selectedFuelTypes: state.selectedFuelTypes.includes(fuelType)
      ? state.selectedFuelTypes.filter((f) => f !== fuelType)
      : [...state.selectedFuelTypes, fuelType],
  })),
  setPriceRange: (min, max) => set({ priceRange: { min, max } }),
  setYearRange: (min, max) => set({ yearRange: { min, max } }),
  setMileageRange: (min, max) => set({ mileageRange: { min, max } }),

  setMinMaxValues: (minYear, maxYear, minPrice, maxPrice, minMileage, maxMileage) =>
    set({
      // minYear,
      // maxYear,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
    }),

  resetFilters: () =>
    set((state) => ({
      selectedBrands: [],
      selectedBodyStyles: [],
      selectedTransmissions: [],
      selectedFuelTypes: [],
      priceRange: { min: state.minPrice, max: state.maxPrice },
      // yearRange: { min: state.minYear, max: state.maxYear },
      mileageRange: { min: state.minMileage, max: state.maxMileage },
      orderBy: { field: 'price', direction: 'desc' },
      singleSelectedBrand: null,
    })),

  orderBy: { field: 'price', direction: 'desc' },
  setOrderBy: (orderBy) => set({ orderBy }),

  singleSelectedBrand: null,
  setSingleBrand: (brand) => set({ singleSelectedBrand: brand }),
}));