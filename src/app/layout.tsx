import type { Metadata } from "next";

/* Estilos */
import "./globals.css";
import "../styles/home/brands-home.css";

import { avecFont, siteConfig } from "@/config";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template-object
export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Avec',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },


  title: {
    default: `${siteConfig.title}`,
    template: `%s | ${siteConfig.title}`,
  },
  description: `${siteConfig.description}`,

  metadataBase: new URL(siteConfig.url),

  alternates: {
    canonical: '/',
  },

  openGraph: {
    // title: `${siteConfig.title}`,
    // description: `${siteConfig.description}`,
    // url: `${siteConfig.url}`,
    // siteName: `${siteConfig.siteName}`,
    // images: [
    //   {
    //     url: `/images/${siteConfig.imgOpenGraph}`,
    //     width: 1200,
    //     height: 630,
    //     alt: 'Avec',
    //   },
    // ],
    // locale: 'es_ES',
    // type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    // title: `${siteConfig.title}`,
    // description: `${siteConfig.description}`,
    // images: [`/images/${siteConfig.imgOpenGraph}`],
  },

  /* Robots */
  // robots: {
  //   index: true,
  //   follow: true,
  //   nocache: false,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     noimageindex: false,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },

  /* Favicon */
  // icons: {
  //   icon: [
  //     {
  //       media: '(prefers-color-scheme: light)',
  //       url: '/images/icon-light.png',
  //       // href: '/images/icon-light.png',
  //     },
  //     {
  //       media: '(prefers-color-scheme: dark)',
  //       url: '/images/icon-dark.png',
  //       // href: '/images/icon-dark.png',
  //     },
  //   ],
  // },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body className={`${avecFont.className} antialiased relative`}>
        {children}
      </body>
    </html>
  );
}
