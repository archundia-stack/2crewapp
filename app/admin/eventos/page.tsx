import { events } from "@/lib/data";
import { mxn } from "@/lib/format";
import { PageTitle, Progress } from "@/components/ui";
import { EventPayBadge } from "@/components/event-pay-badge";

export default function AdminEventos() {
  return (
    <>
      <PageTitle kicker="Todas las empresas" title="Eventos" />
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="p-3 font-medium">Evento</th>
              <th className="p-3 font-medium">Empresa</th>
              <th className="p-3 font-medium">Fechas</th>
              <th className="p-3 font-medium w-44">Crew</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium">Comisión</th>
              <th className="p-3 font-medium">Pago</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-line last:border-0">
                <td className="p-3"><div className="font-semibold">{e.name}</div><div className="text-xs text-muted">{e.venue} · {e.city}</div></td>
                <td className="p-3">{e.company}</td>
                <td className="p-3 text-muted">{e.dates}</td>
                <td className="p-3"><div className="mb-1 font-mono text-xs">{e.confirmed}/{e.needed}</div><Progress value={e.confirmed} total={e.needed} /></td>
                <td className="p-3 font-mono">{mxn(e.total)}</td>
                <td className="p-3 font-mono text-amber">{mxn(e.total - Math.round(e.total / 1.1))}</td>
                <td className="p-3"><EventPayBadge e={e} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
