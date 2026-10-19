import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/features/courses/course-card";
import { catalogNote, courses } from "@/features/courses/data";

export const metadata: Metadata = {
  title: "Catálogo de formación",
  description:
    "Programas de formación técnica en automatización industrial, PLC, SCADA, instrumentación, redes industriales, robótica y accionamientos.",
};

export default function CursosPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="hero-grid" />
          <div className="page-hero-content">
            <div className="section-label">
              <span />
              CATÁLOGO DE FORMACIÓN
            </div>
            <h1>
              Formación técnica
              <br />
              para <span className="accent-word">dominar</span> la
              automatización.
            </h1>
            <p>
              Programas que combinan fundamentos y práctica sobre
              tecnologías de automatización, control de procesos y
              producción moderna.
            </p>
            <div className="hero-actions">
              <Link href="/contacto?tipo=curso" className="button-primary">
                Solicitar información <ArrowRight size={18} />
              </Link>
              <Link href="/empresas" className="button-secondary">
                Capacitación para empresas
              </Link>
            </div>
          </div>

          <div className="page-hero-panel" aria-hidden="true">
            <span className="page-code">AMSILAB / 01</span>
            <Factory size={92} strokeWidth={0.8} />
            <span className="page-code page-code-bottom">
              TRAINING CATALOG
            </span>
          </div>
        </section>

        <section className="section-wrap">
          <div className="section-heading">
            <div>
              <div className="section-label">
                <span />
                {courses.length} PROGRAMAS
              </div>
              <h2>
                Elige tu
                <br />
                <span>ruta técnica.</span>
              </h2>
            </div>
            <p>
              Cada programa indica nivel, duración y modalidad. Puedes
              consultar por cualquiera de ellos para recibir contenidos
              detallados y disponibilidad.
            </p>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>

          <p className="demo-note catalog-note">{catalogNote}</p>
        </section>

        <section className="contact-band section-wrap">
          <div>
            <div className="section-label">
              <span />
              ASESORÍA SIN COMPROMISO
            </div>
            <h2>
              ¿No sabes qué programa
              <br />
              elegir? Te <span>ayudamos.</span>
            </h2>
            <p>
              Cuéntanos tu perfil y objetivo, y te recomendamos la ruta de
              formación más adecuada.
            </p>
          </div>
          <Link href="/contacto?tipo=otro" className="button-primary">
            Hablar con AMSILAB <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
