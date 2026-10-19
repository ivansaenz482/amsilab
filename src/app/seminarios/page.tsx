import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";

export const metadata: Metadata = {
  title: "Seminarios técnicos",
  description:
    "Seminarios especializados sobre automatización industrial, control de procesos e Industria 4.0.",
};

export default function SeminariosPage() {
  return (
    <SectionPage
      label="SEMINARIOS TÉCNICOS"
      code="03 / SEMINARS"
      title={
        <>
          Temas que están
          <br />
          <span className="accent-word">transformando</span> la
          industria.
        </>
      }
      description="Encuentros técnicos para actualizar criterios, conocer tendencias y conversar con especialistas sobre los retos de la producción moderna."
      items={[
        "Automatización y control de procesos",
        "Industria 4.0 y IIoT",
        "Robótica e integración de sistemas",
        "Eficiencia y mantenimiento industrial",
        "Casos de aplicación",
        "Espacios para preguntas y networking",
      ]}
      note="Las fechas, expositores y temáticas definitivas se anunciarán cuando el calendario esté aprobado."
    />
  );
}
