export interface Brand {
  name: string; // Nombre de la marca
}

export interface Car {
  vin: string;
  licensePlate: string;
  operationType: 'usado' | 'nuevo' | 'plan' | string;
  type?: string;
  brand: Brand; // Cambiado de 'brandName' a un objeto 'brand'
  modelName: string;
  modelVersion: string;
  year: number;
  km: number;
  color: string;
  transmission: string;
  price: number;
  fuelType: string;
  location: string;
  engine: string;
  description: string | null;
  images?: string[];
  inStock: number;
  slug: string;
  bodyStyle: string;
  doors: number;
  currency: string; // pesos, dolares
}

export interface PaginatedCarResponse {
  currentPage: number;
  totalPages: number;
  cars: Car[];
}