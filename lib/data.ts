// Datos de ejemplo para el prototipo. Se reemplazan por la base de datos en la siguiente fase.

export const COMMISSION = 0.1;

export type Origin = "Mi Crew" | "New Crew";
export type CrewStatus = "Confirmado" | "Por confirmar" | "Contraoferta" | "Rechazó" | "Invitado";
export type PaymentStatus = "Esperando SPEI" | "Retenido" | "Por liberar" | "Liberado" | "Dispersado";

export interface Technician {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  area: "Audio" | "Iluminación" | "Video" | "Rigging" | "Escenario" | "Producción" | "Sistemas";
  city: string;
  distanceKm?: number;
  stars: number;
  black?: boolean;
  events: number;
  origin: Origin;
  skills: string[];
  lastJobs: string[];
  rateM: number;
  rateE: number;
  match: number;
  verified: boolean;
  available: boolean;
}

export interface Position {
  role: string;
  minStars: number;
  rateM: number;
  rateE: number;
  qty: number;
  inviteFirst: "Mi Crew" | "New Crew local";
}

export interface CrewAssignment {
  role: string;
  techId: string;
  origin: Origin;
  status: CrewStatus;
  rateM: number;
  rateE: number;
}

export interface ProductionEvent {
  id: string;
  name: string;
  company: string;
  venue: string;
  city: string;
  dates: string;
  month: string;
  day: string;
  callTime: string;
  montajes: number;
  eventos: number;
  onSite: string;
  needed: number;
  confirmed: number;
  crew: CrewAssignment[];
  paymentStatus: PaymentStatus;
  total: number;
}

export interface Company {
  id: string;
  name: string;
  type: "Productora" | "Renta de equipo" | "Banda" | "Agencia";
  city: string;
  rfc: string;
  events: number;
  gmv: number;
  status: "Verificada" | "En revisión" | "Pendiente de documentos";
  since: string;
}

