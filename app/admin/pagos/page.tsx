"use client";

import { useState } from "react";
import { Check, KeyRound, Send } from "lucide-react";
import { events, incomingSpei, payouts as seed, type Payout } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Badge, PageTitle, SectionTitle, statusTone } from "@/components/ui";

export default function AdminPagos() {
  const [payouts, setPayouts] = useState<Payout[]>(seed);
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [sent, setSent] = useState(false);

  const release = () => {
    const norm = code.trim().toUpperCase().replace(/\s+/g, " ");
    const hit = payouts.find((p) => p.status === "Por liberar" && p.code === norm);
    if (!hit) {
      setCodeMsg({ ok: false, text: "Ese código no corresponde a ningún pago por liberar." });
      return;
    }
    setPayouts((ps) => ps.map((p) => (p === hit ? { ...p, status: "Liberado" } : p)));
    setCodeMsg({ ok: true, text: `Liberado: ${hit.tech} · ${hit.event} · ${mxn(hit.amount)}` });
    setCode("");
  };

  const toSend = payouts.filter((p) => p.status === "Liberado");
  const batch = toSend.reduce((s, p) => s + p.amount, 0);
  const disperse = () => {
    setPayouts((ps) => ps.map((p) => (p.status === "Liberado" ? { ...p, status: "Dispersado" } : p)));
    setSent(true);
  };

  return (
    <>
      <PageTitle kicker="Solo transferencia SPEI · sin tarjeta" title="Pagos SPEI" />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["1", "Depósito", "La empresa transfiere con su referencia"],
          ["2", "Resguardo", "El monto queda retenido por evento"],
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
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="p-3 font-medium">Empresa</th>
                <th className="p-3 font-medium">Evento</th>
                <th className="p-3 font-medium">Referencia</th>
                <th className="p-3 font-medium">Esperado</th>
                <th className="p-3 font-medium">Estado</th>
                <th className="p-3 font-medium">Cuándo</th>
              </tr>
            </thead>
            <tbody>
              {incomingSpei.map((s) => (
                <tr key={s.reference} className="border-b border-line last:border-0">
                  <td className="p-3 font-semibold">{s.company}</td>
                  <td className="p-3">{s.event}</td>
                  <td className="p-3 font-mono text-xs">{s.reference}</td>
                  <td className="p-3 font-mono">{mxn(s.amount)}</td>
                  <td className="p-3"><Badge tone={statusTone(s.status)}>{s.status}</Badge></td>
                  <td className="p-3 text-muted">{s.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-dim">“Monto distinto”: llegó una transferencia con la referencia correcta pero otro importe. Se contacta a la empresa antes de confirmar el crew.</p>
      </div>

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
                {payouts.map((p) => (
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
            <div className="flex items-center gap-2 font-semibold"><KeyRound size={17} className="text-amber" /> Capturar código de liberación</div>
            <p className="mt-1 text-xs text-muted">El encargado en sitio lo captura desde su app; aquí queda como respaldo manual. Prueba con LUZ 7316.</p>
            <div className="mt-3 flex gap-2">
              <input className="input font-mono uppercase" placeholder="LUZ 7316" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && release()} />
              <button onClick={release} className="btn btn-amber">Liberar</button>
            </div>
            {codeMsg && <p className={`mt-2 text-xs ${codeMsg.ok ? "text-ok" : "text-bad"}`}>{codeMsg.text}</p>}
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 font-semibold"><Send size={17} className="text-amber" /> Dispersión del lunes</div>
            <div className="mt-3 flex justify-between text-sm text-muted"><span>{toSend.length} pagos liberados</span><span className="font-mono text-ink">{mxn(batch)}</span></div>
            {sent && toSend.length === 0 ? (
              <p className="mt-3 flex items-center gap-1 text-sm text-ok"><Check size={15} /> Lote enviado por SPEI.</p>
            ) : (
              <button disabled={toSend.length === 0} onClick={disperse} className="btn btn-amber mt-4 w-full disabled:opacity-40">
                Enviar lote por SPEI
              </button>
            )}
            <p className="mt-3 text-xs text-dim">En producción este botón genera el lote en STP y requiere doble aprobación.</p>
          </div>

          <div className="card p-5 text-sm">
            <div className="font-semibold">Resguardado por evento</div>
            {events.filter((e) => e.paymentStatus === "Retenido").map((e) => (
              <div key={e.id} className="mt-3 flex justify-between"><span className="text-muted">{e.name}</span><span className="font-mono">{mxn(e.total)}</span></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
