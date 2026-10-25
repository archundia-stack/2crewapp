import Link from "next/link";
import type { ProductionEvent } from "@/lib/data";
import { DateChip, Progress } from "./ui";

export function EventRow({ e, href }: { e: ProductionEvent; href: string }) {
  return (
    <Link href={href} className="card flex flex-col gap-4 p-4 transition hover:border-line-2 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-4 min-w-0">
        <DateChip month={e.month} day={e.day} />
        <div className="min-w-0">
          <div className="font-semibold">{e.name}</div>
          <div className="text-sm text-muted">
            {e.venue} · Llamado {e.callTime} · {e.montajes > 0 ? `${e.montajes} montaje${e.montajes > 1 ? "s" : ""} + ` : ""}
            {e.eventos} evento{e.eventos > 1 ? "s" : ""}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-48">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-muted">Crew confirmado</span>
          <span className="font-mono">{e.confirmed}/{e.needed}</span>
        </div>
        <Progress value={e.confirmed} total={e.needed} />
      </div>
    </Link>
  );
}