export const technicians: Technician[] = [
  { id: "t1", name: "Samuel Ortega", role: "Production Manager", area: "Producción", city: "CDMX", stars: 5, black: true, events: 132, origin: "Mi Crew", skills: ["Producción de giras", "Advance", "Rider"], lastJobs: ["Gira Pacífico", "Vive Latino 2026"], rateM: 1800, rateE: 3500, match: 98, verified: true, available: true },
  { id: "t2", name: "Marco Treviño", nickname: "El Oso", role: "Ingeniero de audio", area: "Audio", city: "Monterrey", distanceKm: 6, stars: 4, events: 97, origin: "Mi Crew", skills: ["DiGiCo SD12", "L-Acoustics", "Smaart"], lastJobs: ["Arena Monterrey", "Pa'l Norte 2026"], rateM: 1500, rateE: 3000, match: 94, verified: true, available: true },
  { id: "t3", name: "Lucía Cantú", role: "Técnico de audio", area: "Audio", city: "Monterrey", distanceKm: 4, stars: 3, events: 41, origin: "New Crew", skills: ["Yamaha CL5", "Shure Axient", "Monitores"], lastJobs: ["Showcase Rock", "Boda Hacienda San Pedro"], rateM: 1200, rateE: 2400, match: 88, verified: true, available: true },
  { id: "t4", name: "Daniela Ruiz", role: "Ingeniera de luces", area: "Iluminación", city: "Monterrey", distanceKm: 3, stars: 5, black: true, events: 84, origin: "Mi Crew", skills: ["grandMA3", "Robe MegaPointe", "Capture", "Curso 2Crew: Programación MA3"], lastJobs: ["Festival Orilla 2025", "Gira Pacífico", "Arena Monterrey"], rateM: 1500, rateE: 3000, match: 96, verified: true, available: true },
  { id: "t5", name: "Rogelio Villa", nickname: "Dedos", role: "Ingeniero de sistemas", area: "Sistemas", city: "Saltillo", distanceKm: 85, stars: 4, events: 58, origin: "New Crew", skills: ["Dante", "Redes de show", "Timecode"], lastJobs: ["Coliseo Saltillo", "Expo Guadalupe"], rateM: 1500, rateE: 3000, match: 81, verified: true, available: false },
  { id: "t6", name: "Héctor Garza", nickname: "Flash", role: "Ingeniero de luces", area: "Iluminación", city: "San Pedro G.G.", distanceKm: 9, stars: 4, events: 52, origin: "New Crew", skills: ["grandMA3", "ChamSys MagicQ", "Claypaky"], lastJobs: ["Teatro Diana", "Expo Guadalupe", "Showcase Rock"], rateM: 1400, rateE: 2800, match: 91, verified: true, available: true },
  { id: "t7", name: "Paola Leal", role: "Técnica de luces", area: "Iluminación", city: "Monterrey", distanceKm: 5, stars: 4, events: 37, origin: "New Crew", skills: ["grandMA3 on PC", "Dimmers ETC", "Alturas"], lastJobs: ["Fundidora Fest", "Boda Hacienda", "Gira Noreste 2025"], rateM: 1200, rateE: 2400, match: 84, verified: true, available: true },
  { id: "t8", name: "Jorge Saldívar", role: "Ingeniero de luces", area: "Iluminación", city: "Saltillo", distanceKm: 85, stars: 4, events: 61, origin: "New Crew", skills: ["grandMA2", "Avolites Titan", "Robe"], lastJobs: ["Palenque Feria", "Coliseo Saltillo", "Gira Bajío"], rateM: 1500, rateE: 2900, match: 78, verified: false, available: true },
  { id: "t9", name: "Ana Paredes", role: "Rigger certificado", area: "Rigging", city: "Monterrey", distanceKm: 7, stars: 4, events: 45, origin: "New Crew", skills: ["ETCP", "Motores CM", "Trabajo en alturas"], lastJobs: ["Arena Monterrey", "Estadio BBVA"], rateM: 1700, rateE: 2800, match: 86, verified: true, available: true },
  { id: "t10", name: "Iván Morales", role: "Stage Manager", area: "Escenario", city: "Monterrey", distanceKm: 11, stars: 4, events: 73, origin: "Mi Crew", skills: ["Cambios de set", "Backline", "Comunicación"], lastJobs: ["Festival Orilla 2025", "Pa'l Norte 2026"], rateM: 1500, rateE: 3000, match: 89, verified: true, available: true },
  { id: "t11", name: "Karla Méndez", role: "Técnica de video", area: "Video", city: "CDMX", stars: 4, events: 39, origin: "New Crew", skills: ["Resolume", "Pantallas LED", "Disguise"], lastJobs: ["Auditorio Nacional", "Corona Capital"], rateM: 1400, rateE: 2800, match: 72, verified: false, available: true },
];

export const techById = (id: string) => technicians.find((t) => t.id === id)!;

