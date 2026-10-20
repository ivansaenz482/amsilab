import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { LoginForm } from "./login-form";

export function LoginCard({ notice }: { notice?: string }) {
  return (
    <div className="admin-login-card">
      <span className="admin-badge">
        <ShieldCheck size={16} aria-hidden="true" /> ACCESO PRIVADO
      </span>
      <h1>Panel de solicitudes</h1>
      <p>
        Espacio interno de AMSILAB para revisar las solicitudes recibidas desde
        el sitio web.
      </p>

      {notice ? (
        <p className="admin-notice" role="status">
          {notice}
        </p>
      ) : null}

      <LoginForm />

      <Link href="/" className="text-link admin-back">
        <ArrowLeft size={16} aria-hidden="true" /> Volver al sitio
      </Link>
    </div>
  );
}
