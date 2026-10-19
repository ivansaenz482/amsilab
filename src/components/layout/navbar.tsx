"use client";

import Link from "next/link";
import { Cpu, Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/cursos", label: "Formación" },
  { href: "/talleres", label: "Talleres" },
  { href: "/seminarios", label: "Seminarios" },
  { href: "/empresas", label: "Empresas" },
  { href: "/servicios", label: "Servicios" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="navbar">
      <Link
        href="/"
        className="brand"
        aria-label="AMSILAB, inicio"
        onClick={() => setOpen(false)}
      >
        <span className="brand-mark">
          <Cpu size={23} strokeWidth={1.8} />
        </span>
        <span>
          <strong>
            AMSI<span>LAB</span>
          </strong>
          <small>INDUSTRIAL AUTOMATION</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contacto"
        className="nav-cta"
        onClick={() => setOpen(false)}
      >
        Hablemos <ArrowUpRight size={16} />
      </Link>

      <button
        type="button"
        className="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        id="mobile-navigation"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Navegación móvil"
        aria-hidden={!open}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/recursos"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Recursos
        </Link>
        <Link
          href="/contacto"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
}
