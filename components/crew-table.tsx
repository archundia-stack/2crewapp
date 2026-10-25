import { techById, type CrewAssignment } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Badge, Stars, statusTone } from "./ui";

export function CrewTable({ crew }: { crew: CrewAssignment[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-muted">
            <th className="p-3 font-medium">Puesto</th>
            <th className="p-3 font-medium">Técnico</th>
            <th className="p-3 font-medium">Origen</th>
            <th className="p-3 font-medium">Estado</th>
            <th className="p-3 font-medium">Pago</th>
            <th className="p-3 font-medium">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {crew.map((c) => {
            const t = techById(c.techId);
            return (
              <tr key={c.role + c.techId} className="border-b border-line last:border-0">
                <td className="p-3">{c.role}</td>
                <td className="p-3 font-semibold">
                  {t.name}
                  {t.nickname && <span className="text-muted font-normal"> “{t.nickname}”</span>}
                </td>
                <td className="p-3 text-muted">{c.origin}{c.origin === "New Crew" ? ` · ${t.city}` : ""}</td>
                <td className="p-3"><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                <td className="p-3 font-mono text-xs whitespace-nowrap">
                  {c.rateM > 0 && <>M {mxn(c.rateM)} · </>}E {mxn(c.rateE)}
                </td>
                <td className="p-3"><Stars n={t.stars} black={t.black} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
