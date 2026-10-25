import Link from "next/link";
import { Plus } from "lucide-react";
import { events } from "@/lib/data";
import { PageTitle } from "@/components/ui";
import { EventRow } from "@/components/event-row";

export default function Eventos() {
  return (
    <>
      <PageTitle title="Eventos">
        <Link href="/empresa/eventos/nuevo" className="btn btn-amber"><Plus size={16} /> Crear evento</Link>
      </PageTitle>
      <div className="flex flex-col gap-3">
        {events.map((e) => (
          <EventRow key={e.id} e={e} href={`/empresa/eventos/${e.id}`} />
        ))}
      </div>
    </>
  );
}
