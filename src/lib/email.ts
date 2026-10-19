const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 8000;

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

function getApiKey(): string | undefined {
  return process.env.RESEND_API_KEY;
}

export function getEmailFrom(): string {
  return process.env.RESEND_FROM_EMAIL ?? "AMSILAB <onboarding@resend.dev>";
}

export function getNotificationRecipient(): string | undefined {
  return process.env.LEAD_NOTIFICATION_EMAIL;
}

export function isEmailConfigured(): boolean {
  return Boolean(getApiKey());
}

export async function sendEmail(message: EmailMessage): Promise<boolean> {
  const apiKey = getApiKey();

  if (!apiKey) {
    return false;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getEmailFrom(),
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Resend rechazó el envío", response.status, detail);
      return false;
    }

    return true;
  } catch (error) {
    console.error("No se pudo enviar el correo", error);
    return false;
  }
}
