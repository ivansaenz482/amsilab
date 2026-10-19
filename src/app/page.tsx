import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Factory,
  Gauge,
  RadioTower,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/features/courses/course-card";
import { catalogNote, courses } from "@/features/courses/data";

const specialties = [
  {
    number: "01",
    title: "PLC & Control",
    description:
      "Programación, diagnóstico y puesta en marcha de sistemas de control.",
    icon: Cpu,
  },
  {
    number: "02",
    title: "SCADA & HMI",
    description:
      "Supervisión industrial, alarmas, visualización y control de procesos.",
    icon: Gauge,
  },
  {
    number: "03",
    title: "Instrumentación",
    description:
      "Sensores, transmisores, calibración y medición industrial.",
    icon: RadioTower,
  },
  {
    number: "04",
    title: "Industria 4.0",
    description:
      "Robótica, redes industriales, IIoT e integración de sistemas.",
    icon: Bot,
  },
];

const featuredCourses = courses.slice(0, 3);

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label">
      <span />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-content">
            <SectionLabel>
              CONOCIMIENTO QUE MUEVE LA INDUSTRIA
            </SectionLabel>

            <h1>
              La industria
              <br />
              evoluciona<span>.</span>
              <br />
              <span className="outline-text">Tú también.</span>
            </h1>

            <p className="hero-description">
              Formación técnica en automatización industrial,
              control de procesos y tecnologías que transforman
              la manera de producir.
            </p>

            <div className="hero-actions">
              <Link href="/cursos" className="button-primary">
                Explorar formación <ArrowRight size={18} />
              </Link>
              <Link href="/empresas" className="button-secondary">
                Soluciones para empresas
              </Link>
            </div>

            <div className="hero-note">
              <span className="status-dot" />
              CONOCIMIENTO TÉCNICO · APLICACIÓN REAL
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Visual industrial de AMSILAB"
          >
            <div className="visual-top">
              <span>AMSILAB / SYSTEMS</span>
              <span>01 — 04</span>
            </div>

            <div className="visual-center">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="visual-core">
                <Factory size={70} strokeWidth={0.9} />
              </div>
              <span className="orbit-tag tag-one">PLC / HMI</span>
              <span className="orbit-tag tag-two">INDUSTRY 4.0</span>
              <span className="orbit-tag tag-three">CONTROL</span>
            </div>

            <div className="visual-bottom">
              <div>
                <span>ENFOQUE</span>
                <strong>Ingeniería aplicada</strong>
              </div>
              <ArrowDownRight size={24} />
            </div>
          </div>

          <div className="hero-index">AMSILAB / 2026</div>
        </section>

        <section className="specialties section-wrap">
          <div className="section-heading">
            <div>
              <SectionLabel>ÁREAS DE ESPECIALIZACIÓN</SectionLabel>
              <h2>
                Tecnología que
                <br />
                puedes <span>dominar.</span>
              </h2>
            </div>
            <p>
              Desarrolla competencias técnicas para afrontar
              los desafíos de la automatización y los procesos
              industriales modernos.
            </p>
          </div>

          <div className="specialty-grid">
            {specialties.map((item) => {
              const Icon = item.icon;
              return (
                <article className="specialty-card" key={item.number}>
                  <div className="card-top">
                    <Icon size={27} strokeWidth={1.5} />
                    <span>{item.number}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link
                    href="/cursos"
                    className="text-link"
                    aria-label={`Explorar formación en ${item.title}`}
                  >
                    Explorar área <ArrowUpRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="programs section-wrap" id="formacion">
          <div className="section-heading">
            <div>
              <SectionLabel>APRENDE · PRACTICA · EVOLUCIONA</SectionLabel>
              <h2>
                Formación con
                <br />
                <span>propósito técnico.</span>
              </h2>
            </div>
            <Link href="/cursos" className="text-link all-programs">
              Ver catálogo <ArrowRight size={17} />
            </Link>
          </div>

          <div className="program-grid">
            {featuredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
          <p className="demo-note">{catalogNote}</p>
        </section>

        <section className="corporate">
          <div className="corporate-visual">
            <div className="corporate-orbit">
              <Factory size={88} strokeWidth={0.8} />
            </div>
            <span className="corporate-code">
              AMS / INDUSTRIAL SOLUTIONS
            </span>
          </div>

          <div className="corporate-content">
            <SectionLabel>AMSILAB PARA EMPRESAS</SectionLabel>
            <h2>
              Equipos mejor preparados.
              <br />
              <span>Procesos más capaces.</span>
            </h2>
            <p>
              Diseñamos programas de capacitación a medida para
              empresas que buscan fortalecer las competencias
              de sus equipos técnicos y de mantenimiento.
            </p>

            <ul className="benefit-list">
              <li>
                <CheckCircle2 size={19} />
                Programas adaptados a tus necesidades
              </li>
              <li>
                <CheckCircle2 size={19} />
                Talleres técnicos y formación especializada
              </li>
              <li>
                <CheckCircle2 size={19} />
                Modalidad por coordinar según el proyecto
              </li>
            </ul>

            <Link href="/empresas" className="button-primary">
              Solicitar una propuesta <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section className="contact-band section-wrap">
          <div>
            <SectionLabel>EL SIGUIENTE PASO COMIENZA AQUÍ</SectionLabel>
            <h2>
              Tu próximo proyecto
              <br />
              empieza con una <span>conversación.</span>
            </h2>
            <p>
              Cuéntanos qué necesitas aprender o qué competencias
              quieres desarrollar en tu equipo.
            </p>
          </div>
          <Link href="/contacto" className="button-primary">
            Contactar con AMSILAB <ChevronRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
