import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de solicitudes",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="admin-shell">{children}</div>;
}
