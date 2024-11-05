-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "operationType" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "km" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "fuelType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "description" TEXT,
    "inStock" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "doors" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "bodyStyle" TEXT NOT NULL,
    "vehicleTier" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Car_slug_key" ON "Car"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
