// // export interface PaginatedCarResponse {
// //   currentPage: number;
// //   totalPages: number;
// //   cars: {
// //     vin: string;
// //     licensePlate: string;
// //     operationType: string;
// //     brand: {
// //       name: string;
// //     };
// //     modelName: string;
// //     modelVersion: string;
// //     year: number;
// //     km: number;
// //     color: string;
// //     transmission: string;
// //     price: number;
// //     fuelType: string;
// //     location: string;
// //     engine: string;
// //     description: string | null;
// //     images: string[]; // Array de URLs de imágenes
// //     inStock: number;
// //     slug: string;
// //     bodyStyle: string;
// //     doors: number;
// //     currency: string;
// //   }[];
// // }

// interface Car {
//   id: string;
//   vin: string;
//   licensePlate: string;
//   operationType: string;
//   modelName: string;
//   modelVersion: string;
//   year: number;
//   km: number;
//   color: string;
//   transmission: string;
//   price: number;
//   fuelType: string;
//   location: string;
//   engine: string;
//   description: string | null;
//   images: string[];
//   brandName: string;
//   brandId: string;
// }

// export interface PaginatedCarResponse {
//   currentPage: number;
//   totalPages: number;
//   cars: Car[];
// }