import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Factory,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

type SectionPageProps = {
  label: string;
  code: string;
  title: ReactNode;
  description: string;
  items: string[];
  note?: string;
  ctaHref?: string;
  ctaLabel?: string;
  children?: ReactNode;
};

export function SectionPage({
  label,
  code,
  title,
  description,
  items,
  note,
  ctaHref = "/contacto",
  ctaLabel = "Solicitar información",
  children,
}: SectionPageProps) {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="hero-grid" />
          <div className="page-hero-content">
            <div className="section-label">
              <span />
              {label}
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="hero-actions">
              <Link href={ctaHref} className="button-primary">
                {ctaLabel} <ArrowRight size={18} />
              </Link>
              <Link href="/" className="button-secondary">
                Volver al inicio
              </Link>
            </div>
          </div>

          <div className="page-hero-panel" aria-hidden="true">
            <span className="page-code">AMSILAB / {code}</span>
            <Factory size={92} strokeWidth={0.8} />
            <span className="page-code page-code-bottom">
              INDUSTRIAL AUTOMATION LAB
            </span>
          </div>
        </section>

        <section className="section-wrap">
          <div className="section-heading">
            <div>
              <div className="section-label">
                <span />
                CONTENIDO EN PREPARACIÓN
              </div>
              <h2>
                Lo que estamos
                <br />
                <span>preparando.</span>
              </h2>
            </div>
            <p>
              Estamos construyendo esta sección con información real de
              programas, fechas y disponibilidad. Mientras tanto, puedes
              escribirnos para recibir una propuesta a medida.
            </p>
          </div>

          <div className="page-card-grid">
            {items.map((item, index) => (
              <article className="page-card" key={item}>
                <span className="page-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CheckCircle2 size={21} strokeWidth={1.6} />
                <h3>{item}</h3>
              </article>
            ))}
          </div>

          {note ? <p className="demo-note">{note}</p> : null}
        </section>

        {children ? <section className="section-wrap">{children}</section> : null}

        <section className="contact-band section-wrap">
          <div>
            <div className="section-label">
              <span />
              SIGUIENTE PASO
            </div>
            <h2>
              Hablemos de lo que
              <br />
              tu equipo <span>necesita.</span>
            </h2>
            <p>
              Cuéntanos tu objetivo y te ayudamos a definir el programa
              de formación más adecuado.
            </p>
          </div>
          <Link href="/contacto" className="button-primary">
            Contactar con AMSILAB <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
