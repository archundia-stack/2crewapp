import Image from "next/image";
import Link from "next/link";
import { initials } from "@/lib/format";

export function Logo({ size = 34, href = "/" }: { size?: number; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2" aria-label="2Crew, inicio">
      <Image src="/logo-2.png" alt="" width={size} height={size} priority />
      <span className="font-display font-extrabold uppercase tracking-tight" style={{ fontSize: size * 0.85 }}>
        Crew
      </span>
    </Link>
  );
}

export function Stars({ n, black }: { n: number; black?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 text-amber text-sm whitespace-nowrap">
      {"★".repeat(n)}
      <span className="text-dim">{"☆".repeat(5 - n)}</span>
      {black && <span className="ml-1 rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] font-medium text-black">BLACK</span>}
    </span>
  );
}

const tones: Record<string, string> = {
  ok: "bg-ok/12 text-ok border-ok/25",
  amber: "bg-amber/12 text-amber border-amber/30",
  info: "bg-info/12 text-info border-info/25",
  bad: "bg-bad/12 text-bad border-bad/25",
  neutral: "bg-panel-2 text-muted border-line-2",
};

export function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  );
}

export const statusTone = (s: string): keyof typeof tones =>
  ({
    Confirmado: "ok",
    Verificada: "ok",
    Dispersado: "ok",
    Recibido: "ok",
    Liberado: "info",
    "Por confirmar": "amber",
    "En revisión": "amber",
    Retenido: "amber",
    "Por liberar": "info",
    Esperando: "amber",
    "Esperando SPEI": "amber",
    Contraoferta: "info",
    Invitado: "neutral",
    "Rechazó": "bad",
    "Monto distinto": "bad",
    "Pendiente de documentos": "bad",
  })[s] ?? "neutral";

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-panel-2 border border-line-2 font-semibold text-sm"
      style={{ width: size, height: size }}
    >
      {initials(name)}
    </span>
  );
}

export function Stat({ label, value, note, tone }: { label: string; value: string; note?: string; tone?: "ok" | "amber" }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-muted">{label}</div>
      <div className="font-display text-4xl font-bold mt-1">{value}</div>
      {note && <div className={`text-xs mt-1 ${tone === "ok" ? "text-ok" : tone === "amber" ? "text-amber" : "text-dim"}`}>{note}</div>}
    </div>
  );
}

export function Progress({ value, total }: { value: number; total: number }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="h-1.5 w-full rounded-full bg-line-2 overflow-hidden">
      <div className={`h-full rounded-full ${pct >= 100 ? "bg-ok" : "bg-amber"}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function DateChip({ month, day }: { month: string; day: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-panel-2">
      <span className="text-[10px] font-semibold text-amber">{month}</span>
      <span className="font-display text-2xl font-bold leading-none">{day}</span>
    </div>
  );
}

export function PageTitle({ kicker, title, children }: { kicker?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && <div className="font-mono text-xs uppercase tracking-widest text-muted">{kicker}</div>}
        <h1 className="font-display text-4xl md:text-5xl font-bold">{title}</h1>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function SectionTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
