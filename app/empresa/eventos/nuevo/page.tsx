"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { COMMISSION, roles, tabulator, type Position } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Badge, PageTitle } from "@/components/ui";

const initial: Position[] = [
  { role: "Production Manager", minStars: 5, rateM: 1800, rateE: 3500, qty: 1, inviteFirst: "Mi Crew" },
  { role: "Ingeniero de audio", minStars: 4, rateM: 1500, rateE: 3000, qty: 2, inviteFirst: "Mi Crew" },
  { role: "Técnico de audio", minStars: 3, rateM: 1200, rateE: 2400, qty: 3, inviteFirst: "New Crew local" },
  { role: "Ingeniero de luces", minStars: 4, rateM: 1500, rateE: 3000, qty: 2, inviteFirst: "Mi Crew" },
  { role: "Rigger certificado", minStars: 4, rateM: 1700, rateE: 2800, qty: 2, inviteFirst: "New Crew local" },
  { role: "Stage Manager", minStars: 4, rateM: 1500, rateE: 3000, qty: 2, inviteFirst: "Mi Crew" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function CrearEvento() {
  const [form, setForm] = useState({
    name: "Gira Noreste 2026",
    venue: "Arena Monterrey",
    city: "Monterrey, N.L.",
    dates: "6 al 8 de noviembre de 2026",
    call: "07:00 · acceso de carga",
    onSite: "Samuel Ortega · Production Manager",
    montajes: 1,
    eventos: 2,
  });
  const [positions, setPositions] = useState<Position[]>(initial);
  const [published, setPublished] = useState(false);

  const people = positions.reduce((s, p) => s + p.qty, 0);
  const subtotal = useMemo(
    () => positions.reduce((s, p) => s + p.qty * (p.rateM * form.montajes + p.rateE * form.eventos), 0),
    [positions, form.montajes, form.eventos],
  );
  const commission = Math.round(subtotal * COMMISSION);

  const update = (i: number, patch: Partial<Position>) =>
    setPositions((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));

  const addPosition = () => {
    const used = new Set(positions.map((p) => p.role));
    const next = tabulator.find((t) => !used.has(t.role)) ?? tabulator[0];
    setPositions((ps) => [...ps, { role: next.role, minStars: 4, rateM: next.m[1], rateE: next.e[1], qty: 1, inviteFirst: "Mi Crew" }]);
  };

  const setRole = (i: number, role: string) => {
    const t = tabulator.find((x) => x.role === role)!;
    update(i, { role, rateM: t.m[1], rateE: t.e[1] });
  };

  if (published) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ok/15 text-ok"><Check /></div>
        <h1 className="mt-6 font-display text-5xl font-bold">{form.name} publicado</h1>
        <p className="mt-3 text-muted">
          Tu Mi Crew ya recibió la invitación. Para confirmar el crew deposita <b className="text-ink">{mxn(subtotal + commission)}</b> por
          SPEI con la referencia del evento.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/empresa/pagos" className="btn btn-amber">Ver datos SPEI</Link>
          <Link href="/empresa/eventos/gira-noreste-2026" className="btn btn-ghost">Ver evento</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link href="/empresa/eventos" className="text-sm text-amber">← Eventos</Link>
      <PageTitle title="Crear evento">
        <button className="btn btn-ghost">Guardar borrador</button>
        <button onClick={() => setPublished(true)} className="btn btn-amber">Publicar y avisar al crew</button>
      </PageTitle>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <section className="card p-5">
            <h2 className="mb-4 font-semibold">1 · Datos del evento</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Artista o evento"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
              <Field label="Venue"><input className="input" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} /></Field>
              <Field label="Ciudad"><input className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
              <Field label="Fechas"><input className="input" value={form.dates} onChange={(e) => setForm({ ...form, dates: e.target.value })} /></Field>
              <Field label="Llamado"><input className="input" value={form.call} onChange={(e) => setForm({ ...form, call: e.target.value })} /></Field>
              <Field label="Encargado en sitio"><input className="input" value={form.onSite} onChange={(e) => setForm({ ...form, onSite: e.target.value })} /></Field>
              <Field label="Días de montaje"><input type="number" min={0} className="input" value={form.montajes} onChange={(e) => setForm({ ...form, montajes: Math.max(0, +e.target.value) })} /></Field>
              <Field label="Días de evento"><input type="number" min={1} className="input" value={form.eventos} onChange={(e) => setForm({ ...form, eventos: Math.max(1, +e.target.value) })} /></Field>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted">Archivos para el crew</span>
              <span className="rounded-md bg-panel-2 px-2 py-1 font-mono text-xs">rider_tecnico.pdf</span>
              <span className="rounded-md bg-panel-2 px-2 py-1 font-mono text-xs">plot_luces.pdf</span>
              <button className="rounded-md border border-dashed border-amber/50 px-2 py-1 text-xs text-amber">+ Subir archivo</button>
            </div>
          </section>

          <section className="card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold">2 · Puestos que necesitas</h2>
              <span className="text-xs text-muted">Sueldo sugerido según tabulador 2Crew</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="text-left text-muted">
                    <th className="pb-3 font-medium">Puesto</th>
                    <th className="pb-3 font-medium">Nivel mínimo</th>
                    <th className="pb-3 font-medium">Montaje</th>
                    <th className="pb-3 font-medium">Evento</th>
                    <th className="pb-3 font-medium">Cantidad</th>
                    <th className="pb-3 font-medium">Invitar primero</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {positions.map((p, i) => (
                    <tr key={i} className="border-t border-line">
                      <td className="py-2.5 pr-2">
                        <select className="input !py-1.5" value={p.role} onChange={(e) => setRole(i, e.target.value)}>
                          {roles.map((r) => <option key={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="py-2.5 pr-2">
                        <select className="input !py-1.5 text-amber" value={p.minStars} onChange={(e) => update(i, { minStars: +e.target.value })}>
                          {[3, 4, 5].map((n) => <option key={n} value={n}>{"★".repeat(n)}</option>)}
                        </select>
                      </td>
                      <td className="py-2.5 pr-2"><input className="input !py-1.5 w-24 font-mono" type="number" value={p.rateM} onChange={(e) => update(i, { rateM: +e.target.value })} /></td>
                      <td className="py-2.5 pr-2"><input className="input !py-1.5 w-24 font-mono" type="number" value={p.rateE} onChange={(e) => update(i, { rateE: +e.target.value })} /></td>
                      <td className="py-2.5 pr-2">
                        <div className="inline-flex items-center rounded-lg border border-line-2">
                          <button aria-label="Menos" className="px-2 py-1.5" onClick={() => update(i, { qty: Math.max(1, p.qty - 1) })}><Minus size={14} /></button>
                          <span className="w-6 text-center font-mono">{p.qty}</span>
                          <button aria-label="Más" className="px-2 py-1.5" onClick={() => update(i, { qty: p.qty + 1 })}><Plus size={14} /></button>
                        </div>
                      </td>
                      <td className="py-2.5 pr-2">
                        <button onClick={() => update(i, { inviteFirst: p.inviteFirst === "Mi Crew" ? "New Crew local" : "Mi Crew" })}>
                          <Badge tone={p.inviteFirst === "Mi Crew" ? "ok" : "info"}>{p.inviteFirst}</Badge>
                        </button>
                      </td>
                      <td className="py-2.5 text-right">
                        <button aria-label="Quitar puesto" className="text-dim hover:text-bad" onClick={() => setPositions((ps) => ps.filter((_, j) => j !== i))}><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={addPosition} className="mt-4 rounded-lg border border-dashed border-amber/50 px-3 py-2 text-sm text-amber">+ Agregar puesto</button>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-5">
            <div className="font-semibold">Resumen del costo</div>
            <div className="mt-4 flex justify-between gap-4 text-sm text-muted">
              <span>{people} personas · {form.montajes} montaje{form.montajes !== 1 ? "s" : ""} + {form.eventos} evento{form.eventos !== 1 ? "s" : ""}</span>
              <span className="font-mono text-ink">{mxn(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-muted"><span>Comisión 2Crew (10%)</span><span className="font-mono text-ink">{mxn(commission)}</span></div>
            <div className="my-4 border-t border-line" />
            <div className="flex items-end justify-between"><span className="text-sm">Total estimado</span><span className="font-display text-4xl font-bold">{mxn(subtotal + commission)}</span></div>
            <p className="mt-3 text-xs text-muted">
              Se paga en un solo depósito SPEI al confirmar el crew. Cada técnico recibe su pago la semana siguiente al evento.
            </p>
          </div>
          <div className="rounded-[14px] border border-amber/30 bg-amber/5 p-5">
            <div className="font-semibold text-amber">Crew local primero</div>
            <p className="mt-2 text-sm text-muted">
              Hay 18 técnicos disponibles en {form.city.split(",")[0]} para estas fechas. Invitarlos antes que a crew de CDMX evita
              traslados y viáticos.
            </p>
            <Link href="/empresa/buscar" className="mt-3 inline-block text-sm font-semibold text-amber">Ver técnicos locales →</Link>
          </div>
          <div className="card p-5">
            <div className="font-semibold">Qué pasa al publicar</div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
              <li>Tu Mi Crew recibe la invitación al instante.</li>
              <li>Si alguien no responde en 2 horas, se abre a New Crew de la ciudad.</li>
              <li>Los técnicos aceptan, rechazan o contraofertan desde la app.</li>
              <li>Depositas por SPEI y el pago queda resguardado hasta el código de liberación.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
