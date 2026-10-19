import type { Metadata } from "next";
import { Clock, MessagesSquare, Send, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadForm } from "@/features/leads/lead-form";
import { getCourse } from "@/features/courses/data";
import { leadInterests, type LeadInterest } from "@/schemas/lead";

export const instant = false;

export const metadata: Metadata = {
  title: "Contacto y solicitudes",
  description:
    "Envía tu solicitud de información sobre formación técnica, talleres y capacitación empresarial en automatización industrial.",
};

function parseInterest(value: string | string[] | undefined): LeadInterest {
  const single = Array.isArray(value) ? value[0] : value;
  const candidate = single as LeadInterest | undefined;

  return candidate && leadInterests.includes(candidate) ? candidate : "otro";
}

export default async function ContactoPage(props: PageProps<"/contacto">) {
  const searchParams = await props.searchParams;
  const interest = parseInterest(searchParams.tipo);
  const courseParam = Array.isArray(searchParams.curso)
    ? searchParams.curso[0]
    : searchParams.curso;
  const course = courseParam ? getCourse(courseParam) : undefined;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="page-hero">
          <div className="hero-grid" />
          <div className="page-hero-content">
            <div className="section-label">
              <span />
              CONTACTO Y SOLICITUDES
            </div>
            <h1>
              Tu próximo proyecto
              <br />
              empieza con una{" "}
              <span className="accent-word">conversación.</span>
            </h1>
            <p>
              Completa el formulario y cuéntanos qué necesitas aprender o
              qué competencias quieres desarrollar en tu equipo. Te
              respondemos con una propuesta clara, sin compromiso.
            </p>
          </div>

          <div className="page-hero-panel" aria-hidden="true">
            <span className="page-code">AMSILAB / 07</span>
            <Send size={92} strokeWidth={0.8} />
            <span className="page-code page-code-bottom">
              DIRECT CONTACT
            </span>
          </div>
        </section>

        <section className="contact-layout">
          <LeadForm
            defaultInterest={interest}
            courseSlug={course?.slug}
            courseTitle={course?.title}
          />

          <aside className="contact-aside">
            <div className="contact-aside-card">
              <h3>Cómo te contactamos</h3>
              <p>
                Revisamos cada solicitud de forma manual. Si tu consulta es
                sobre un programa, te enviamos contenidos, duración y
                disponibilidad.
              </p>
            </div>
            <div className="contact-aside-card">
              <h3>Capacitación para empresas</h3>
              <p>
                Para equipos técnicos y de mantenimiento diseñamos programas
                a medida. Indícanos la cantidad de participantes y el
                contexto de tu operación.
              </p>
            </div>
            <div className="contact-aside-card">
              <h3>Privacidad</h3>
              <p>
                Usamos tus datos únicamente para responder esta solicitud.
                No compartimos tu información con terceros.
              </p>
            </div>
          </aside>
        </section>

        <section className="section-wrap specialties">
          <div className="section-heading">
            <div>
              <div className="section-label">
                <span />
                ANTES DE ESCRIBIR
              </div>
              <h2>
                Tres datos que
                <br />
                <span>nos ayudan.</span>
              </h2>
            </div>
          </div>

          <div className="page-card-grid">
            <article className="page-card">
              <MessagesSquare size={21} strokeWidth={1.6} />
              <h3>Cuéntanos tu objetivo de formación</h3>
            </article>
            <article className="page-card">
              <Clock size={21} strokeWidth={1.6} />
              <h3>Indica fechas o plazos aproximados</h3>
            </article>
            <article className="page-card">
              <ShieldCheck size={21} strokeWidth={1.6} />
              <h3>Menciona cantidad de participantes</h3>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
