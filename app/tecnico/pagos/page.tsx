"use client";

import { useEffect } from "react";
import { Clock, ShieldCheck } from "lucide-react";
import { payouts } from "@/lib/data";
import { mxn } from "@/lib/format";
import { DEMO_TECH_ID, demo, useDemo } from "@/lib/demo-store";
import { Badge, statusTone } from "@/components/ui";

export default function MisPagos() {
  const s = useDemo();
  const me = s.crew.find((c) => c.techId === DEMO_TECH_ID)!;
  const history = payouts.filter((p) => p.tech === "Daniela Ruiz");
  const secured = s.stage === "retenido";

  useEffect(() => {
    if (secured && !s.techSawCode) demo.techSaw();
  }, [secured, s.techSawCode]);

  const giraLabel = !secured ? "Esperando depósito" : me.status === "resguardado" ? "Asegurado" : me.status === "liberado" ? "Por depositar" : "Pagado";
  const giraTone = !secured ? "amber" : me.status === "resguardado" ? "ok" : me.status === "liberado" ? "info" : "ok";

  return (
    <>
      <h1 className="font-display text-5xl font-bold">Mis pagos</h1>

      <div className="mt-4 rounded-2xl bg-ink p-5 text-black">
        {me.status === "dispersado" ? (
          <>
            <div className="text-sm text-neutral-600">Depositado hoy · Gira Noreste 2026</div>
            <div className="font-display text-6xl font-bold">{mxn(me.amount)}</div>
            <div className="text-sm text-neutral-600">por SPEI a tu cuenta terminación 4821</div>
          </>
        ) : (
          <>
            <div className="text-sm text-neutral-600">Próximo depósito · lunes 26 oct</div>
            <div className="font-display text-6xl font-bold">$7,500</div>
            <div className="text-sm text-neutral-600">Expo Guadalupe · por SPEI a tu cuenta terminación 4821</div>
          </>
        )}
      </div>

      <div className="card mt-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold">Gira Noreste 2026</div>
          <span className="font-mono">{mxn(me.amount)}</span>
        </div>
        {!secured ? (
          <p className="mt-2 flex gap-2 text-xs text-amber">
            <Clock size={14} className="shrink-0" /> La empresa todavía no deposita. Te avisamos en cuanto tu pago quede asegurado;
            tu código aparece aquí.
          </p>
        ) : (
          <>
            <p className="mt-2 flex gap-2 text-xs text-ok">
              <ShieldCheck size={14} className="shrink-0" /> Pago seguro: la empresa ya depositó y 2Crew lo tiene resguardado.
            </p>
            {me.status === "resguardado" ? (
              <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-bg p-3">
                <div className="text-xs text-muted">Tu código de liberación. Al terminar el evento dáselo a Samuel Ortega (encargado).</div>
                <span className="shrink-0 rounded-lg bg-amber/15 px-3 py-2 font-mono text-lg tracking-widest text-amber">{me.code}</span>
              </div>
            ) : (
              <p className="mt-2 text-xs text-muted">
                {me.status === "liberado" ? "El encargado ya capturó tu código. Recibes tu pago en la próxima dispersión." : "Ya se depositó a tu cuenta."}
              </p>
            )}
          </>
        )}
      </div>

      <div className="mb-3 mt-6 flex items-center justify-between">
        <h2 className="font-semibold">Historial</h2>
        <span className="text-xs text-muted">Ganado en 2026: $142,300</span>
      </div>
      <div className="card divide-y divide-line">
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="font-semibold">Gira Noreste 2026</div>
            <div className="text-xs text-muted">6 al 8 nov</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono">{mxn(me.amount)}</span>
            <Badge tone={giraTone}>{giraLabel}</Badge>
          </div>
        </div>
        {history.map((p) => (
          <div key={p.event + p.date} className="flex items-center justify-between p-4">
            <div>
              <div className="font-semibold">{p.event}</div>
              <div className="text-xs text-muted">{p.date}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-mono">{mxn(p.amount)}</span>
              <Badge tone={statusTone(p.status)}>{p.status === "Liberado" ? "Por depositar" : p.status === "Dispersado" ? "Pagado" : p.status}</Badge>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-dim">2Crew dispersa tus pagos por SPEI la semana siguiente al evento, una vez liberados con tu código.</p>
    </>
  );
}
