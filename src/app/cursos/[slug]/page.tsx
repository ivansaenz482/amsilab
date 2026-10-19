import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  Layers,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  catalogNote,
  courses,
  getCourse,
  getCourseSlugs,
} from "@/features/courses/data";
import { CourseCard } from "@/features/courses/course-card";

export function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/cursos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourse(slug);

  if (!course) {
    return { title: "Programa no encontrado" };
  }

  return {
    title: course.title,
    description: course.summary,
    openGraph: {
      title: `${course.title} | AMSILAB`,
      description: course.summary,
      type: "article",
    },
  };
}

export default async function CoursePage(props: PageProps<"/cursos/[slug]">) {
  const { slug } = await props.params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const Icon = course.icon;
  const related = courses
    .filter((item) => item.slug !== course.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <section className="course-hero">
          <div className="hero-grid" />
          <div className="course-hero-content">
            <div className="section-label">
              <span />
              {course.category}
            </div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>

            <div className="course-meta-row">
              <span className="chip">
                <GraduationCap size={15} /> Nivel {course.level}
              </span>
              <span className="chip">
                <CalendarClock size={15} /> {course.duration}
              </span>
              <span className="chip">
                <Layers size={15} /> {course.modules.length} módulos
              </span>
              <span className="chip">
                <Users size={15} /> {course.modalities.join(" · ")}
              </span>
            </div>
          </div>

          <div className="course-hero-art" aria-hidden="true">
            <span className="course-code">{course.code}</span>
            <Icon size={92} strokeWidth={0.8} />
            <span className="course-code page-code-bottom">
              TECHNICAL TRAINING
            </span>
          </div>
        </section>

        <section className="course-body">
          <div className="course-main">
            <div className="section-label">
              <span />
              COMPETENCIAS
            </div>
            <h2>Qué lograrás con este programa</h2>
            <p>
              Al finalizar, contarás con criterios técnicos para aplicar
              lo aprendido en equipos y procesos reales de planta.
            </p>

            <ul className="outcome-list">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>
                  <CheckCircle2 size={18} strokeWidth={1.7} />
                  {outcome}
                </li>
              ))}
            </ul>

            <div className="section-label section-label-spaced">
              <span />
              CONTENIDO
            </div>
            <h2>Temario del programa</h2>

            <div className="module-list">
              {course.modules.map((module, index) => (
                <article className="module-item" key={module.title}>
                  <div className="module-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{module.title}</h3>
                  </div>
                  <ul className="module-topics">
                    {module.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="section-label section-label-spaced">
              <span />
              DIRIGIDO A
            </div>
            <h2>Perfil del participante</h2>

            <ul className="audience-list">
              {course.audience.map((item) => (
                <li key={item}>
                  <Users size={18} strokeWidth={1.6} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="course-side">
            <div className="section-label">
              <span />
              DETALLES
            </div>
            <h2>Información del programa</h2>

            <ul className="course-info-list">
              <li>
                <span>NIVEL</span>
                <strong>{course.level}</strong>
              </li>
              <li>
                <span>DURACIÓN ESTIMADA</span>
                <strong>{course.duration}</strong>
              </li>
              <li>
                <span>MODALIDAD</span>
                <strong>{course.modalities.join(" · ")}</strong>
              </li>
              <li>
                <span>MÓDULOS</span>
                <strong>{course.modules.length}</strong>
              </li>
            </ul>

            <Link
              href={`/contacto?tipo=curso&curso=${course.slug}`}
              className="button-primary"
            >
              Consultar este programa <ArrowRight size={18} />
            </Link>

            <p className="course-side-note">{catalogNote}</p>
          </aside>
        </section>

        <section className="section-wrap specialties">
          <div className="section-heading">
            <div>
              <div className="section-label">
                <span />
                SIGUE EXPLORANDO
              </div>
              <h2>
                Otros programas
                <br />
                <span>relacionados.</span>
              </h2>
            </div>
            <Link href="/cursos" className="text-link all-programs">
              Ver catálogo completo <ArrowRight size={17} />
            </Link>
          </div>

          <div className="course-grid">
            {related.map((item) => (
              <CourseCard key={item.slug} course={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
