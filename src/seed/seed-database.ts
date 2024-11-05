
// intalar npm i -D ts-node para poder ejecutar archivos ts en node
// agregamos en el package.json el script npm run seed: "seed": "ts-node src/seed/seed-database.ts"
// creamos el archivo tsconfig.json con npx tsc --init
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution

import { initialData } from "./seed"
import prisma from '../lib/prisma';

async function main() {
  // console.log(initialData)



  // 1. Borrar registros previos
  // ejecutamos todas las promesas de una
  // await Promise.all([
  //   prisma.productImage.deleteMany(),
  //   prisma.product.deleteMany(),
  //   prisma.category.deleteMany()
  // ])

  // al final lo hacemos asi porque si intentara eliminar las categorias antes de eliminar los productos o imagenes daria error
  // si un usuario crea y tiene productos , primero debemos eliminar los productos y despues los usuarios, porque sino la base de datos no nos dejara por la intefridad referencial
  await prisma.user.deleteMany()
  await prisma.carImage.deleteMany()
  await prisma.car.deleteMany()
  await prisma.brand.deleteMany()


  const { cars, users } = initialData

  await prisma.user.createMany({
    data: users
  })

  // Llenamos la base de Marcas
  const uniqueBrands = [
    ...new Set(initialData.cars.map(car => car.type.toLowerCase()))
  ].map(name => ({ name }));

  // console.log(uniqueBrands);

  await prisma.brand.createMany({
    data: uniqueBrands
  });

  // obtengo las categorias de mi base de datos
  const brandsDB = await prisma.brand.findMany()

  // creo un objetp con los nombres de las categorias y el id correspondiente
  const brandsMap = brandsDB.reduce((acc, brand) => {
    return {
      ...acc,
      [brand.name.toLowerCase()]: brand.id
    }
  }, {} as Record<string, string>)
  // console.log(brandsMap)


  // Cars
  // Crear coches
  for (const car of cars) {
    // Desestructurando el objeto car
    const { imagenes, type, ...rest } = car;

    try {
      const dbCar = await prisma.car.create({
        data: {
          ...rest,

          brandId: brandsMap[type.toLowerCase()] // Asegúrate de que el tipo sea en minúsculas
        }
      });

      // Insertando imágenes
      const imagesData = imagenes.map(img => ({
        url: img,
        carId: dbCar.id
      }));

      await prisma.carImage.createMany({
        data: imagesData
      });
    } catch (error) {

      console.error(`Error: Conflicto de unicidad en el slug: ${rest.slug}`); // Imprime el slug en conflicto
      console.error(`Error creando el coche: ${car}`, error);
    }
  }

  console.log('Seed Ejecutado');
}




(() => {


  // para que no se ejecute en produccion (CUIDADO)
  if (process.env.NODE_ENV === 'production') return


  main()
})()