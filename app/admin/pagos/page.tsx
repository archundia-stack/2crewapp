"use client";

import { useState } from "react";
import { Check, KeyRound, Send } from "lucide-react";
import { incomingSpei, payouts as seed, type Payout } from "@/lib/data";
import { mxn } from "@/lib/format";
import { DEMO_REFERENCE, crewSubtotal, demo, demoCommission, demoEventStatus, demoTotal, useDemo, type CrewPay } from "@/lib/demo-store";
import { Badge, PageTitle, SectionTitle, statusTone } from "@/components/ui";
import { DemoLogList } from "@/components/demo-bar";

const crewLabel: Record<CrewPay, string> = { resguardado: "Retenido", liberado: "Liberado", dispersado: "Dispersado" };

export default function AdminPagos() {
  const s = useDemo();
  const [history, setHistory] = useState<Payout[]>(seed);
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const release = () => {
    const hit = demo.release(code);
    if (hit) {
      setCodeMsg({ ok: true, text: `Liberado: ${hit.name} · Gira Noreste 2026 · ${mxn(hit.amount)}` });
      setCode("");
      return;
    }
    const norm = code.trim().toUpperCase().replace(/\s+/g, " ");
    const old = history.find((p) => p.status === "Por liberar" && p.code === norm);
    if (old) {
      setHistory((ps) => ps.map((p) => (p === old ? { ...p, status: "Liberado" } : p)));
      setCodeMsg({ ok: true, text: `Liberado: ${old.tech} · ${old.event} · ${mxn(old.amount)}` });
      setCode("");
      return;
    }
    setCodeMsg({
      ok: false,
      text: s.stage !== "retenido" ? "Primero debe llegar y conciliarse el depósito del evento." : "Ese código no corresponde a ningún pago por liberar.",
    });
  };

  const demoReady = s.crew.filter((c) => c.status === "liberado");
  const histReady = history.filter((p) => p.status === "Liberado");
  const batch = demoReady.reduce((a, c) => a + c.amount, 0) + histReady.reduce((a, p) => a + p.amount, 0);
  const batchCount = demoReady.length + histReady.length;
  const disperse = () => {
    demo.disperse();
    setHistory((ps) => ps.map((p) => (p.status === "Liberado" ? { ...p, status: "Dispersado" } : p)));
  };

  const demoStatus = demoEventStatus(s);
  const dispersed = s.crew.filter((c) => c.status === "dispersado").reduce((a, c) => a + c.amount, 0);
  const allDone = s.crew.every((c) => c.status === "dispersado");

  return (
    <>
      <PageTitle kicker="Solo transferencia SPEI · sin tarjeta" title="Pagos SPEI" />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["1", "Depósito", "La empresa transfiere con su referencia"],
          ["2", "Resguardo", "Se concilia y queda retenido por evento"],
          ["3", "Liberación", "Código del técnico al terminar"],
          ["4", "Dispersión", "SPEI a cada técnico la semana siguiente"],
        ].map(([n, t, d]) => (
          <div key={n} className="card p-4">
            <div className="font-mono text-xs text-amber">0{n}</div>
            <div className="mt-1 font-semibold">{t}</div>
            <div className="text-xs text-muted">{d}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SectionTitle title="Depósitos entrantes (conciliación)" />
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="p-3 font-medium">Empresa</th>
                <th className="p-3 font-medium">Evento</th>
                <th className="p-3 font-medium">Referencia</th>
                <th className="p-3 font-medium">Monto</th>
                <th className="p-3 font-medium">Estado</th>
                <th className="p-3 font-medium">Cuándo</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b border-line ${s.stage === "recibido" ? "bg-amber/5" : ""}`}>
                <td className="p-3 font-semibold">2Crew Producciones</td>
                <td className="p-3">Gira Noreste 2026</td>
                <td className="p-3 font-mono text-xs">{DEMO_REFERENCE}</td>
                <td className="p-3 font-mono">{mxn(demoTotal)}</td>
                <td className="p-3">
                  {s.stage === "pendiente" && <Badge tone="amber">Esperando</Badge>}
                  {s.stage === "recibido" && <Badge tone="info">Recibido · por conciliar</Badge>}
                  {s.stage === "retenido" && <Badge tone="ok">Conciliado</Badge>}
                </td>
                <td className="p-3 text-muted">{s.stage === "pendiente" ? "vence 30 oct" : s.log.findLast((l) => l.who === "Empresa")?.at ?? "hoy"}</td>
                <td className="p-3 text-right">
                  {s.stage === "recibido" && (
                    <button onClick={() => demo.reconcile()} className="btn btn-amber !py-1.5 !text-xs">Conciliar</button>
                  )}
                </td>
              </tr>
              {incomingSpei.map((i) => (
                <tr key={i.reference} className="border-b border-line last:border-0">
                  <td className="p-3 font-semibold">{i.company}</td>
                  <td className="p-3">{i.event}</td>
                  <td className="p-3 font-mono text-xs">{i.reference}</td>
                  <td className="p-3 font-mono">{mxn(i.amount)}</td>
                  <td className="p-3"><Badge tone={statusTone(i.status)}>{i.status}</Badge></td>
                  <td className="p-3 text-muted">{i.when}</td>
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-dim">
          Conciliar = comprobar que el SPEI trae la referencia y el monto del evento. En producción STP avisa cada depósito por
          webhook y la conciliación es automática; aquí se hace con un clic para la demo.
        </p>
      </div>

      {s.stage === "retenido" && (
        <div className="mt-8">
          <SectionTitle title="Reparto del depósito · Gira Noreste 2026">
            <Badge tone={statusTone(demoStatus)}>{demoStatus}</Badge>
          </SectionTitle>
          <div className="card grid gap-px overflow-hidden bg-line sm:grid-cols-4">
            {[
              ["Depósito de la empresa", mxn(demoTotal), "text-ink"],
              ["Para el crew (no es ingreso de 2Crew)", mxn(crewSubtotal), "text-ink"],
              ["Comisión 2Crew (ingreso)", mxn(demoCommission), "text-amber"],
              ["Ya dispersado", mxn(dispersed), "text-ok"],
            ].map(([k, v, c]) => (
              <div key={k} className="bg-panel p-4">
                <div className="text-xs text-dim">{k}</div>
                <div className={`font-display text-3xl font-bold ${c}`}>{v}</div>
              </div>
            ))}
          </div>
          {allDone && (
            <p className="mt-2 flex items-center gap-1 text-sm text-ok">
              <Check size={15} /> Evento cerrado. Se emite CFDI a la empresa solo por la comisión de {mxn(demoCommission)}.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <SectionTitle title="Pagos a técnicos" />
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th className="p-3 font-medium">Técnico</th>
                  <th className="p-3 font-medium">Evento</th>
                  <th className="p-3 font-medium">Cuenta</th>
                  <th className="p-3 font-medium">Monto</th>
                  <th className="p-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {s.stage === "retenido" &&
                  s.crew.map((c) => (
                    <tr key={c.id} className="border-b border-line">
                      <td className="p-3"><div className="font-semibold">{c.name}</div><div className="text-xs text-muted">{c.role}</div></td>
                      <td className="p-3">Gira Noreste 2026<div className="text-xs text-muted">6 al 8 nov</div></td>
                      <td className="p-3 font-mono text-xs">{c.clabe}</td>
                      <td className="p-3 font-mono">{mxn(c.amount)}</td>
                      <td className="p-3"><Badge tone={statusTone(crewLabel[c.status])}>{crewLabel[c.status]}</Badge></td>
                    </tr>
                  ))}
                {history.map((p) => (
                  <tr key={p.tech + p.event + p.date} className="border-b border-line last:border-0">
                    <td className="p-3 font-semibold">{p.tech}</td>
                    <td className="p-3">{p.event}<div className="text-xs text-muted">{p.date}</div></td>
                    <td className="p-3 font-mono text-xs">{p.clabe}</td>
                    <td className="p-3 font-mono">{mxn(p.amount)}</td>
                    <td className="p-3"><Badge tone={statusTone(p.status)}>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 font-semibold"><Send size={17} className="text-amber" /> Dispersión del lunes</div>
            <div className="mt-3 flex justify-between text-sm text-muted"><span>{batchCount} pagos liberados</span><span className="font-mono text-ink">{mxn(batch)}</span></div>
            <button disabled={batchCount === 0} onClick={disperse} className="btn btn-amber mt-4 w-full disabled:opacity-40">
              Enviar lote por SPEI
            </button>
            <p className="mt-3 text-xs text-dim">En producción este botón genera el lote en STP y requiere doble aprobación.</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 font-semibold"><KeyRound size={17} className="text-amber" /> Capturar código (respaldo)</div>
            <p className="mt-1 text-xs text-muted">Normalmente lo captura el encargado en sitio desde su app. Aquí queda como respaldo manual.</p>
            <div className="mt-3 flex gap-2">
              <input className="input font-mono uppercase" placeholder="LUZ 2611" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && release()} />
              <button onClick={release} className="btn btn-amber">Liberar</button>
            </div>
            {codeMsg && <p className={`mt-2 text-xs ${codeMsg.ok ? "text-ok" : "text-bad"}`}>{codeMsg.text}</p>}
          </div>

          <div className="card p-5">
            <SectionTitle title="Bitácora" />
            <DemoLogList />
          </div>
        </div>
      </div>
    </>
  );
}
