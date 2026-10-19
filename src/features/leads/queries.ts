import { getDb } from "@/lib/db";

export const leadStatuses = [
  "nuevo",
  "contactado",
  "cerrado",
  "descartado",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cerrado: "Cerrado",
  descartado: "Descartado",
};

export function isLeadStatus(value: string): value is LeadStatus {
  return (leadStatuses as readonly string[]).includes(value);
}

export type LeadRecord = {
  id: string;
  createdAt: Date | string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  role: string | null;
  interest: string;
  courseSlug: string | null;
  message: string;
  status: LeadStatus;
};

type LeadRow = {
  id: string;
  created_at: Date | string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  role: string | null;
  interest: string;
  course_slug: string | null;
  message: string;
  status: string;
};

function normalize(row: LeadRow): LeadRecord {
  return {
    id: String(row.id),
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    role: row.role,
    interest: row.interest,
    courseSlug: row.course_slug,
    message: row.message,
    status: isLeadStatus(row.status) ? row.status : "nuevo",
  };
}

export type LeadFilters = {
  status?: LeadStatus | "todos";
  search?: string;
  limit?: number;
};

export async function listLeads(
  filters: LeadFilters = {},
): Promise<LeadRecord[]> {
  const db = getDb();

  if (!db) {
    return [];
  }

  const status = filters.status && filters.status !== "todos" ? filters.status : "";
  const search = (filters.search ?? "").trim();
  const pattern = `%${search}%`;
  const limit = Math.min(filters.limit ?? 200, 500);

  const rows = (await db`
    select id, created_at, name, email, phone, company, role, interest,
           course_slug, message, status
    from public.leads
    where (${status} = '' or status = ${status})
      and (
        ${pattern} = '%%'
        or name ilike ${pattern}
        or email ilike ${pattern}
        or coalesce(company, '') ilike ${pattern}
        or coalesce(course_slug, '') ilike ${pattern}
      )
    order by created_at desc
    limit ${limit}
  `) as unknown as LeadRow[];

  return rows.map(normalize);
}

export async function countLeadsByStatus(): Promise<Record<string, number>> {
  const db = getDb();

  if (!db) {
    return {};
  }

  const rows = (await db`
    select status, count(*)::int as total
    from public.leads
    group by status
  `) as unknown as Array<{ status: string; total: number }>;

  return rows.reduce<Record<string, number>>((accumulator, row) => {
    accumulator[row.status] = Number(row.total);
    return accumulator;
  }, {});
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<boolean> {
  const db = getDb();

  if (!db || !id) {
    return false;
  }

  const rows = (await db`
    update public.leads
    set status = ${status}
    where id = ${id}
    returning id
  `) as unknown as Array<{ id: string }>;

  return rows.length > 0;
}

export async function listLeadsForExport(): Promise<LeadRecord[]> {
  const db = getDb();

  if (!db) {
    return [];
  }

  const rows = (await db`
    select id, created_at, name, email, phone, company, role, interest,
           course_slug, message, status
    from public.leads
    order by created_at desc
    limit 5000
  `) as unknown as LeadRow[];

  return rows.map(normalize);
}
