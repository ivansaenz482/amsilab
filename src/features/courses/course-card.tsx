import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { Course } from "./types";
import { formatDateLabel, formatDuration, getNextSchedule } from "./data";

export function CourseCard({ course }: { course: Course }) {
  const Icon = course.icon;
  const next = getNextSchedule(course);

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="course-card-link"
      aria-label={`Ver detalles de ${course.title}`}
    >
      <article className="program-card">
        <div className="program-art">
          <div className="program-art-grid" />
          <span className="program-number">{course.code}</span>
          <Icon size={64} strokeWidth={0.9} aria-hidden="true" />
          <span className="program-art-caption">TECHNICAL TRAINING</span>
        </div>
        <div className="program-info">
          <span className="program-category">{course.category}</span>
          <h3>{course.title}</h3>
          <p>
            Nivel {course.level} · {formatDuration(course.hours)}
          </p>
          {next ? (
            <p className="program-next">
              <CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
              Próximo inicio: {formatDateLabel(next.startDate)}
            </p>
          ) : (
            <p className="program-next">Fechas por coordinar</p>
          )}
          <div className="program-footer">
            <span>{course.modalities.join(" · ")}</span>
            <span className="program-footer-icon" aria-hidden="true">
              <ArrowUpRight size={19} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
