/* Estilos */
// import "./globals.css";
// import "../styles/home/brands-home.css";


import { TopMenu, Footer, Locations, MapContainer, ChatBot, Toaster } from "@/components";
import { avecFont } from "@/config";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">

      <body
        className={`${avecFont.className} antialiased relative`}
      >
        <TopMenu />

        <main>
          {children}
        </main>

        <Locations />

        <div className="w-full bg-white">
          <MapContainer />
        </div>

        <ChatBot />
        <Footer />

        {/* Toaster: para notificar que se envio un formulario */}
        <Toaster />
      </body>

    </html>
  );
}
