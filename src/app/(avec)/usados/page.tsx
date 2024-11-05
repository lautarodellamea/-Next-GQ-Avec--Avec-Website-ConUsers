import { Metadata } from "next";
import { Banner, CarsWithFilters, DrawerFilter } from "@/components";

export const metadata: Metadata = {
  title: 'Usados',
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function UsadosPage({ searchParams }: Props) {


  return (
    <div>
      <Banner title="Encontrá calidad y buen precio garantizado." className="uppercase" imgBg="usados/bg-banner-usados.jpg" />
      <div className="flex flex-col container m-auto ">


        <CarsWithFilters searchParams={searchParams} />
      </div>
      <div className="lg:hidden">
        <DrawerFilter />
      </div>

    </div>
  );
}