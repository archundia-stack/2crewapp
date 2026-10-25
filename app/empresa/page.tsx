import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { events } from "@/lib/data";
import { PageTitle, SectionTitle, Stat } from "@/components/ui";
import { EventRow } from "@/components/event-row";
import { CrewTable } from "@/components/crew-table";
import { LiveFeed } from "@/components/live-feed";

export default function EmpresaInicio() {
  const mine = events.filter((e) => e.company === "2Crew Producciones");
  const gira = mine[0];
  return (
    <>
      <PageTitle kicker="Domingo 25 oct 2026" title="Hola, 2Crew Producciones">
        <Link href="/empresa/buscar" className="btn btn-ghost"><Search size={16} /> Buscar crew</Link>
        <Link href="/empresa/eventos/nuevo" className="btn btn-amber"><Plus size={16} /> Crear evento</Link>
      </PageTitle>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Eventos activos" value="4" note="2 esta semana" />
        <Stat label="Puestos por cubrir" value="15" note="7 con candidatos" tone="amber" />
        <Stat label="Crew confirmado" value="31" note="+6 en las últimas 24 h" tone="ok" />
        <Stat label="Por depositar (SPEI)" value="$215k" note="Festival Orilla · vence 7 nov" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <SectionTitle title="Próximos eventos">
            <Link href="/empresa/eventos" className="text-sm text-amber">Ver todos</Link>
          </SectionTitle>
          <div className="flex flex-col gap-3">
            {events.slice(0, 3).map((e) => (
              <EventRow key={e.id} e={e} href={`/empresa/eventos/${e.id}`} />
            ))}
          </div>

          <div className="mt-8">
            <SectionTitle title={`${gira.name} · Crew`}>
              <span className="text-xs text-muted">Pago sugerido M = montaje · E = evento</span>
            </SectionTitle>
            <CrewTable crew={gira.crew} />
          </div>
        </div>
        <div><LiveFeed /></div>
      </div>
    </>
  );
}
