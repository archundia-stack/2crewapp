import Link from "next/link";
import { techById } from "@/lib/data";
import { Avatar, Badge, Stars } from "@/components/ui";

export default function Perfil() {
  const t = techById("t4");
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <Avatar name={t.name} size={84} />
        <h1 className="mt-3 font-display text-4xl font-bold">{t.name}</h1>
        <div className="text-sm text-muted">{t.role} · {t.city}</div>
        <div className="mt-2"><Stars n={t.stars} black={t.black} /></div>
        <div className="mt-2"><Badge tone="ok">Identidad verificada</Badge></div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        <div className="card p-3"><div className="font-display text-3xl font-bold">{t.events}</div><div className="text-xs text-muted">eventos</div></div>
        <div className="card p-3"><div className="font-display text-3xl font-bold">4.9</div><div className="text-xs text-muted">calificación</div></div>
        <div className="card p-3"><div className="font-display text-3xl font-bold">3</div><div className="text-xs text-muted">Mi Crew de</div></div>
      </div>
      <div className="card mt-4 p-4">
        <div className="font-semibold">Equipo que dominas</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.skills.map((s) => <span key={s} className="rounded-md bg-panel-2 px-2 py-1 text-xs">{s}</span>)}
        </div>
      </div>
      <div className="card mt-3 divide-y divide-line text-sm">
        {[
          ["Cuenta para pagos", "CLABE •••• 4821"],
          ["RFC", "RUDD920314XX1"],
          ["Constancia de situación fiscal", "Cargada"],
          ["Radio de trabajo", "Monterrey + 100 km"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between p-4"><span className="text-muted">{k}</span><span>{v}</span></div>
        ))}
      </div>
      <Link href="/encargado" className="btn btn-ghost mt-6 w-full">Modo encargado en sitio</Link>
      <Link href="/entrar" className="btn btn-ghost mt-2 w-full">Cambiar de rol</Link>
    </>
  );
}
