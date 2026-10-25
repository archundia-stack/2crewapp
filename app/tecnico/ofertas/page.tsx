"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Check, Search } from "lucide-react";
import { offers, eventById } from "@/lib/data";
import { mxn } from "@/lib/format";

const filters = ["Cerca de mí", "Iluminación", "Esta semana", "Pago ≥ $2,500"];

export default function Ofertas() {
  const [on, setOn] = useState<string[]>(["Cerca de mí", "Iluminación"]);
  const toggle = (f: string) => setOn((xs) => (xs.includes(f) ? xs.filter((x) => x !== f) : [...xs, f]));
  return (
    <>
      <div className="flex items-center gap-3">
        <Image src="/logo-2.png" alt="2Crew" width={38} height={38} />
        <div className="flex flex-1 items-center gap-2 rounded-full bg-panel-2 px-4 py-2.5 text-sm text-dim">
          <Search size={16} /> Buscar trabajos
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber text-sm font-bold text-amber-ink">DR</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => toggle(f)}
            className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm ${on.includes(f) ? "border-amber/40 bg-amber/15 text-amber" : "border-line-2"}`}
          >
            {on.includes(f) && <Check size={13} />} {f}
          </button>
        ))}
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold">Ofertas para ti</h1>
      <div className="mt-4 flex flex-col gap-3">
        {offers.map((o, i) => {
          const e = eventById(o.eventId)!;
          const light = i === 0;
          return (
            <Link key={o.id} href={`/tecnico/ofertas/${o.id}`} className={`rounded-2xl p-4 ${light ? "bg-ink text-black" : "card"}`}>
              <div className="flex justify-between font-mono text-[11px] font-semibold uppercase">
                <span>{o.kind}{o.kind === "New Crew" ? ` · a ${o.distanceKm} km` : ""}</span>
                <span className={light ? "text-neutral-600" : "text-muted"}>{o.match}% compatible</span>
              </div>
              <div className="mt-2 text-lg font-semibold">{o.role}</div>
              <div className={`text-sm ${light ? "text-neutral-600" : "text-muted"}`}>{e.name} · {e.venue} · {e.dates}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-sm">{o.rateM > 0 && <>M {mxn(o.rateM)} · </>}E {mxn(o.rateE)}</span>
                <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${light ? "bg-black text-white" : "bg-panel-2"}`}>Ver</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
