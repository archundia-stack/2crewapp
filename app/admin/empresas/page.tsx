"use client";

import { useState } from "react";
import { companies as seed, type Company } from "@/lib/data";
import { mxn } from "@/lib/format";
import { Badge, PageTitle, statusTone } from "@/components/ui";

export default function AdminEmpresas() {
  const [list, setList] = useState<Company[]>(seed);
  const approve = (id: string) => setList((l) => l.map((c) => (c.id === id ? { ...c, status: "Verificada" } : c)));
  return (
    <>
      <PageTitle kicker={`${list.length} empresas`} title="Empresas" />
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="p-3 font-medium">Empresa</th>
              <th className="p-3 font-medium">Tipo</th>
              <th className="p-3 font-medium">RFC</th>
              <th className="p-3 font-medium">Eventos</th>
              <th className="p-3 font-medium">Contratado</th>
              <th className="p-3 font-medium">Estado</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0">
                <td className="p-3"><div className="font-semibold">{c.name}</div><div className="text-xs text-muted">{c.city} · desde {c.since}</div></td>
                <td className="p-3">{c.type}</td>
                <td className="p-3 font-mono text-xs">{c.rfc}</td>
                <td className="p-3 font-mono">{c.events}</td>
                <td className="p-3 font-mono">{mxn(c.gmv)}</td>
                <td className="p-3"><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                <td className="p-3 text-right">
                  {c.status === "En revisión" && <button onClick={() => approve(c.id)} className="btn btn-amber !py-1.5 !text-xs">Aprobar</button>}
                  {c.status === "Pendiente de documentos" && <button className="btn btn-ghost !py-1.5 !text-xs">Pedir documentos</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-dim">Para verificar: acta constitutiva o constancia fiscal, RFC, identificación del representante y cuenta bancaria a nombre de la empresa (de ahí debe venir el SPEI).</p>
    </>
  );
}
