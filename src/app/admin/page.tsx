import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  LogOut,
  Mail,
  Phone,
  Search,
} from "lucide-react";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { formatDateTimeUtc } from "@/lib/format";
import { getCourse } from "@/features/courses/data";
import {
  countLeadsByStatus,
  isLeadStatus,
  leadStatusLabels,
  leadStatuses,
  listLeads,
  type LeadRecord,
} from "@/features/leads/queries";
import {
  leadInterestLabels,
  leadInterests,
  type LeadInterest,
} from "@/schemas/lead";
import { logoutAction } from "./login/actions";
import { updateStatusAction } from "./actions";

export const instant = false;

export const metadata: Metadata = {
  title: "Solicitudes",
  robots: { index: false, follow: false },
};

function interestLabel(value: string): string {
  return leadInterests.includes(value as LeadInterest)
    ? leadInterestLabels[value as LeadInterest]
    : value;
}

function LeadItem({ lead }: { lead: LeadRecord }) {
  const course = lead.courseSlug ? getCourse(lead.courseSlug) : undefined;
  const remaining = leadStatuses.filter((status) => status !== lead.status);

  return (
    <article className="lead-item">
      <header className="lead-head">
        <div>
          <h2>{lead.name}</h2>
          <p className="lead-sub">
            {lead.company ? `${lead.company} · ` : ""}
            {lead.role ? `${lead.role} · ` : ""}
            {formatDateTimeUtc(lead.createdAt)}
          </p>
        </div>
        <span className={`status-pill status-${lead.status}`}>
          {leadStatusLabels[lead.status]}
        </span>
      </header>

      <dl className="lead-meta">
        <div>
          <dt>Solicitud</dt>
          <dd>{interestLabel(lead.interest)}</dd>
        </div>
        {course ? (
          <div>
            <dt>Programa</dt>
            <dd>
              <Link href={`/cursos/${course.slug}`} className="text-link">
                {course.title}
              </Link>
            </dd>
          </div>
        ) : null}
      </dl>

      <p className="lead-message">{lead.message}</p>

      <div className="lead-contact">
        <a href={`mailto:${lead.email}`}>
          <Mail size={15} aria-hidden="true" /> {lead.email}
        </a>
        {lead.phone ? (
          <a href={`tel:${lead.phone.replace(/\s+/g, "")}`}>
            <Phone size={15} aria-hidden="true" /> {lead.phone}
          </a>
        ) : null}
      </div>

      <div className="lead-actions">
        <span className="lead-actions-label">Marcar como:</span>
        {remaining.map((status) => (
          <form key={status} action={updateStatusAction}>
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="status" value={status} />
            <button type="submit" className="admin-chip-button">
              {leadStatusLabels[status]}
            </button>
          </form>
        ))}
      </div>
    </article>
  );
}

export default async function AdminPage(props: PageProps<"/admin">) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const searchParams = await props.searchParams;
  const statusParam =
    typeof searchParams.estado === "string" ? searchParams.estado : "todos";
  const status = isLeadStatus(statusParam) ? statusParam : "todos";
  const search =
    typeof searchParams.q === "string" ? searchParams.q.slice(0, 80) : "";

  const databaseReady = isDatabaseConfigured();
  const leads = databaseReady ? await listLeads({ status, search }) : [];
  const counts = databaseReady ? await countLeadsByStatus() : {};
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

  return (
    <>
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link href="/admin" className="brand admin-brand">
            <span>
              <strong>
                AMSI<span>LAB</span>
              </strong>
              <small>PANEL DE SOLICITUDES</small>
            </span>
          </Link>

          <div className="admin-header-actions">
            <Link href="/" className="admin-chip-button">
              <ExternalLink size={15} aria-hidden="true" /> Ver sitio
            </Link>
            <a href="/admin/export" className="admin-chip-button">
              <Download size={15} aria-hidden="true" /> CSV
            </a>
            <form action={logoutAction}>
              <button type="submit" className="admin-chip-button">
                <LogOut size={15} aria-hidden="true" /> Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main id="main-content" className="admin-main">
        <div className="admin-title">
          <h1>Solicitudes recibidas</h1>
          <p>
            Revisa cada solicitud y marca su estado. Las respuestas por correo
            se envían desde tu cliente de correo habitual.
          </p>
        </div>

        {!isAdminConfigured() ? (
          <p className="form-error" role="alert">
            Falta configurar ADMIN_PASSWORD y ADMIN_SESSION_SECRET.
          </p>
        ) : null}

        {!databaseReady ? (
          <p className="form-error" role="alert">
            Falta configurar DATABASE_URL para leer las solicitudes.
          </p>
        ) : null}

        <div className="admin-stats">
          <Link
            href="/admin"
            className={`admin-stat${status === "todos" ? " is-active" : ""}`}
          >
            <strong>{total}</strong>
            <span>Total</span>
          </Link>
          {leadStatuses.map((item) => (
            <Link
              key={item}
              href={`/admin?estado=${item}`}
              className={`admin-stat${status === item ? " is-active" : ""}`}
            >
              <strong>{counts[item] ?? 0}</strong>
              <span>{leadStatusLabels[item]}</span>
            </Link>
          ))}
        </div>

        <form className="admin-filters" action="/admin" method="get">
          <div className="field">
            <label htmlFor="admin-search">Buscar</label>
            <input
              id="admin-search"
              name="q"
              type="search"
              defaultValue={search}
              placeholder="Nombre, correo, empresa o programa"
            />
          </div>
          <div className="field">
            <label htmlFor="admin-status">Estado</label>
            <select id="admin-status" name="estado" defaultValue={status}>
              <option value="todos">Todos</option>
              {leadStatuses.map((item) => (
                <option key={item} value={item}>
                  {leadStatusLabels[item]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button-secondary">
            <Search size={16} aria-hidden="true" /> Filtrar
          </button>
        </form>

        {leads.length === 0 ? (
          <div className="admin-empty">
            <h2>No hay solicitudes para mostrar</h2>
            <p>
              Cuando alguien complete el formulario del sitio, aparecerá aquí
              con todos sus datos de contacto.
            </p>
            <Link href="/contacto" className="button-secondary">
              Ver formulario público <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="lead-list">
            {leads.map((lead) => (
              <LeadItem key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
