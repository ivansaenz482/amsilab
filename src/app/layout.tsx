import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AMSILAB | Automatización Industrial y Formación Técnica",
    template: "%s | AMSILAB",
  },
  description:
    "Formación técnica, talleres, seminarios y capacitación empresarial en automatización industrial, PLC, SCADA e Industria 4.0.",
  applicationName: "AMSILAB",
  keywords: [
    "automatización industrial",
    "formación técnica",
    "PLC",
    "SCADA",
    "HMI",
    "Industria 4.0",
    "capacitación empresarial",
    "seminarios técnicos",
  ],
  openGraph: {
    title: "AMSILAB | Formación para la industria del futuro",
    description:
      "Desarrolla competencias en automatización industrial y tecnología aplicada.",
    type: "website",
    locale: "es_EC",
    siteName: "AMSILAB",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMSILAB | Formación para la industria del futuro",
    description:
      "Desarrolla competencias en automatización industrial y tecnología aplicada.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
