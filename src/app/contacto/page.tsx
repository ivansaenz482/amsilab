import type { Metadata } from "next";
import { SectionPage } from "@/components/site/section-page";

export const metadata: Metadata = {
  title: "Contacto y solicitudes",
  description:
    "Solicita información sobre formación técnica, talleres y capacitación empresarial en automatización industrial.",
};

export default function ContactoPage() {
  return (
    <SectionPage
      label="CONTACTO Y SOLICITUDES"
      code="07 / CONTACT"
      title={
        <>
          Tu próximo proyecto
          <br />
          empieza con una <span className="accent-word">conversación.</span>
        </>
      }
      description="Cuéntanos qué necesitas aprender o qué competencias quieres desarrollar en tu equipo. Estamos preparando el formulario de solicitudes para atenderte de forma clara y ordenada."
      items={[
        "Formulario de solicitud de información",
        "Solicitudes de capacitación empresarial",
        "Consultas sobre talleres y seminarios",
        "Solicitud de propuesta a medida",
        "Confirmaciones por correo electrónico",
        "Seguimiento comercial",
      ]}
      note="El formulario de contacto con validación y envío de correo se habilitará en la siguiente entrega. Mientras tanto, la página principal resume la oferta y los canales disponibles."
      ctaHref="/"
      ctaLabel="Volver al inicio"
    />
  );
}
