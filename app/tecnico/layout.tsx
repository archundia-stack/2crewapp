"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoBar } from "@/components/demo-bar";
import { Briefcase, CalendarDays, CreditCard, Home, User } from "lucide-react";

const tabs = [
  { href: "/tecnico", label: "Inicio", icon: Home },
  { href: "/tecnico/ofertas", label: "Ofertas", icon: Briefcase },
  { href: "/tecnico/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/tecnico/pagos", label: "Pagos", icon: CreditCard },
  { href: "/tecnico/perfil", label: "Perfil", icon: User },
];

export default function TecnicoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/tecnico" ? pathname === href : pathname.startsWith(href));
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col border-x border-line bg-bg">
      <DemoBar />
      <main className="flex-1 px-4 pb-28 pt-6">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-line bg-panel/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {tabs.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${active(href) ? "text-amber font-semibold" : "text-muted"}`}>
              <span className={`rounded-full px-3 py-1 ${active(href) ? "bg-amber/15" : ""}`}><Icon size={19} /></span>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
