import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";

export const metadata: Metadata = {
  title: "Formación en automatización industrial",
  description:
    "Catálogo de formación técnica en PLC, SCADA, HMI, instrumentación, redes industriales e Industria 4.0.",
};

export default function CursosPage() {
  return (
    <SectionPage
      label="CATÁLOGO DE FORMACIÓN"
      code="01 / TRAINING"
      title={
        <>
          Formación técnica
          <br />
          para <span className="accent-word">dominar</span> la
          automatización.
        </>
      }
      description="Programas prácticos de automatización industrial, control de procesos y tecnologías de producción, diseñados para técnicos, estudiantes y equipos de empresa."
      items={[
        "PLC y control industrial",
        "SCADA, HMI y supervisión de procesos",
        "Instrumentación y calibración",
        "Redes industriales e Industria 4.0",
        "Programas por nivel y duración",
        "Inscripción y solicitudes",
      ]}
      note="Los programas mostrados en la página principal son ilustrativos. El catálogo comercial se publicará con contenidos, fechas y precios confirmados."
    />
  );
}
