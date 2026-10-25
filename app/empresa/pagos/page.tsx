"use client";

import { useState } from "react";
import { Check, Copy, Landmark, Send } from "lucide-react";
import { events } from "@/lib/data";
import { mxn } from "@/lib/format";
import { DEMO_REFERENCE, crewSubtotal, demo, demoCommission, demoEventStatus, demoTotal, useDemo } from "@/lib/demo-store";
import { PageTitle, SectionTitle } from "@/components/ui";
import { EventPayBadge } from "@/components/event-pay-badge";
import { DemoLogList } from "@/components/demo-bar";

export default function PagosEmpresa() {
  const s = useDemo();
  const [copied, setCopied] = useState(false);
  const status = demoEventStatus(s);
  const paid = s.crew.filter((c) => c.status === "dispersado").length;

  return (
    <>
      <PageTitle title="Pagos" />

      <div className="card mb-8 grid gap-6 p-6 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2 text-amber">
            <Landmark size={18} />
            <span className="font-semibold">
              {s.stage === "pendiente" ? "Depósito pendiente" : "Depósito enviado"} · Gira Noreste 2026
            </span>
          </div>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
            <div><div className="text-xs text-dim">Beneficiario</div><div className="font-medium">2crew entertainment S.A. de C.V.</div></div>
            <div><div className="text-xs text-dim">CLABE (ejemplo)</div><div className="font-mono">646 180 0000 0000 0000</div></div>
            <div><div className="text-xs text-dim">Referencia (obligatoria)</div><div className="font-mono">{DEMO_REFERENCE}</div></div>
          </div>
          <div className="mt-4 grid max-w-md gap-1 text-sm">
            <div className="flex justify-between text-muted"><span>Sueldos del crew (12 personas)</span><span className="font-mono text-ink">{mxn(crewSubtotal)}</span></div>
            <div className="flex justify-between text-muted"><span>Comisión 2Crew (10%)</span><span className="font-mono text-ink">{mxn(demoCommission)}</span></div>
          </div>
          <p className="mt-4 text-xs text-muted">
            Transfiere por SPEI desde la cuenta de tu empresa. Con la referencia identificamos el evento; el dinero queda
            resguardado y cada técnico cobra hasta que entrega su código al terminar. Solo transferencia, no tarjeta.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div className="font-display text-5xl font-bold">{mxn(demoTotal)}</div>
          <div className="text-xs text-muted">Incluye comisión 10%</div>
          {s.stage === "pendiente" ? (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`CLABE 646180000000000000 · Ref ${DEMO_REFERENCE} · ${demoTotal}`).catch(() => {});
                  setCopied(true);
                }}
                className="btn btn-ghost"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copiado" : "Copiar datos"}
              </button>
              <button onClick={() => demo.deposit()} className="btn btn-amber">
                <Send size={15} /> Simular depósito SPEI
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-1 lg:items-end">
              <EventPayBadge e={events[0]} />
              <span className="text-xs text-muted">
                {s.stage === "recibido" && "2Crew está conciliando tu depósito."}
                {status === "Retenido" && "Depósito confirmado y resguardado. Tu crew ya fue avisado."}
                {status === "Por liberar" && `${s.crew.filter((c) => c.status !== "resguardado").length} de 12 códigos capturados.`}
                {status === "Dispersado" && "Crew pagado. Tu CFDI por la comisión ya está en tu correo."}
              </span>
              {paid > 0 && status !== "Dispersado" && <span className="text-xs text-ok">{paid} técnicos ya cobraron.</span>}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <SectionTitle title="Historial por evento" />
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th className="p-3 font-medium">Evento</th>
                  <th className="p-3 font-medium">Fechas</th>
                  <th className="p-3 font-medium">Crew</th>
                  <th className="p-3 font-medium">Total</th>
                  <th className="p-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-b border-line last:border-0">
                    <td className="p-3 font-semibold">{e.name}</td>
                    <td className="p-3 text-muted">{e.dates}</td>
                    <td className="p-3 font-mono text-xs">{e.confirmed}/{e.needed}</td>
                    <td className="p-3 font-mono">{mxn(e.total)}</td>
                    <td className="p-3"><EventPayBadge e={e} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-dim">
            Retenido: 2Crew resguarda el depósito hasta que cada técnico entrega su código. Por liberar: ya se están capturando
            códigos. Dispersado: los técnicos ya recibieron su pago.
          </p>
        </div>
        <div className="card h-fit p-5">
          <SectionTitle title="Movimientos de Gira Noreste" />
          <DemoLogList />
        </div>
      </div>
    </>
  );
}
