import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";
import { LeadForm } from "@/features/leads/lead-form";

export const metadata: Metadata = {
  title: "Capacitación para empresas",
  description:
    "Programas de capacitación industrial a medida para equipos técnicos y de mantenimiento. Solicita una propuesta.",
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
      note="El alcance de cada programa se define en una conversación inicial con el responsable de la empresa."
    >
      <div className="section-heading">
        <div>
          <div className="section-label">
            <span />
            SOLICITUD DE PROPUESTA
          </div>
          <h2>
            Cuéntanos sobre
            <br />
            <span>tu equipo.</span>
          </h2>
        </div>
        <p>
          Completa el formulario con el contexto de tu empresa. Usaremos esa
          información para preparar una propuesta de capacitación acorde a
          tus procesos.
        </p>
      </div>

      <LeadForm
        defaultInterest="empresarial"
        submitLabel="Solicitar propuesta"
      />
    </SectionPage>
  );
}