export const events: ProductionEvent[] = [
  {
    id: "gira-noreste-2026",
    name: "Gira Noreste 2026",
    company: "2Crew Producciones",
    venue: "Arena Monterrey",
    city: "Monterrey, N.L.",
    dates: "6 al 8 nov 2026",
    month: "NOV",
    day: "06",
    callTime: "07:00",
    montajes: 1,
    eventos: 2,
    onSite: "Samuel Ortega",
    needed: 12,
    confirmed: 9,
    paymentStatus: "Retenido",
    total: 95040,
    crew: [
      { role: "Production Manager", techId: "t1", origin: "Mi Crew", status: "Confirmado", rateM: 1500, rateE: 3000 },
      { role: "Ingeniero de audio", techId: "t2", origin: "Mi Crew", status: "Confirmado", rateM: 1500, rateE: 3000 },
      { role: "Técnico de audio", techId: "t3", origin: "New Crew", status: "Contraoferta", rateM: 1200, rateE: 2400 },
      { role: "Ingeniera de luces", techId: "t4", origin: "Mi Crew", status: "Por confirmar", rateM: 1500, rateE: 3000 },
      { role: "Ingeniero de sistemas", techId: "t5", origin: "New Crew", status: "Rechazó", rateM: 1500, rateE: 3000 },
      { role: "Rigger certificado", techId: "t9", origin: "New Crew", status: "Confirmado", rateM: 1700, rateE: 2800 },
    ],
  },
  {
    id: "festival-orilla",
    name: "Festival Orilla",
    company: "2Crew Producciones",
    venue: "Parque Fundidora",
    city: "Monterrey, N.L.",
    dates: "14 al 18 nov 2026",
    month: "NOV",
    day: "14",
    callTime: "05:30",
    montajes: 2,
    eventos: 3,
    onSite: "Iván Morales",
    needed: 26,
    confirmed: 14,
    paymentStatus: "Esperando SPEI",
    total: 214500,
    crew: [
      { role: "Stage Manager", techId: "t10", origin: "Mi Crew", status: "Confirmado", rateM: 1500, rateE: 3000 },
      { role: "Programadora grandMA3", techId: "t4", origin: "Mi Crew", status: "Confirmado", rateM: 1600, rateE: 3200 },
      { role: "Rigger certificado", techId: "t9", origin: "New Crew", status: "Invitado", rateM: 1700, rateE: 2800 },
    ],
  },
  {
    id: "sinfonico-rock",
    name: "Concierto sinfónico rock",
    company: "Audio Visual Sistemas",
    venue: "Auditorio Nacional",
    city: "CDMX",
    dates: "21 nov 2026",
    month: "NOV",
    day: "21",
    callTime: "10:00",
    montajes: 1,
    eventos: 1,
    onSite: "Samuel Ortega",
    needed: 8,
    confirmed: 8,
    paymentStatus: "Retenido",
    total: 52800,
    crew: [
      { role: "Production Manager", techId: "t1", origin: "Mi Crew", status: "Confirmado", rateM: 1800, rateE: 3500 },
      { role: "Técnica de video", techId: "t11", origin: "New Crew", status: "Confirmado", rateM: 1400, rateE: 2800 },
    ],
  },
  {
    id: "showcase-rock",
    name: "Showcase Rock",
    company: "ROA Eventos",
    venue: "Foro Fundidora",
    city: "Monterrey, N.L.",
    dates: "30 oct 2026",
    month: "OCT",
    day: "30",
    callTime: "14:00",
    montajes: 0,
    eventos: 1,
    onSite: "Iván Morales",
    needed: 6,
    confirmed: 6,
    paymentStatus: "Por liberar",
    total: 21120,
    crew: [{ role: "Ingeniera de luces", techId: "t4", origin: "Mi Crew", status: "Confirmado", rateM: 0, rateE: 3000 }],
  },
];

export const eventById = (id: string) => events.find((e) => e.id === id);

export const companies: Company[] = [
  { id: "c1", name: "2Crew Producciones", type: "Productora", city: "CDMX", rfc: "CPR190312AB4", events: 38, gmv: 1834000, status: "Verificada", since: "mar 2026" },
  { id: "c2", name: "Audio Visual Sistemas", type: "Renta de equipo", city: "CDMX", rfc: "AVS080921KL2", events: 22, gmv: 961000, status: "Verificada", since: "abr 2026" },
  { id: "c3", name: "ROA Eventos", type: "Productora", city: "Monterrey", rfc: "REV150704MN8", events: 17, gmv: 540200, status: "Verificada", since: "may 2026" },
  { id: "c4", name: "Los Lobos del Norte", type: "Banda", city: "Saltillo", rfc: "LLN210115QR1", events: 3, gmv: 86400, status: "En revisión", since: "oct 2026" },
  { id: "c5", name: "Brillo Agencia", type: "Agencia", city: "Guadalajara", rfc: "—", events: 0, gmv: 0, status: "Pendiente de documentos", since: "oct 2026" },
];

export interface Payout {
  event: string;
  tech: string;
  amount: number;
  status: PaymentStatus;
  code?: string;
  clabe: string;
  date: string;
}

