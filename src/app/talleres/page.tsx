import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";

export const metadata: Metadata = {
  title: "Talleres prácticos",
  description:
    "Talleres técnicos aplicados de automatización industrial con práctica sobre equipos y casos reales.",
};

export default function TalleresPage() {
  return (
    <SectionPage
      label="TALLERES PRÁCTICOS"
      code="02 / WORKSHOPS"
      title={
        <>
          Aprende haciendo.
          <br />
          Práctica <span className="accent-word">técnica</span> real.
        </>
      }
      description="Talleres aplicados para desarrollar criterio técnico sobre equipos de control, instrumentación y sistemas industriales."
      items={[
        "Práctica sobre equipos de control",
        "Diagnóstico y puesta en marcha",
        "Ejercicios con casos industriales",
        "Trabajo guiado por instructores",
        "Grupos reducidos",
        "Modalidad presencial y por coordinar",
      ]}
      note="La programación de talleres se confirmará al publicar el calendario oficial de AMSILAB."
    />
  );
}
