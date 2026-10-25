// Simulación del flujo de pago de un evento (Gira Noreste 2026) compartida entre los roles.
// Vive en localStorage, así que se conserva al recargar y se sincroniza entre pestañas.

import { useSyncExternalStore } from "react";
import { COMMISSION } from "./data";

export const DEMO_EVENT_ID = "gira-noreste-2026";
export const DEMO_REFERENCE = "2C-GN26-0611";
export const DEMO_TECH_ID = "t4"; // Daniela Ruiz, la técnica cuya app mostramos

export type Stage = "pendiente" | "recibido" | "retenido";
export type CrewPay = "resguardado" | "liberado" | "dispersado";

export interface DemoCrew {
  id: string;
  techId?: string;
  name: string;
  role: string;
  amount: number;
  code: string;
  clabe: string;
  status: CrewPay;
}

export interface DemoLog {
  at: string;
  who: "Empresa" | "2Crew" | "Técnico" | "Encargado";
  text: string;
}

export interface DemoState {
  stage: Stage;
  techSawCode: boolean;
  crew: DemoCrew[];
  log: DemoLog[];
}

// 1 montaje + 2 eventos por persona, según el tabulador del evento.
const crewSeed: Omit<DemoCrew, "status">[] = [
  { id: "c1", techId: "t1", name: "Samuel Ortega", role: "Production Manager", amount: 8800, code: "PROD 3051", clabe: "•••• 7710" },
  { id: "c2", techId: "t2", name: "Marco Treviño", role: "Ingeniero de audio", amount: 7500, code: "AUDIO 2290", clabe: "•••• 3348" },
  { id: "c3", name: "Raúl Benítez", role: "Ingeniero de audio", amount: 7500, code: "AUDIO 6614", clabe: "•••• 0921" },
  { id: "c4", techId: "t3", name: "Lucía Cantú", role: "Técnico de audio", amount: 6000, code: "MONI 4407", clabe: "•••• 5532" },
  { id: "c5", name: "Omar Salinas", role: "Técnico de audio", amount: 6000, code: "MONI 1873", clabe: "•••• 6004" },
  { id: "c6", name: "Fer Quiroga", role: "Técnico de audio", amount: 6000, code: "MONI 9925", clabe: "•••• 2187" },
  { id: "c7", techId: "t4", name: "Daniela Ruiz", role: "Ingeniera de luces", amount: 7500, code: "LUZ 2611", clabe: "•••• 4821" },
  { id: "c8", techId: "t6", name: "Héctor Garza", role: "Ingeniero de luces", amount: 7500, code: "LUZ 5038", clabe: "•••• 8846" },
  { id: "c9", techId: "t9", name: "Ana Paredes", role: "Rigger certificado", amount: 7300, code: "RIG 7742", clabe: "•••• 1290" },
  { id: "c10", name: "Beto Leal", role: "Rigger certificado", amount: 7300, code: "RIG 3169", clabe: "•••• 4473" },
  { id: "c11", techId: "t10", name: "Iván Morales", role: "Stage Manager", amount: 7500, code: "STAGE 8420", clabe: "•••• 3065" },
  { id: "c12", name: "Mónica Rangel", role: "Stage Manager", amount: 7500, code: "STAGE 1557", clabe: "•••• 7718" },
];

export const crewSubtotal = crewSeed.reduce((s, c) => s + c.amount, 0); // 86,400
export const demoCommission = Math.round(crewSubtotal * COMMISSION); // 8,640
export const demoTotal = crewSubtotal + demoCommission; // 95,040

const KEY = "2crew-demo-pago-v1";
const EVENT = "2crew-demo-change";

const initial = (): DemoState => ({
  stage: "pendiente",
  techSawCode: false,
  crew: crewSeed.map((c) => ({ ...c, status: "resguardado" })),
  log: [],
});

const serverSnapshot = initial();
let cache: { raw: string | null; state: DemoState } | null = null;

function read(): DemoState {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // Sin acceso a localStorage (modo privado): la demo funciona en memoria.
  }
  if (cache && cache.raw === raw) return cache.state;
  let state = initial();
  if (raw) {
    try {
      state = JSON.parse(raw) as DemoState;
    } catch {
      state = initial();
    }
  }
  cache = { raw, state };
  return state;
}

