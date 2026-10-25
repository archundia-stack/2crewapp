"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { Technician } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Avatar, Stars } from "./ui";

export function TechCard({ t }: { t: Technician }) {
  const [invited, setInvited] = useState(false);
  const [saved, setSaved] = useState(t.origin === "Mi Crew");
  return (
    <div className="card flex flex-col p-4">
      <div className="flex items-start gap-3">
        <Avatar name={t.name} size={44} />
        <div className="min-w-0 flex-1">
          <div className="font-semibold">
            {t.nickname ? `${t.name.split(" ")[0]} “${t.nickname}” ${t.name.split(" ").slice(1).join(" ")}` : t.name}
          </div>
          <div className="text-sm text-muted">
            {t.role} · {t.city}
            {t.distanceKm && t.distanceKm > 20 ? ` · ${t.distanceKm} km` : ""}
          </div>
        </div>
        <span className="rounded-md bg-ok/12 px-1.5 py-0.5 font-mono text-xs text-ok">{t.match}%</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Stars n={t.stars} black={t.black} /> {t.events} eventos · {saved ? "Mi Crew" : "New Crew"}
        {!t.verified && <span className="text-xs text-amber">· verificación pendiente</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {t.skills.map((s) => (
          <span key={s} className="rounded-md bg-panel-2 px-2 py-0.5 text-xs">{s}</span>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">Últimos empleos: {t.lastJobs.join(", ")}</p>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3 mt-4">
        <span className="font-mono text-xs">M {mxn(t.rateM)} · E {mxn(t.rateE)}</span>
        <div className="flex gap-2">
          <button
            aria-label={saved ? "En Mi Crew" : "Agregar a Mi Crew"}
            title={saved ? "En Mi Crew" : "Agregar a Mi Crew"}
            onClick={() => setSaved(!saved)}
            className="btn btn-ghost !px-2.5"
          >
            {saved ? <Check size={15} className="text-ok" /> : <Plus size={15} />}
          </button>
          <button onClick={() => setInvited(true)} disabled={invited} className={`btn ${invited ? "btn-ghost text-ok" : "btn-amber"}`}>
            {invited ? "Invitado" : "Invitar"}
          </button>
        </div>
      </div>
    </div>
  );
}
