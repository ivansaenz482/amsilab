import type { Metadata } from "next";
import { isAdminConfigured } from "@/lib/admin-auth";
import { LoginCard } from "./login-card";

export const metadata: Metadata = {
  title: "Acceso al panel",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main id="main-content" className="admin-login">
      {isAdminConfigured() ? (
        <LoginCard />
      ) : (
        <div className="admin-login-card">
          <p className="form-error" role="alert">
            El panel todavía no está configurado. Define ADMIN_PASSWORD y
            ADMIN_SESSION_SECRET en el entorno del proyecto.
          </p>
        </div>
      )}
    </main>
  );
}
