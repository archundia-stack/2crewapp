import { payouts } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Badge, statusTone } from "@/components/ui";

export default function MisPagos() {
  const mine = payouts.filter((p) => p.tech === "Daniela Ruiz");
  const pending = mine.find((p) => p.status === "Por liberar");
  return (
    <>
      <h1 className="font-display text-5xl font-bold">Mis pagos</h1>
      <div className="mt-4 rounded-2xl bg-ink p-5 text-black">
        <div className="text-sm text-neutral-600">Próximo depósito · lunes 26 oct</div>
        <div className="font-display text-6xl font-bold">$7,500</div>
        <div className="text-sm text-neutral-600">Expo Guadalupe · por SPEI a tu cuenta terminación 4821</div>
      </div>
      {pending && (
        <div className="card mt-3 flex items-center justify-between gap-4 p-4">
          <div>
            <div className="font-semibold">Código de liberación</div>
            <div className="text-xs text-muted">{pending.event} · {pending.date}. Al terminar, dáselo al encargado para liberar tu pago.</div>
          </div>
          <span className="shrink-0 rounded-lg bg-amber/15 px-3 py-2 font-mono text-lg tracking-widest text-amber">{pending.code}</span>
        </div>
      )}
      <div className="mt-6 mb-3 flex items-center justify-between">
        <h2 className="font-semibold">Historial</h2>
        <span className="text-xs text-muted">Ganado en 2026: $142,300</span>
      </div>
      <div className="card divide-y divide-line">
        {mine.map((p) => (
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
