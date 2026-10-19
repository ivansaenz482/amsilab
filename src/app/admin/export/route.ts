import { isAdminAuthenticated } from "@/lib/admin-auth";
import { formatDateStamp } from "@/lib/format";
import {
  leadStatusLabels,
  listLeadsForExport,
} from "@/features/leads/queries";

function csvCell(value: string | null | undefined): string {
  const text = value ?? "";

  return `"${text.replace(/"/g, '""')}"`;
}

function toIsoDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return new Response("No autorizado", {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const leads = await listLeadsForExport();

  const header = [
    "id",
    "fecha",
    "nombre",
    "correo",
    "telefono",
    "empresa",
    "cargo",
    "tipo",
    "programa",
    "mensaje",
    "estado",
  ];

  const lines = [header.join(",")];

  for (const lead of leads) {
    lines.push(
      [
        lead.id,
        toIsoDate(lead.createdAt),
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.role,
        lead.interest,
        lead.courseSlug,
        lead.message,
        leadStatusLabels[lead.status],
      ]
        .map(csvCell)
        .join(","),
    );
  }

  return new Response(`\uFEFF${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="amsilab-solicitudes-${formatDateStamp()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
