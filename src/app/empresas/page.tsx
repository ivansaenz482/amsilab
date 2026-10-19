import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";

export const metadata: Metadata = {
  title: "Capacitación para empresas",
  description:
    "Programas de capacitación industrial a medida para equipos técnicos y de mantenimiento.",
};

export default function EmpresasPage() {
  return (
    <SectionPage
      label="AMSILAB PARA EMPRESAS"
      code="04 / CORPORATE"
      title={
        <>
          Equipos mejor
          <br />
          preparados. <span className="accent-word">Procesos</span> más
          capaces.
        </>
      }
      description="Diseñamos programas de formación a medida para empresas que necesitan fortalecer las competencias de sus equipos técnicos, de mantenimiento y operación."
      items={[
        "Diagnóstico de necesidades de formación",
        "Programas adaptados a tus procesos",
        "Talleres técnicos especializados",
        "Formación presencial o por coordinar",
        "Seguimiento de competencias",
        "Propuesta comercial a medida",
      ]}
      note="La solicitud de propuesta empresarial se habilitará con el formulario de contacto en la siguiente entrega."
    />
  );
}
