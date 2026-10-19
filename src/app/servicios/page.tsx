import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";

export const metadata: Metadata = {
  title: "Servicios técnicos",
  description:
    "Servicios de formación, asesoría técnica y desarrollo de contenidos para la industria.",
};

export default function ServiciosPage() {
  return (
    <SectionPage
      label="SERVICIOS AMSILAB"
      code="05 / SERVICES"
      title={
        <>
          Conocimiento aplicado
          <br />
          a los retos de tu <span className="accent-word">operación.</span>
        </>
      }
      description="Además de cursos y talleres, AMSILAB acompañará a empresas e instituciones con servicios de formación y contenido técnico especializado."
      items={[
        "Diseño de programas de capacitación",
        "Asesoría en automatización industrial",
        "Contenidos técnicos y material didáctico",
        "Preparación de instructores internos",
        "Apoyo a proyectos de transformación",
        "Alianzas académicas e industriales",
      ]}
      note="El alcance de cada servicio se definirá en una reunión de diagnóstico con el cliente."
    />
  );
}
