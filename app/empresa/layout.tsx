"use client";

import { CalendarDays, CreditCard, Home, Search, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const nav = [
  { href: "/empresa", label: "Inicio", icon: Home },
  { href: "/empresa/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/empresa/buscar", label: "Buscar crew", icon: Search },
  { href: "/empresa/mi-crew", label: "Mi Crew", icon: Users },
  { href: "/empresa/pagos", label: "Pagos", icon: CreditCard },
];

export default function EmpresaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      nav={nav}
      area="Empresas"
      account={{ kicker: "Cuenta de empresa", name: "2Crew Producciones", note: "CDMX · Comisión 10% por contratación" }}
    >
      {children}
    </AppShell>
  );
}
