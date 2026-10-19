import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const instant = false;

export const metadata: Metadata = {
  title: "Acceso al panel",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const configured = isAdminConfigured();

  return (
    <main id="main-content" className="admin-login">
      <div className="admin-login-card">
        <span className="admin-badge">
          <ShieldCheck size={16} aria-hidden="true" /> ACCESO PRIVADO
        </span>
        <h1>Panel de solicitudes</h1>
        <p>
          Espacio interno de AMSILAB para revisar las solicitudes recibidas
          desde el sitio web.
        </p>

        {configured ? (
          <LoginForm />
        ) : (
          <p className="form-error" role="alert">
            El panel todavía no está configurado. Define las variables
            ADMIN_PASSWORD y ADMIN_SESSION_SECRET en el entorno del proyecto.
          </p>
        )}

        <Link href="/" className="text-link admin-back">
          <ArrowLeft size={16} aria-hidden="true" /> Volver al sitio
        </Link>
      </div>
    </main>
  );
}
