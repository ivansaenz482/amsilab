"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Cpu, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/cursos", label: "Formación" },
  { href: "/talleres", label: "Talleres" },
  { href: "/seminarios", label: "Seminarios" },
  { href: "/empresas", label: "Empresas" },
  { href: "/servicios", label: "Servicios" },
];

const mobileLinks = [...links, { href: "/recursos", label: "Recursos" }];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
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
      <Link href="/" className="brand" aria-label="AMSILAB, inicio">
        <span className="brand-mark" aria-hidden="true">
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
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(pathname, link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contacto"
        className="nav-cta"
        aria-current={isActive(pathname, "/contacto") ? "page" : undefined}
      >
        Hablemos <ArrowUpRight size={16} aria-hidden="true" />
      </Link>

      <button
        type="button"
        className="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <Menu size={24} aria-hidden="true" />
        )}
      </button>

      <nav
        id="mobile-navigation"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Navegación móvil"
      >
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            tabIndex={open ? 0 : -1}
            aria-current={isActive(pathname, link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contacto"
          tabIndex={open ? 0 : -1}
          aria-current={isActive(pathname, "/contacto") ? "page" : undefined}
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
}
