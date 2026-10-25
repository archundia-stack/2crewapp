import Link from "next/link";
import { companies, events, incomingSpei, payouts, technicians, COMMISSION } from "@/lib/data";
import { mxn, mxnK } from "@/lib/format";
import { Badge, PageTitle, SectionTitle, Stat, statusTone } from "@/components/ui";

const months = [
  { m: "may", v: 180 }, { m: "jun", v: 260 }, { m: "jul", v: 310 }, { m: "ago", v: 420 }, { m: "sep", v: 560 }, { m: "oct", v: 690 },
];

export default function AdminResumen() {
  const gmv = companies.reduce((s, c) => s + c.gmv, 0);
  const retained = events.filter((e) => e.paymentStatus === "Retenido").reduce((s, e) => s + e.total, 0);
  const toDisperse = payouts.filter((p) => p.status === "Liberado").reduce((s, p) => s + p.amount, 0);
  const pendingKyc = companies.filter((c) => c.status !== "Verificada").length + technicians.filter((t) => !t.verified).length;
  const maxV = Math.max(...months.map((x) => x.v));
  return (
    <>
      <PageTitle kicker="Domingo 25 oct 2026" title="Resumen 2Crew">
        <Link href="/admin/pagos" className="btn btn-amber">Conciliar SPEI</Link>
      </PageTitle>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Contratado en 2026 (GMV)" value={mxnK(gmv)} note="+23% vs. septiembre" tone="ok" />
        <Stat label="Comisión 2Crew (10%)" value={mxnK(Math.round((gmv * COMMISSION) / (1 + COMMISSION)))} note="Ingreso de la plataforma" />
        <Stat label="Resguardado hoy" value={mxnK(retained)} note="Depósitos SPEI retenidos" tone="amber" />
        <Stat label="Por dispersar el lunes" value={mxn(toDisperse)} note="Pagos ya liberados con código" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="card p-5">
          <SectionTitle title="Contratado por mes (miles MXN)" />
          <div className="flex h-48 items-end gap-3">
            {months.map((x) => (
              <div key={x.m} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-xs text-muted">{x.v}</span>
                <div className="w-full rounded-t-md bg-amber" style={{ height: `${(x.v / maxV) * 140}px` }} />
                <span className="text-xs text-muted">{x.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <SectionTitle title="Pendientes">
            <span className="text-xs text-muted">{pendingKyc + 2} por revisar</span>
          </SectionTitle>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex justify-between gap-3"><Link href="/admin/pagos" className="hover:text-amber">SPEI con monto distinto · Los Lobos del Norte</Link><Badge tone="bad">Revisar</Badge></li>
            <li className="flex justify-between gap-3"><Link href="/admin/pagos" className="hover:text-amber">Showcase Rock · 1 código sin capturar</Link><Badge tone="info">Por liberar</Badge></li>
            <li className="flex justify-between gap-3"><Link href="/admin/empresas" className="hover:text-amber">2 empresas esperan verificación</Link><Badge tone="amber">KYC</Badge></li>
            <li className="flex justify-between gap-3"><Link href="/admin/tecnicos" className="hover:text-amber">{technicians.filter((t) => !t.verified).length} técnicos sin verificar identidad</Link><Badge tone="amber">INE</Badge></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle title="Depósitos SPEI recientes"><Link href="/admin/pagos" className="text-sm text-amber">Ver todos</Link></SectionTitle>
          <div className="card divide-y divide-line">
            {incomingSpei.map((s) => (
              <div key={s.reference} className="flex items-center justify-between gap-3 p-3 text-sm">
                <div className="min-w-0"><div className="font-semibold truncate">{s.company}</div><div className="font-mono text-xs text-muted">{s.reference} · {s.when}</div></div>
                <div className="flex flex-col items-end gap-1"><span className="font-mono">{mxn(s.amount)}</span><Badge tone={statusTone(s.status)}>{s.status}</Badge></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle title="Usuarios" />
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Técnicos registrados" value="268" note="Meta año 1: 250" tone="ok" />
            <Stat label="Empresas" value={String(companies.length + 14)} note="3 nuevas esta semana" />
            <Stat label="Eventos este mes" value="23" note="4 en curso" />
            <Stat label="Tasa de aceptación" value="81%" note="Invitaciones aceptadas" />
          </div>
        </div>
      </div>
    </>
  );
}
