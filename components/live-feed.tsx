"use client";

import { useState } from "react";
import { Avatar } from "./ui";

export function LiveFeed() {
  const [accepted, setAccepted] = useState(false);
  const items = [
    { who: "Marco Treviño", text: "aceptó Ingeniero de audio en Gira Noreste.", when: "hace 14 min" },
    { who: "Rogelio Villa", text: "rechazó: tiene otro evento esas fechas.", when: "hace 40 min" },
    { who: "Ana Paredes", text: "se postuló a Rigger en Festival Orilla.", when: "hace 1 h" },
  ];
  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <span className="h-2 w-2 rounded-full bg-ok animate-pulse" /> Respuestas en tiempo real
      </div>
      <div className="flex flex-col divide-y divide-line">
        <div className="flex gap-3 py-3">
          <Avatar name="Lucía Cantú" size={34} />
          <div className="text-sm">
            <b>Lucía Cantú</b> contraofertó $3,500 por evento para Técnico de audio.
            <div className="font-mono text-xs text-dim mt-1">hace 2 min</div>
            {accepted ? (
              <div className="mt-2 text-xs text-ok">Aceptaste $3,500. Lucía queda confirmada.</div>
            ) : (
              <div className="mt-2 flex gap-2">
                <button onClick={() => setAccepted(true)} className="btn btn-amber !py-1.5 !px-3 !text-xs">Aceptar $3,500</button>
                <button className="btn btn-ghost !py-1.5 !px-3 !text-xs">Responder</button>
              </div>
            )}
          </div>
        </div>
        {items.map((i) => (
          <div key={i.who} className="flex gap-3 py-3">
            <Avatar name={i.who} size={34} />
            <div className="text-sm">
              <b>{i.who}</b> {i.text}
              <div className="font-mono text-xs text-dim mt-1">{i.when}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