function write(next: DemoState) {
  const raw = JSON.stringify(next);
  try {
    window.localStorage.setItem(KEY, raw);
  } catch {
    // ignore
  }
  cache = { raw, state: next };
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useDemo(): DemoState {
  return useSyncExternalStore(subscribe, read, () => serverSnapshot);
}

const now = () => new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

function update(fn: (s: DemoState) => DemoState) {
  write(fn(read()));
}

const withLog = (s: DemoState, who: DemoLog["who"], text: string): DemoState => ({
  ...s,
  log: [{ at: now(), who, text }, ...s.log],
});

export const demo = {
  deposit() {
    update((s) =>
      s.stage !== "pendiente"
        ? s
        : withLog({ ...s, stage: "recibido" }, "Empresa", `2Crew Producciones envió un SPEI por $${demoTotal.toLocaleString("es-MX")} con referencia ${DEMO_REFERENCE}.`),
    );
  },
  reconcile() {
    update((s) =>
      s.stage !== "recibido"
        ? s
        : withLog({ ...s, stage: "retenido" }, "2Crew", "Depósito conciliado con Gira Noreste 2026. El monto queda resguardado y se avisa al crew."),
    );
  },
  techSaw() {
    update((s) => (s.techSawCode || s.stage !== "retenido" ? s : withLog({ ...s, techSawCode: true }, "Técnico", "Daniela Ruiz vio su pago asegurado y su código de liberación.")));
  },
  /** Devuelve la persona liberada, o null si el código no es válido. */
  release(code: string): DemoCrew | null {
    const s = read();
    if (s.stage !== "retenido") return null;
    const norm = code.trim().toUpperCase().replace(/\s+/g, " ");
    const hit = s.crew.find((c) => c.code === norm && c.status === "resguardado");
    if (!hit) return null;
    write(
      withLog(
        { ...s, crew: s.crew.map((c) => (c.id === hit.id ? { ...c, status: "liberado" } : c)) },
        "Encargado",
        `Samuel Ortega capturó el código de ${hit.name}. Se liberan $${hit.amount.toLocaleString("es-MX")}.`,
      ),
    );
    return hit;
  },
  releaseRest() {
    update((s) => {
      const n = s.crew.filter((c) => c.status === "resguardado").length;
      if (s.stage !== "retenido" || n === 0) return s;
      return withLog(
        { ...s, crew: s.crew.map((c) => (c.status === "resguardado" ? { ...c, status: "liberado" } : c)) },
        "Encargado",
        `Samuel Ortega capturó los ${n} códigos restantes del crew.`,
      );
    });
  },
  disperse() {
    update((s) => {
      const ready = s.crew.filter((c) => c.status === "liberado");
      if (ready.length === 0) return s;
      const sum = ready.reduce((a, c) => a + c.amount, 0);
      const next = { ...s, crew: s.crew.map((c) => (c.status === "liberado" ? { ...c, status: "dispersado" as const } : c)) };
      const done = next.crew.every((c) => c.status === "dispersado");
      return withLog(
        next,
        "2Crew",
        `Lote SPEI enviado: ${ready.length} técnico${ready.length > 1 ? "s" : ""}, $${sum.toLocaleString("es-MX")}.` +
          (done ? ` Comisión 2Crew de $${demoCommission.toLocaleString("es-MX")} facturada a la empresa.` : ""),
      );
    });
  },
  reset() {
    write(initial());
  },
};

/** Paso actual de la demo (1 a 6) con la acción siguiente. */
export function demoStep(s: DemoState) {
  const resguardado = s.crew.some((c) => c.status === "resguardado");
  const liberado = s.crew.some((c) => c.status === "liberado");
  if (s.stage === "pendiente") return { n: 1, text: "La empresa deposita por SPEI", href: "/empresa/pagos", who: "Empresa" };
  if (s.stage === "recibido") return { n: 2, text: "2Crew concilia el depósito", href: "/admin/pagos", who: "Admin" };
  if (!s.techSawCode) return { n: 3, text: "La técnica ve su pago asegurado y su código", href: "/tecnico/pagos", who: "Técnico" };
  if (resguardado && !liberado) return { n: 4, text: "El encargado captura los códigos al terminar", href: "/encargado", who: "Encargado" };
  if (liberado || resguardado) return { n: 5, text: "2Crew dispersa los pagos liberados", href: "/admin/pagos", who: "Admin" };
  return { n: 6, text: "Listo: crew pagado y comisión facturada", href: "/admin/pagos", who: "Admin" };
}

export function demoEventStatus(s: DemoState): "Esperando SPEI" | "Recibido" | "Retenido" | "Por liberar" | "Dispersado" {
  if (s.stage === "pendiente") return "Esperando SPEI";
  if (s.stage === "recibido") return "Recibido";
  if (s.crew.every((c) => c.status === "dispersado")) return "Dispersado";
  if (s.crew.some((c) => c.status !== "resguardado")) return "Por liberar";
  return "Retenido";
}
