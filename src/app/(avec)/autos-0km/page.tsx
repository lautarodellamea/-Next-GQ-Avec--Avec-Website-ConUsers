import { CarsVentaDirecta } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}


export default async function VentaDirecta({ searchParams }: Props) {




  return (
    <div className="top-separator">
      {/* <Banner title="Titulo de prueba." imgBg="venta-directa/bg-banner-venta-directa.jpg" className="uppercase sm:text-3xl" /> */}
      {/* <div className="container p-3 m-auto"> */}
      <div>
        {/* <BrandsPlanesFilter /> */}
        <CarsVentaDirecta searchParams={searchParams} />
      </div>
    </div>
  );
}