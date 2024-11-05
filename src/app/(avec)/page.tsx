export const revalidate = 60; // Revalida cada 60 segundos



import { getPaginatedCarWithImages } from "@/actions/cars/car-pagination.action";
import { AboutHome, BrandsHome, CarouselMain, CarsSlideshowHome, ChatBot, PlanAhorroHome, PostVentaHome } from "@/components";

export default async function HomePage() {

  // autos para el slideshow
  const { cars } = await getPaginatedCarWithImages({
    page: 1,
    take: 12,
  });

  return (
    <div>

      <div className="relative w-full bg-white h-screen flex flex-col">
        <CarouselMain />
        <BrandsHome className="basis-1/3 bg-black sm:bg-transparent" />
      </div>

      <AboutHome />

      <PlanAhorroHome />

      <CarsSlideshowHome cars={cars} />

      <PostVentaHome />

      <ChatBot />



    </div>
  );
}