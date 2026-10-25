"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, KeyRound, Lock } from "lucide-react";
import { mxn } from "@/lib/format";
import { demo, useDemo } from "@/lib/demo-store";
import { Avatar, Badge } from "@/components/ui";

export default function Encargado() {
  const s = useDemo();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const secured = s.stage === "retenido";
  const pending = s.crew.filter((c) => c.status === "resguardado").length;

  const capture = () => {
    const hit = demo.release(code);
    if (hit) {
      setMsg({ ok: true, text: `Listo: se liberó el pago de ${hit.name} (${mxn(hit.amount)}).` });
      setCode("");
    } else {
      setMsg({ ok: false, text: "Código incorrecto o ya capturado. Pídeselo de nuevo al técnico." });
    }
  };

  return (
    <>
      <Link href="/tecnico" className="text-sm text-amber">‹ App del técnico</Link>
      <div className="mt-3 text-sm text-muted">Modo encargado en sitio · Samuel Ortega</div>
      <h1 className="font-display text-5xl font-bold leading-none">Gira Noreste 2026</h1>
      <div className="mt-1 text-sm text-muted">Arena Monterrey · 6 al 8 nov</div>

      {!secured ? (
        <div className="card mt-5 flex gap-3 p-4 text-sm">
          <Lock size={18} className="shrink-0 text-amber" />
          <div>
            <div className="font-semibold">Todavía no se pueden liberar pagos</div>
            <p className="mt-1 text-muted">La empresa aún no deposita o 2Crew no ha conciliado el SPEI. Cuando el pago quede resguardado podrás capturar los códigos aquí.</p>
          </div>
        </div>
      ) : (
        <div className="card mt-5 p-4">
          <div className="flex items-center gap-2 font-semibold"><KeyRound size={17} className="text-amber" /> Capturar código al terminar</div>
          <p className="mt-1 text-xs text-muted">Cada técnico te dicta el código de su app cuando termina su jornada. Con eso se libera su pago.</p>
          <div className="mt-3 flex gap-2">
            <input
              className="input font-mono text-lg uppercase tracking-widest"
              placeholder="LUZ 2611"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && capture()}
            />
            <button onClick={capture} className="btn btn-amber">Liberar</button>
          </div>
          {msg && <p className={`mt-2 text-xs ${msg.ok ? "text-ok" : "text-bad"}`}>{msg.text}</p>}
          <p className="mt-3 text-xs text-dim">Para la demo: el código de Daniela está en su app, en Pagos.</p>
        </div>
      )}

      <div className="mb-3 mt-6 flex items-center justify-between">
        <h2 className="font-semibold">Crew · {12 - pending}/12 liberados</h2>
        {secured && pending > 0 && (
          <button onClick={() => demo.releaseRest()} className="text-xs font-semibold text-amber">Capturar los demás (demo)</button>
        )}
      </div>
      <div className="card divide-y divide-line">
        {s.crew.map((c) => (
          <div key={c.id} className="flex items-center gap-3 p-3">
            <Avatar name={c.name} size={36} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">{c.name}</div>
              <div className="text-xs text-muted">{c.role}</div>
            </div>
            {c.status === "resguardado" ? (
              <Badge tone={secured ? "amber" : "neutral"}>{secured ? "Falta código" : "Sin depósito"}</Badge>
            ) : (
              <span className="flex items-center gap-1 text-xs text-ok"><Check size={14} /> {c.status === "liberado" ? "Liberado" : "Pagado"}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
