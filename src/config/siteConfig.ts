interface SiteConfig {
  title: string;
  url: string;
  siteName: string;
  description: string;
  keywords: string[];
  author: string;
  defaultLanguage: string;
  imgOpenGraph: string;

  // data site
  whatsapp: string;
  phoneCalls: string
  email: string

}

export const siteConfig: SiteConfig = {
  title: "Avec Sitio Web Oficial",
  url: "https://next-gq-avec-avec-website-no-users.vercel.app",
  siteName: "Avec",
  description: "Bienvenidos a Avec, Concesionario Oficial de Peugeot, Citroen, Fiat y DS. Conocé nuestros servicios: venta de 0km, Usados, Planes de Ahorro y PostVenta.",
  imgOpenGraph: "Opengraph_Avec__.webp",
  keywords: ["venta directa", "postventa", "autos", "usados", "taller"],
  author: "AVEC",
  defaultLanguage: "es",

  // data site
  whatsapp: "5493585106415",
  phoneCalls: "0800",
  email: "info@avec.com"
};

export default siteConfig;