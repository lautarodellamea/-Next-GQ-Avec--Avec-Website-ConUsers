import { useFilterStore } from '@/store';

export const BtnResetFilters = () => {

  const resetFilters = useFilterStore((state) => state.resetFilters);

  return (
    <div>
      <button
        onClick={resetFilters}
        className='text-avecLightBlueColor font-medium text-sm rounded hover:underline pl-2'
      >
        Limpiar Filtros
      </button>

    </div>
  )
}
