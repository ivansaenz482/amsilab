import Link from "next/link";
import { Cpu } from "lucide-react";
import { CopyrightYear } from "./copyright-year";

export function Footer() {
  return (
    <footer className="footer">
      <Link href="/" className="brand">
        <span className="brand-mark">
          <Cpu size={21} />
        </span>
        <span>
          <strong>
            AMSI<span>LAB</span>
          </strong>
          <small>INDUSTRIAL AUTOMATION</small>
        </span>
      </Link>
      <p>Formación técnica para una industria en evolución.</p>
      <div className="footer-links">
        <Link href="/cursos">Formación</Link>
        <Link href="/empresas">Empresas</Link>
        <Link href="/contacto">Contacto</Link>
      </div>
      <span className="footer-copy">
        <CopyrightYear />
      </span>
    </footer>
  );
}
