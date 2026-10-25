"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import { demo, demoStep, useDemo } from "@/lib/demo-store";

export function DemoBar() {
  const s = useDemo();
  const step = demoStep(s);
  const pathname = usePathname();
  const here = pathname === step.href;
  return (
    <div className="md:sticky top-0 z-40 border-b border-amber/30 bg-[#1d160a]/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-2 text-xs">
        <span className="hidden shrink-0 rounded bg-amber px-1.5 py-0.5 font-mono font-bold text-amber-ink sm:inline">DEMO PAGO</span>
        <div className="flex shrink-0 gap-1" aria-label={`Paso ${step.n} de 6`}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <span key={n} className={`h-1.5 w-4 rounded-full ${n < step.n ? "bg-ok" : n === step.n ? "bg-amber" : "bg-line-2"}`} />
          ))}
        </div>
        <span className="min-w-0 flex-1 truncate text-ink">
          <b className="text-amber">{step.n < 6 ? `Paso ${step.n} · ${step.who}:` : "Paso 6:"}</b> {step.text}
        </span>
        {!here && step.n < 6 && (
          <Link href={step.href} className="flex shrink-0 items-center gap-1 font-semibold text-amber">
            Ir <ArrowRight size={13} />
          </Link>
        )}
        {(step.n > 1 || s.log.length > 0) && (
          <button onClick={() => demo.reset()} className="flex shrink-0 items-center gap-1 text-muted hover:text-ink" title="Reiniciar demo">
            <RotateCcw size={13} /> <span className="hidden sm:inline">Reiniciar</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function DemoLogList({ limit = 8 }: { limit?: number }) {
  const s = useDemo();
  if (s.log.length === 0) return <p className="text-sm text-dim">Todavía no pasa nada. La empresa tiene que depositar primero.</p>;
  return (
    <ol className="flex flex-col gap-3">
      {s.log.slice(0, limit).map((l, i) => (
        <li key={i} className="flex gap-3 text-sm">
          <span className="w-11 shrink-0 font-mono text-xs text-dim pt-0.5">{l.at}</span>
          <span><b className="text-amber">{l.who}</b> <span className="text-muted">{l.text}</span></span>
        </li>
      ))}
    </ol>
  );
}
