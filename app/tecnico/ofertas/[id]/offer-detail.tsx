"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, MapPin } from "lucide-react";
import type { Offer, ProductionEvent } from "@/lib/data";
import { mxn } from "@/lib/format";
import { DEMO_EVENT_ID, useDemo } from "@/lib/demo-store";

type State = "open" | "accepted" | "rejected" | "countered";

export function OfferDetail({ offer, event }: { offer: Offer; event: ProductionEvent }) {
  const demoState = useDemo();
  const secured = event.id !== DEMO_EVENT_ID || demoState.stage === "retenido";
  const [state, setState] = useState<State>("open");
  const [sheet, setSheet] = useState(false);
  const [m, setM] = useState(offer.rateM);
  const [e, setE] = useState(offer.rateE + 500);
  const [msg, setMsg] = useState("Llevo mi propio tester y lámpara, y programé esta gira el año pasado.");

  const total = offer.rateM * offer.montajes + offer.rateE * offer.eventos;
  const newTotal = m * offer.montajes + e * offer.eventos;
  const min = Math.round(offer.rateE * 0.8);
  const max = Math.round(offer.rateE * 1.4);

  return (
    <>
      <Link href="/tecnico/ofertas" className="text-sm text-amber">‹ Ofertas</Link>
      <div className="mt-4 text-sm text-muted">{offer.role} · {offer.kind === "New Crew" ? "New Crew" : "invitación de Mi Crew"}</div>
      <h1 className="font-display text-5xl font-bold leading-none mt-1">{event.name}</h1>
      <div className="mt-1 text-sm text-muted">{event.company} · ★ 4.8 como empresa</div>

      <div className="card mt-5 grid grid-cols-2 gap-px overflow-hidden bg-line">
        {[
          ["Fechas", event.dates],
          ["Días", `M: ${offer.montajes} · E: ${offer.eventos}`],
          ["Llamado", event.callTime],
          ["Encargado", event.onSite],
          ["Extras", offer.extras],
          ["Consola", offer.console],
        ].map(([k, v]) => (
          <div key={k} className="bg-panel p-3">
            <div className="text-xs text-dim">{k}</div>
            <div className="font-semibold">{v}</div>
          </div>
        ))}
      </div>

      <div className="card mt-3 flex gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-panel-2 text-amber"><MapPin size={18} /></span>
        <div>
          <div className="font-semibold">{event.venue}</div>
          <div className="text-xs text-muted">A {offer.distanceKm} km de ti · {event.city}</div>
        </div>
      </div>

      <div className="card mt-3 p-4">
        <div className="font-semibold">Pago</div>
        {offer.montajes > 0 && (
          <div className="mt-3 flex justify-between text-sm text-muted"><span>Montaje × {offer.montajes}</span><span className="font-mono text-ink">{mxn(offer.rateM * offer.montajes)}</span></div>
        )}
        <div className="mt-2 flex justify-between text-sm text-muted"><span>Evento × {offer.eventos}</span><span className="font-mono text-ink">{mxn(offer.rateE * offer.eventos)}</span></div>
        <div className="my-3 border-t border-line" />
        <div className="flex items-end justify-between"><span className="font-semibold">Total para ti</span><span className="font-display text-4xl font-bold">{mxn(total)}</span></div>
        {secured ? (
          <p className="mt-2 text-xs text-ok">Pago seguro: la empresa ya depositó por SPEI. Lo recibes la semana siguiente al evento.</p>
        ) : (
          <p className="mt-2 text-xs text-amber">La empresa aún no deposita. Antes del evento el pago queda resguardado por 2Crew y aquí verás “Pago seguro”.</p>
        )}
      </div>

      {state !== "open" ? (
        <div className={`mt-5 rounded-xl border p-4 text-sm ${state === "rejected" ? "border-bad/30 bg-bad/10" : "border-ok/30 bg-ok/10"}`}>
          {state === "accepted" && <><Check size={16} className="inline text-ok" /> Aceptaste. Te avisamos los detalles del llamado y aparece en tu agenda.</>}
          {state === "rejected" && <>Rechazaste esta oferta. La empresa ya fue notificada.</>}
          {state === "countered" && <>Enviaste tu contraoferta de <b>{mxn(newTotal)}</b>. Te avisamos cuando la empresa responda.</>}
          <button onClick={() => setState("open")} className="mt-2 block text-xs text-muted underline">Deshacer</button>
        </div>
      ) : (
        <div className="sticky bottom-20 mt-5 grid grid-cols-[auto_auto_1fr] gap-2 bg-bg py-2">
          <button onClick={() => setState("rejected")} className="btn btn-ghost">Rechazar</button>
          <button onClick={() => setSheet(true)} className="btn btn-ghost">Contraofertar</button>
          <button onClick={() => setState("accepted")} className="btn btn-amber">Aceptar</button>
        </div>
      )}

      {sheet && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/70" onClick={() => setSheet(false)}>
          <div className="w-full max-w-md rounded-t-3xl border-t border-line-2 bg-panel p-5 pb-8" onClick={(ev) => ev.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-2" />
            <h2 className="text-xl font-semibold">Proponer otro pago</h2>
            <p className="mt-1 text-sm text-muted">
              Oferta actual: {offer.rateM > 0 && <>M {mxn(offer.rateM)} · </>}E {mxn(offer.rateE)}. La empresa puede aceptar, rechazar o responder con otra cifra.
            </p>
            <div className="mt-4 rounded-xl bg-bg p-3">
              <div className="text-xs text-muted">Tabulador 2Crew · {offer.role} · {event.city}</div>
              <input type="range" min={min} max={max} step={100} value={e} onChange={(x) => setE(+x.target.value)} className="mt-3 w-full accent-amber" />
              <div className="flex justify-between font-mono text-xs text-muted">
                <span>{mxn(min)}</span><span className="text-amber">Tu propuesta {mxn(e)}</span><span>{mxn(max)}</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="rounded-xl border border-line-2 p-3 text-xs text-muted">
                Montaje (por día)
                <input type="number" value={m} onChange={(x) => setM(+x.target.value)} className="mt-1 w-full bg-transparent font-mono text-lg text-ink outline-none" />
              </label>
              <label className="rounded-xl border border-amber p-3 text-xs text-amber">
                Evento (por día)
                <input type="number" value={e} onChange={(x) => setE(+x.target.value)} className="mt-1 w-full bg-transparent font-mono text-lg text-ink outline-none" />
              </label>
            </div>
            <label className="mt-3 block text-xs text-muted">
              Mensaje para la empresa
              <textarea value={msg} onChange={(x) => setMsg(x.target.value)} rows={3} className="input mt-1 text-sm" />
            </label>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-sm text-muted">Nuevo total (M×{offer.montajes} + E×{offer.eventos})</span>
              <span className="font-display text-4xl font-bold">{mxn(newTotal)}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={() => setSheet(false)} className="btn btn-ghost !py-3">Cancelar</button>
              <button onClick={() => { setSheet(false); setState("countered"); }} className="btn btn-amber !py-3">Enviar contraoferta</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
