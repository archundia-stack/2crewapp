"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bell } from "lucide-react";
import { DateChip } from "@/components/ui";

export default function TecnicoInicio() {
  const [available, setAvailable] = useState(true);
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted">Ingeniera de luces · Monterrey</div>
          <h1 className="font-display text-5xl font-bold">Hola, Daniela</h1>
        </div>
        <button aria-label="Notificaciones" className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-2">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber" />
        </button>
      </div>

      <button onClick={() => setAvailable(!available)} className="card mt-5 flex w-full items-center justify-between p-4 text-left">
        <div>
          <div className="font-semibold">Disponible para trabajar</div>
          <div className="text-xs text-muted">{available ? "Las empresas te ven en las búsquedas" : "No apareces en búsquedas nuevas"}</div>
        </div>
        <span className={`flex h-7 w-12 items-center rounded-full p-1 transition ${available ? "bg-ok justify-end" : "bg-line-2 justify-start"}`}>
          <span className="h-5 w-5 rounded-full bg-white" />
        </span>
      </button>

      <Link href="/tecnico/ofertas/o1" className="mt-4 block rounded-2xl bg-ink p-5 text-black">
        <div className="flex items-center justify-between">
          <span className="rounded bg-amber px-2 py-0.5 font-mono text-[11px] font-semibold">INVITACIÓN NUEVA</span>
          <span className="font-mono text-xs text-neutral-600">Responde en 1:42 h</span>
        </div>
        <div className="mt-3 font-display text-4xl font-bold">Gira Noreste 2026</div>
        <div className="text-sm text-neutral-600">Arena Monterrey · 6 al 8 nov · Llamado 07:00</div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-xs text-neutral-600">Pago sugerido</div>
            <div className="font-mono text-sm">M $1,500 · E $3,000 ×2</div>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold">Ver oferta <ArrowRight size={15} /></span>
        </div>
      </Link>

      <div className="mt-6 mb-3 flex items-center justify-between">
        <h2 className="font-semibold">Confirmados</h2>
        <Link href="/tecnico/agenda" className="text-sm text-muted">Ver agenda</Link>
      </div>
      <div className="flex flex-col gap-3">
        <div className="card flex items-center gap-3 p-3">
          <DateChip month="OCT" day="30" />
          <div><div className="font-semibold">Showcase Rock · Foro Fundidora</div><div className="text-xs text-muted">Ingeniera de luces · Llamado 14:00</div></div>
        </div>
        <div className="card flex items-center gap-3 p-3">
          <DateChip month="NOV" day="14" />
          <div><div className="font-semibold">Festival Orilla</div><div className="text-xs text-muted">Programación grandMA3 · 2 montajes + 3 eventos</div></div>
        </div>
      </div>

      <Link href="/tecnico/pagos" className="card mt-4 flex items-center justify-between p-4">
        <div>
          <div className="text-xs text-muted">Por cobrar el lunes 26 oct</div>
          <div className="font-display text-4xl font-bold">$7,500</div>
        </div>
        <span className="text-sm font-semibold text-amber">Mis pagos</span>
      </Link>
    </>
  );
}
