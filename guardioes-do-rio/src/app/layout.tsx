import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const firaSans = localFont({
  src: "./fonts/FiraSans/FiraSans-Regular.ttf", // Verifique se o caminho está correto
  variable: "--font-firasans",
  weight: "400", // Use o peso correto, como 400 para regular
});

// const geistSans = localFont({
//   src: "./fonts/FiraSans/FiraSans-Regular.ttf",
//   variable: "--font-firasans",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Guardiões do Rio",
  description: "Desenvolvido por Laisa Garlini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${firaSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
