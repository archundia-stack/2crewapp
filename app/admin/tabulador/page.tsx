"use client";

import { useState } from "react";
import { tabulator } from "@/lib/data";
import { PageTitle } from "@/components/ui";

const levels = ["★★★", "★★★★", "★★★★★"];

export default function Tabulador() {
  const [rows, setRows] = useState(tabulator);
  const [saved, setSaved] = useState(false);
  const set = (i: number, k: "m" | "e", j: number, v: number) => {
    setSaved(false);
    setRows((r) => r.map((row, x) => (x === i ? { ...row, [k]: row[k].map((n, y) => (y === j ? v : n)) } : row)));
  };
  return (
    <>
      <PageTitle kicker="Pago sugerido por día · Monterrey" title="Tabulador 2Crew">
        <button onClick={() => setSaved(true)} className="btn btn-amber">{saved ? "Guardado" : "Guardar cambios"}</button>
      </PageTitle>
      <p className="-mt-3 mb-5 max-w-2xl text-sm text-muted">
        Estos montos se sugieren a las empresas al crear un evento y marcan el rango de la contraoferta del técnico. M = día de
        montaje, E = día de evento.
      </p>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="p-3 font-medium">Puesto</th>
              {levels.map((l) => <th key={"m" + l} className="p-3 font-medium">M <span className="text-amber">{l}</span></th>)}
              {levels.map((l) => <th key={"e" + l} className="p-3 font-medium">E <span className="text-amber">{l}</span></th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.role} className="border-b border-line last:border-0">
                <td className="p-3 font-semibold">{r.role}</td>
                {(["m", "e"] as const).flatMap((k) =>
                  r[k].map((v, j) => (
                    <td key={k + j} className="p-2">
                      <input type="number" step={100} value={v} onChange={(e) => set(i, k, j, +e.target.value)} className="input !py-1.5 w-24 font-mono" />
                    </td>
                  )),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
