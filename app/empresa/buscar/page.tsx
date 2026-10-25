"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { technicians, type Technician } from "@/lib/data";
import { PageTitle } from "@/components/ui";
import { TechCard } from "@/components/tech-card";

const areas: Technician["area"][] = ["Audio", "Iluminación", "Video", "Rigging", "Escenario", "Producción", "Sistemas"];

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm ${on ? "border-amber bg-amber font-semibold text-amber-ink" : "border-line-2 text-ink hover:bg-panel-2"}`}
    >
      {children}
    </button>
  );
}

export default function BuscarCrew() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"Todos" | "Mi Crew" | "New Crew">("Todos");
  const [area, setArea] = useState<string | null>(null);
  const [city, setCity] = useState("Monterrey y 100 km");
  const [minStars, setMinStars] = useState(3);
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [onlyVerified, setOnlyVerified] = useState(false);

  const base = useMemo(
    () =>
      technicians.filter((t) => {
        if (area && t.area !== area) return false;
        if (t.stars < minStars) return false;
        if (onlyAvailable && !t.available) return false;
        if (onlyVerified && !t.verified) return false;
        if (city === "Monterrey y 100 km" && !(t.distanceKm !== undefined && t.distanceKm <= 100)) return false;
        if (city === "CDMX" && t.city !== "CDMX") return false;
        if (q) {
          const hay = [t.name, t.role, t.city, ...t.skills].join(" ").toLowerCase();
          if (!q.toLowerCase().split(/\s+/).every((w) => w.length < 3 || hay.includes(w))) return false;
        }
        return true;
      }),
    [q, area, city, minStars, onlyAvailable, onlyVerified],
  );
  const list = base.filter((t) => tab === "Todos" || t.origin === tab).sort((a, b) => b.match - a.match);
  const count = (o: string) => (o === "Todos" ? base.length : base.filter((t) => t.origin === o).length);

  return (
    <>
      <PageTitle title="Buscar crew" />
      <div className="card mb-4 flex items-center gap-3 px-4 py-3">
        <Search size={18} className="text-muted" />
        <input
          className="flex-1 bg-transparent outline-none placeholder:text-dim"
          placeholder="Ej. luces grandMA3 Monterrey"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="hidden rounded bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-muted sm:block">Busca por puesto, equipo o ciudad</span>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {(["Todos", "Mi Crew", "New Crew"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-1.5 text-sm ${tab === t ? "border-ink bg-ink font-semibold text-black" : "border-line-2"}`}
          >
            {t} · {count(t)}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[270px_1fr]">
        <aside className="card h-fit p-4 text-sm">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Área</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {areas.map((a) => (
              <Chip key={a} on={area === a} onClick={() => setArea(area === a ? null : a)}>{a}</Chip>
            ))}
          </div>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">Ciudad</div>
          <select className="input mt-2" value={city} onChange={(e) => setCity(e.target.value)}>
            <option>Monterrey y 100 km</option>
            <option>CDMX</option>
            <option>Todo México</option>
          </select>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">Nivel mínimo</div>
          <select className="input mt-2 text-amber" value={minStars} onChange={(e) => setMinStars(+e.target.value)}>
            {[3, 4, 5].map((n) => <option key={n} value={n}>{"★".repeat(n)} o más</option>)}
          </select>
          <label className="mt-5 flex items-center gap-2">
            <input type="checkbox" className="accent-amber h-4 w-4" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} />
            Disponible 6 al 8 nov
          </label>
          <label className="mt-3 flex items-center gap-2">
            <input type="checkbox" className="accent-amber h-4 w-4" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} />
            Solo verificados
          </label>
        </aside>
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3 content-start">
          {list.map((t) => <TechCard key={t.id} t={t} />)}
          {list.length === 0 && <div className="card p-8 text-center text-muted md:col-span-2">No hay técnicos con esos filtros. Prueba quitar alguno.</div>}
        </div>
      </div>
    </>
  );
}
