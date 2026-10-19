import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";

export const metadata: Metadata = {
  title: "Recursos técnicos",
  description:
    "Artículos, guías y recursos técnicos sobre automatización industrial y control de procesos.",
};

export default function RecursosPage() {
  return (
    <SectionPage
      label="RECURSOS TÉCNICOS"
      code="06 / RESOURCES"
      title={
        <>
          Conocimiento que
          <br />
          puedes <span className="accent-word">aplicar.</span>
        </>
      }
      description="Un espacio para compartir guías, notas técnicas y materiales de apoyo para profesionales y estudiantes de automatización."
      items={[
        "Guías de fundamentos industriales",
        "Notas técnicas de PLC y SCADA",
        "Buenas prácticas de instrumentación",
        "Material de apoyo para talleres",
        "Novedades y tendencias",
        "Descargables técnicos",
      ]}
      note="Los primeros recursos se publicarán junto con el catálogo de formación."
    />
  );
}
