"use client";

import { Building2, CalendarDays, HardHat, LayoutDashboard, Landmark, Table2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const nav = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/pagos", label: "Pagos SPEI", icon: Landmark, badge: "2" },
  { href: "/admin/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/admin/empresas", label: "Empresas", icon: Building2, badge: "2" },
  { href: "/admin/tecnicos", label: "Técnicos", icon: HardHat },
  { href: "/admin/tabulador", label: "Tabulador", icon: Table2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell nav={nav} area="Admin 2Crew" account={{ kicker: "Equipo 2Crew", name: "Archu", note: "Administrador" }}>
      {children}
    </AppShell>
  );
}
