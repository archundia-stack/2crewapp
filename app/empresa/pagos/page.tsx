import { Copy, Landmark } from "lucide-react";
import { events } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Badge, PageTitle, SectionTitle, statusTone } from "@/components/ui";

export default function PagosEmpresa() {
  const mine = events.filter((e) => e.company === "2Crew Producciones");
  const pending = mine.find((e) => e.paymentStatus === "Esperando SPEI");
  return (
    <>
      <PageTitle title="Pagos" />
      {pending && (
        <div className="card mb-8 grid gap-6 p-6 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2 text-amber"><Landmark size={18} /> <span className="font-semibold">Depósito pendiente · {pending.name}</span></div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
              <div><div className="text-dim text-xs">Beneficiario</div><div className="font-medium">2crew entertainment S.A. de C.V.</div></div>
              <div><div className="text-dim text-xs">CLABE</div><div className="font-mono">646 180 0000 0000 0000</div></div>
              <div><div className="text-dim text-xs">Referencia (obligatoria)</div><div className="font-mono">2C-FO26-1411</div></div>
            </div>
            <p className="mt-4 text-xs text-muted">
              Transfiere por SPEI desde la cuenta de tu empresa. Con la referencia identificamos el evento automáticamente; el
              crew se confirma en cuanto llega el depósito. Solo aceptamos transferencia, no tarjeta.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="font-display text-5xl font-bold">{mxn(pending.total)}</div>
            <div className="text-xs text-muted">Vence 7 nov · incluye comisión 10%</div>
            <button className="btn btn-ghost"><Copy size={15} /> Copiar datos</button>
          </div>
        </div>
      )}
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
                <td className="p-3"><Badge tone={statusTone(e.paymentStatus)}>{e.paymentStatus}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-dim">
        Retenido: 2Crew resguarda el depósito hasta que cada técnico entrega su código. Por liberar: el evento terminó y faltan
        códigos. Dispersado: los técnicos ya recibieron su pago. Tu CFDI llega por correo al confirmar el depósito.
      </p>
    </>
  );
}
