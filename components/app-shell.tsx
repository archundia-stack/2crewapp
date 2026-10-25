"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, type LucideIcon } from "lucide-react";
import { Logo } from "./ui";
import { DemoBar } from "./demo-bar";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export function AppShell({
  nav,
  account,
  area,
  children,
}: {
  nav: NavItem[];
  account: { kicker: string; name: string; note: string };
  area: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = nav[0].href;

  const isActive = (href: string) => (href === root ? pathname === href : pathname.startsWith(href));

  const links = (
    <nav className="flex flex-col gap-1">
      {nav.map(({ href, label, icon: Icon, badge }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
            isActive(href) ? "bg-panel-2 text-ink font-semibold" : "text-muted hover:text-ink hover:bg-panel-2/60"
          }`}
        >
          <Icon size={17} />
          <span className="flex-1">{label}</span>
          {badge && <span className="rounded-full bg-amber px-1.5 text-[11px] font-bold text-amber-ink">{badge}</span>}
        </Link>
      ))}
    </nav>
  );

  const accountCard = (
    <div className="card p-3 text-xs">
      <div className="text-dim">{account.kicker}</div>
      <div className="text-sm font-semibold text-ink mt-0.5">{account.name}</div>
      <div className="text-muted mt-0.5">{account.note}</div>
    </div>
  );

  return (
    <div className="min-h-dvh md:flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col gap-8 border-r border-line p-4 sticky top-0 h-dvh">
        <div className="px-1 pt-1">
          <Logo size={30} href={root} />
          <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-amber">{area}</div>
        </div>
        {links}
        <div className="mt-auto flex flex-col gap-3">
          {accountCard}
          <Link href="/entrar" className="px-1 text-xs text-dim hover:text-ink">
            Cambiar de rol
          </Link>
        </div>
      </aside>

      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/95 backdrop-blur px-4 py-3">
        <Logo size={26} href={root} />
        <button aria-label="Menú" onClick={() => setOpen(!open)} className="btn btn-ghost !px-2.5">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      {open && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-20 flex flex-col gap-6 bg-bg p-4">
          {links}
          {accountCard}
          <Link href="/entrar" className="text-sm text-dim">
            Cambiar de rol
          </Link>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <DemoBar />
        <main className="px-4 py-6 md:px-8 md:py-8 max-w-[1400px]">{children}</main>
      </div>
    </div>
  );
}
