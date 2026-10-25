import { technicians } from "@/lib/data";
import { PageTitle } from "@/components/ui";
import { TechCard } from "@/components/tech-card";

export default function MiCrew() {
  const mine = technicians.filter((t) => t.origin === "Mi Crew");
  return (
    <>
      <PageTitle kicker={`${mine.length} técnicos de confianza`} title="Mi Crew" />
      <p className="-mt-3 mb-6 max-w-2xl text-sm text-muted">
        Tu Mi Crew recibe las invitaciones primero cada vez que publicas un evento. Agrega técnicos desde Buscar crew con el
        botón +.
      </p>
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {mine.map((t) => <TechCard key={t.id} t={t} />)}
      </div>
    </>
  );
}
