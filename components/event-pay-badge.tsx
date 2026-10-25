"use client";

import type { ProductionEvent } from "@/lib/data";
import { DEMO_EVENT_ID, demoEventStatus, useDemo } from "@/lib/demo-store";
import { Badge, statusTone } from "./ui";

export function EventPayBadge({ e }: { e: ProductionEvent }) {
  const s = useDemo();
  const status = e.id === DEMO_EVENT_ID ? demoEventStatus(s) : e.paymentStatus;
  return <Badge tone={statusTone(status)}>{status}</Badge>;
}
