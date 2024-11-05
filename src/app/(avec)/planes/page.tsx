import { CarsPlanes } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}


export default async function PlanesPage({ searchParams }: Props) {




  return (
    <div className="top-separator">
      {/* <Banner title="Titulo de prueba." imgBg="venta-directa/bg-banner-venta-directa.jpg" className="uppercase sm:text-3xl mb-0" /> */}
      {/* <div className="container m-auto p-3"> */}
      <div>
        {/* <BrandsPlanesFilter /> */}
        <CarsPlanes searchParams={searchParams} />
      </div>
    </div>
  );
}