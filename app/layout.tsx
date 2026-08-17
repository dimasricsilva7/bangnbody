import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bangn Body Brasil | Skincare Natural Firmadora e Iluminadora",
  description:
    "Skincare natural, firmadora e iluminadora. Loções, séruns, esfoliantes e kits para uma rotina de cuidados com resultado real.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
