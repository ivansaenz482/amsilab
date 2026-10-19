import { getCourse } from "@/features/courses/data";
import { siteUrl } from "@/lib/site";
import { getNotificationRecipient, sendEmail } from "@/lib/email";
import { leadInterestLabels, type LeadInput } from "@/schemas/lead";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#5b7288;font-size:12px;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap">${label}</td>
    <td style="padding:6px 0;color:#0d1b27;font-size:14px">${escapeHtml(value)}</td>
  </tr>`;
}

function wrap(title: string, content: string): string {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:24px;background:#f2f5f8;font-family:Helvetica,Arial,sans-serif">
    <table role="presentation" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dbe3ea;border-radius:6px">
      <tr>
        <td style="padding:22px 26px;border-bottom:1px solid #dbe3ea;background:#0d1b27;border-radius:6px 6px 0 0">
          <span style="color:#42e8d5;font-size:16px;font-weight:bold;letter-spacing:1px">AMSILAB</span>
          <span style="color:#8fa3b5;font-size:11px;letter-spacing:1px"> &nbsp;INDUSTRIAL AUTOMATION</span>
        </td>
      </tr>
      <tr><td style="padding:26px">${content}</td></tr>
    </table>
    <p style="max-width:600px;margin:14px auto 0;color:#7b8b9b;font-size:11px;text-align:center">
      Mensaje automático de ${escapeHtml(siteUrl)}
    </p>
  </body>
</html>`;
}

export function buildLeadNotification(data: LeadInput): {
  subject: string;
  html: string;
  text: string;
} {
  const course = data.courseSlug ? getCourse(data.courseSlug) : undefined;
  const interestLabel = leadInterestLabels[data.interest];
  const subject = course
    ? `Nueva solicitud · ${course.title} · ${data.name}`
    : `Nueva solicitud · ${interestLabel} · ${data.name}`;

  const rows = [
    fieldRow("Nombre", data.name),
    fieldRow("Correo", data.email),
    data.phone ? fieldRow("Teléfono", data.phone) : "",
    data.company ? fieldRow("Empresa", data.company) : "",
    data.role ? fieldRow("Cargo", data.role) : "",
    fieldRow("Tipo", interestLabel),
    course ? fieldRow("Programa", course.title) : "",
  ].join("");

  const html = wrap(
    subject,
    `<h1 style="margin:0 0 6px;font-size:20px;color:#0d1b27">Nueva solicitud desde la web</h1>
     <p style="margin:0 0 18px;color:#5b7288;font-size:13px">Registrada en el panel de AMSILAB.</p>
     <table role="presentation" style="width:100%;border-collapse:collapse">${rows}</table>
     <div style="margin:20px 0 0;padding:16px;border-left:3px solid #42e8d5;background:#f6fafb;color:#17303d;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(
       data.message,
     )}</div>
     <p style="margin:22px 0 0">
       <a href="${escapeHtml(
         `${siteUrl}/admin`,
       )}" style="display:inline-block;padding:11px 20px;border-radius:4px;background:#0d1b27;color:#42e8d5;font-size:13px;text-decoration:none">Abrir panel de solicitudes</a>
     </p>`,
  );

  const text = [
    "Nueva solicitud desde la web de AMSILAB",
    "",
    `Nombre: ${data.name}`,
    `Correo: ${data.email}`,
    data.phone ? `Teléfono: ${data.phone}` : "",
    data.company ? `Empresa: ${data.company}` : "",
    data.role ? `Cargo: ${data.role}` : "",
    `Tipo: ${interestLabel}`,
    course ? `Programa: ${course.title}` : "",
    "",
    data.message,
    "",
    `Panel: ${siteUrl}/admin`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

export function buildLeadConfirmation(data: LeadInput): {
  subject: string;
  html: string;
  text: string;
} {
  const course = data.courseSlug ? getCourse(data.courseSlug) : undefined;
  const subject = course
    ? `Recibimos tu consulta sobre ${course.title}`
    : "Recibimos tu solicitud · AMSILAB";

  const html = wrap(
    subject,
    `<h1 style="margin:0 0 6px;font-size:20px;color:#0d1b27">Gracias por escribirnos, ${escapeHtml(
      data.name.split(" ")[0] ?? data.name,
    )}.</h1>
     <p style="margin:0 0 16px;color:#17303d;font-size:14px;line-height:1.8">
       Registramos tu solicitud${
         course
           ? ` sobre <strong>${escapeHtml(course.title)}</strong>`
           : ""
       }. Nuestro equipo la revisa de forma manual y te responderá con la información de contenidos, fechas y disponibilidad.
     </p>
     <p style="margin:0 0 16px;color:#5b7288;font-size:13px;line-height:1.8">
       Copia de tu mensaje:
     </p>
     <div style="padding:14px 16px;border-left:3px solid #42e8d5;background:#f6fafb;color:#17303d;font-size:13px;line-height:1.7;white-space:pre-wrap">${escapeHtml(
       data.message,
     )}</div>
     <p style="margin:20px 0 0;color:#5b7288;font-size:12px;line-height:1.7">
       Si necesitas algo adicional, responde directamente a este correo.
     </p>`,
  );

  const text = [
    `Gracias por escribirnos, ${data.name}.`,
    "",
    course
      ? `Registramos tu solicitud sobre ${course.title}.`
      : "Registramos tu solicitud.",
    "Nuestro equipo la revisa y te responderá con contenidos, fechas y disponibilidad.",
    "",
    "Copia de tu mensaje:",
    data.message,
  ].join("\n");

  return { subject, html, text };
}

export async function notifyNewLead(data: LeadInput): Promise<void> {
  const recipient = getNotificationRecipient();

  if (recipient) {
    const notification = buildLeadNotification(data);
    await sendEmail({ ...notification, to: recipient, replyTo: data.email });
  }

  const confirmation = buildLeadConfirmation(data);
  await sendEmail({ ...confirmation, to: data.email });
}
