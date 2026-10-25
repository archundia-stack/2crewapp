import { DateChip, Badge } from "@/components/ui";

const items = [
  { month: "OCT", day: "30", name: "Showcase Rock", where: "Foro Fundidora · Llamado 14:00", role: "Ingeniera de luces", status: "Confirmado" },
  { month: "NOV", day: "06", name: "Gira Noreste 2026", where: "Arena Monterrey · Llamado 07:00", role: "Ingeniera de luces", status: "Por responder" },
  { month: "NOV", day: "14", name: "Festival Orilla", where: "Parque Fundidora · Llamado 05:30", role: "Programación grandMA3", status: "Confirmado" },
];

export default function Agenda() {
  return (
    <>
      <h1 className="font-display text-5xl font-bold">Agenda</h1>
      <p className="mt-1 text-sm text-muted">Tus llamados confirmados y las invitaciones abiertas.</p>
      <div className="mt-5 flex flex-col gap-3">
        {items.map((i) => (
          <div key={i.name} className="card flex items-center gap-3 p-3">
            <DateChip month={i.month} day={i.day} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold">{i.name}</div>
              <div className="text-xs text-muted">{i.where}</div>
              <div className="text-xs text-muted">{i.role}</div>
            </div>
            <Badge tone={i.status === "Confirmado" ? "ok" : "amber"}>{i.status}</Badge>
          </div>
        ))}
      </div>
      <div className="card mt-6 p-4 text-sm">
        <div className="font-semibold">Mi disponibilidad</div>
        <p className="mt-1 text-muted">Bloquea los días que no puedes trabajar para no recibir ofertas en esas fechas.</p>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center font-mono text-xs">
          {Array.from({ length: 28 }, (_, d) => {
            const day = d + 1;
            const busy = [6, 7, 8, 14, 15, 16, 17, 18].includes(day);
            const off = [22, 23].includes(day);
            return (
              <span key={day} className={`rounded-md py-2 ${busy ? "bg-amber/20 text-amber" : off ? "bg-bad/15 text-bad line-through" : "bg-panel-2"}`}>{day}</span>
            );
          })}
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted"><span className="text-amber">■ Con llamado</span><span className="text-bad">■ No disponible</span></div>
      </div>
    </>
  );
}
