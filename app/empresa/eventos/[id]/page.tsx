import Link from "next/link";
import { notFound } from "next/navigation";
import { events, eventById, COMMISSION } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Badge, PageTitle, Progress, SectionTitle, statusTone } from "@/components/ui";
import { CrewTable } from "@/components/crew-table";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventoDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = eventById(id);
  if (!e) notFound();
  const subtotal = Math.round(e.total / (1 + COMMISSION));
  return (
    <>
      <Link href="/empresa/eventos" className="text-sm text-amber">← Eventos</Link>
      <PageTitle title={e.name}>
        <Link href="/empresa/buscar" className="btn btn-ghost">Invitar más crew</Link>
        <Link href="/empresa/pagos" className="btn btn-amber">Ver pago SPEI</Link>
      </PageTitle>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="min-w-0 flex flex-col gap-6">
          <div className="card grid grid-cols-2 gap-px overflow-hidden bg-line md:grid-cols-4">
            {[
              ["Venue", e.venue],
              ["Ciudad", e.city],
              ["Fechas", e.dates],
              ["Llamado", e.callTime],
              ["Montajes", String(e.montajes)],
              ["Eventos", String(e.eventos)],
              ["Encargado en sitio", e.onSite],
              ["Empresa", e.company],
            ].map(([k, v]) => (
              <div key={k} className="bg-panel p-4">
                <div className="text-xs text-dim">{k}</div>
                <div className="font-medium">{v}</div>
              </div>
            ))}
          </div>
          <div>
            <SectionTitle title="Crew">
              <span className="font-mono text-xs">{e.confirmed}/{e.needed} confirmados</span>
            </SectionTitle>
            <div className="mb-4"><Progress value={e.confirmed} total={e.needed} /></div>
            <CrewTable crew={e.crew} />
          </div>
        </div>
        <div className="card h-fit p-5">
          <div className="font-semibold">Pago del evento</div>
          <div className="mt-4 flex justify-between text-sm text-muted"><span>Sueldos del crew</span><span className="font-mono text-ink">{mxn(subtotal)}</span></div>
          <div className="mt-2 flex justify-between text-sm text-muted"><span>Comisión 2Crew (10%)</span><span className="font-mono text-ink">{mxn(e.total - subtotal)}</span></div>
          <div className="my-4 border-t border-line" />
          <div className="flex items-end justify-between"><span className="text-sm">Total</span><span className="font-display text-4xl font-bold">{mxn(e.total)}</span></div>
          <div className="mt-4"><Badge tone={statusTone(e.paymentStatus)}>{e.paymentStatus}</Badge></div>
          <p className="mt-3 text-xs text-muted">
            El depósito queda resguardado por 2Crew. Cada técnico recibe su pago cuando entrega su código de liberación al
            encargado en sitio.
          </p>
        </div>
      </div>
    </>
  );
}
