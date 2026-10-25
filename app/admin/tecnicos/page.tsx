"use client";

import { useState } from "react";
import { technicians as seed, type Technician } from "@/lib/data";
import { Badge, PageTitle, Stars } from "@/components/ui";

export default function AdminTecnicos() {
  const [list, setList] = useState<Technician[]>(seed);
  const [filter, setFilter] = useState<"Todos" | "Sin verificar" | "BLACK">("Todos");
  const patch = (id: string, p: Partial<Technician>) => setList((l) => l.map((t) => (t.id === id ? { ...t, ...p } : t)));
  const shown = list.filter((t) => filter === "Todos" || (filter === "BLACK" ? t.black : !t.verified));
  return (
    <>
      <PageTitle kicker={`${list.length} técnicos en la muestra`} title="Técnicos">
        {(["Todos", "Sin verificar", "BLACK"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`btn ${filter === f ? "btn-light" : "btn-ghost"}`}>{f}</button>
        ))}
      </PageTitle>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="p-3 font-medium">Técnico</th>
              <th className="p-3 font-medium">Área</th>
              <th className="p-3 font-medium">Ciudad</th>
              <th className="p-3 font-medium">Eventos</th>
              <th className="p-3 font-medium">Nivel</th>
              <th className="p-3 font-medium">Identidad</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {shown.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-0">
                <td className="p-3"><div className="font-semibold">{t.name}</div><div className="text-xs text-muted">{t.role}</div></td>
                <td className="p-3">{t.area}</td>
                <td className="p-3">{t.city}</td>
                <td className="p-3 font-mono">{t.events}</td>
                <td className="p-3">
                  <select
                    aria-label="Nivel"
                    value={t.stars}
                    onChange={(e) => patch(t.id, { stars: +e.target.value })}
                    className="rounded-md border border-line-2 bg-bg px-1 py-0.5 text-amber"
                  >
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{"★".repeat(n)}</option>)}
                  </select>
                  <div className="mt-1"><Stars n={0} black={t.black} /></div>
                </td>
                <td className="p-3"><Badge tone={t.verified ? "ok" : "amber"}>{t.verified ? "Verificada" : "Pendiente INE"}</Badge></td>
                <td className="p-3 text-right whitespace-nowrap">
                  {!t.verified && <button onClick={() => patch(t.id, { verified: true })} className="btn btn-amber !py-1.5 !text-xs mr-2">Verificar</button>}
                  {t.stars === 5 && (
                    <button onClick={() => patch(t.id, { black: !t.black })} className="btn btn-ghost !py-1.5 !text-xs">
                      {t.black ? "Quitar BLACK" : "Dar BLACK"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-dim">BLACK es el nivel más alto: solo para técnicos de 5 estrellas con historial comprobado.</p>
    </>
  );
}