export const payouts: Payout[] = [
  { event: "Showcase Rock", tech: "Daniela Ruiz", amount: 3000, status: "Por liberar", code: "LUZ 7316", clabe: "•••• 4821", date: "30 oct" },
  { event: "Expo Guadalupe", tech: "Daniela Ruiz", amount: 7500, status: "Liberado", clabe: "•••• 4821", date: "lunes 26 oct" },
  { event: "Expo Guadalupe", tech: "Rogelio Villa", amount: 6000, status: "Liberado", clabe: "•••• 0193", date: "lunes 26 oct" },
  { event: "Boda Hacienda San Pedro", tech: "Daniela Ruiz", amount: 3200, status: "Dispersado", clabe: "•••• 4821", date: "10 oct" },
  { event: "Gira Pacífico · Mazatlán", tech: "Daniela Ruiz", amount: 9000, status: "Dispersado", clabe: "•••• 4821", date: "26 al 28 sep" },
];

export interface IncomingSpei {
  company: string;
  event: string;
  amount: number;
  reference: string;
  status: "Recibido" | "Esperando" | "Monto distinto";
  when: string;
}

export const incomingSpei: IncomingSpei[] = [
  { company: "2Crew Producciones", event: "Gira Noreste 2026", amount: 95040, reference: "2C-GN26-0611", status: "Recibido", when: "hoy 09:14" },
  { company: "Audio Visual Sistemas", event: "Concierto sinfónico rock", amount: 52800, reference: "2C-SR26-2111", status: "Recibido", when: "ayer 17:40" },
  { company: "2Crew Producciones", event: "Festival Orilla", amount: 214500, reference: "2C-FO26-1411", status: "Esperando", when: "vence 7 nov" },
  { company: "Los Lobos del Norte", event: "Palenque Feria", amount: 28600, reference: "2C-PF26-0211", status: "Monto distinto", when: "hoy 11:02" },
];

export const tabulator = [
  { role: "Production Manager", m: [1500, 1800, 2200], e: [3000, 3500, 4200] },
  { role: "Ingeniero de audio", m: [1200, 1500, 1900], e: [2600, 3000, 3800] },
  { role: "Técnico de audio", m: [900, 1200, 1500], e: [1900, 2400, 2900] },
  { role: "Ingeniero de luces", m: [1200, 1500, 1900], e: [2800, 3000, 4200] },
  { role: "Rigger certificado", m: [1400, 1700, 2100], e: [2400, 2800, 3400] },
  { role: "Stage Manager", m: [1200, 1500, 1800], e: [2500, 3000, 3600] },
  { role: "Técnico de video", m: [1100, 1400, 1800], e: [2300, 2800, 3500] },
];

export const roles = tabulator.map((t) => t.role);

export interface Offer {
  id: string;
  eventId: string;
  role: string;
  kind: "Invitación · Mi Crew" | "New Crew";
  distanceKm: number;
  match: number;
  rateM: number;
  rateE: number;
  montajes: number;
  eventos: number;
  extras: string;
  console: string;
  expiresIn?: string;
}

export const offers: Offer[] = [
  { id: "o1", eventId: "gira-noreste-2026", role: "Ingeniera de luces", kind: "Invitación · Mi Crew", distanceKm: 12, match: 96, rateM: 1500, rateE: 3000, montajes: 1, eventos: 2, extras: "Tester y lámpara", console: "grandMA3 light", expiresIn: "1:42 h" },
  { id: "o2", eventId: "festival-orilla", role: "Programadora grandMA3", kind: "New Crew", distanceKm: 4, match: 88, rateM: 1600, rateE: 3200, montajes: 2, eventos: 3, extras: "Laptop con MA3 onPC", console: "grandMA3 full" },
  { id: "o3", eventId: "sinfonico-rock", role: "Técnica de luces", kind: "New Crew", distanceKm: 9, match: 74, rateM: 0, rateE: 2200, montajes: 0, eventos: 1, extras: "Ninguno", console: "Avolites Titan" },
];

export const offerById = (id: string) => offers.find((o) => o.id === id);
