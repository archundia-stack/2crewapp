import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarPlus,
  KeyRound,
  Landmark,
  Lightbulb,
  MapPin,
  Mic2,
  MonitorPlay,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
  Clapperboard,
  Network,
} from "lucide-react";
import { Logo, Stars, Badge } from "@/components/ui";

const areas = [
  { icon: Mic2, label: "Audio", note: "Ingenieros FOH y monitores, técnicos de audio" },
  { icon: Lightbulb, label: "Iluminación", note: "Programadores grandMA3, ChamSys, Avolites" },
  { icon: MonitorPlay, label: "Video", note: "Pantallas LED, Resolume, switcheo en vivo" },
  { icon: Wrench, label: "Rigging", note: "Riggers certificados y trabajo en alturas" },
  { icon: Clapperboard, label: "Escenario", note: "Stage managers, backline y cambios de set" },
  { icon: Network, label: "Producción y sistemas", note: "Production managers, redes y timecode" },
];

const companySteps = [
  { icon: CalendarPlus, title: "Crea tu evento", text: "Venue, fechas, llamado y los puestos que necesitas. El tabulador 2Crew te sugiere el pago de montaje y de evento." },
  { icon: Users, title: "Invita a tu crew", text: "Tu Mi Crew recibe la invitación al instante. Si alguien no responde, se abre a New Crew local para evitar traslados y viáticos." },
  { icon: Landmark, title: "Paga por SPEI", text: "Un solo depósito por evento con la comisión del 10% incluida. El dinero queda resguardado hasta que termina el trabajo." },
];

const techSteps = [
  { icon: MapPin, title: "Ofertas cerca de ti", text: "Trabajos de audio, luces, video y rigging según tu ciudad, tu nivel y el equipo que dominas." },
  { icon: ShieldCheck, title: "Acepta o contraoferta", text: "Ves fechas, llamado, encargado y pago antes de decir que sí. Si el pago no te cuadra, propones otra cifra." },
  { icon: Wallet, title: "Cobra seguro", text: "La empresa ya depositó antes del evento. Al terminar entregas tu código y recibes tu pago la semana siguiente." },
];

export default function Landing() {
  return (
    <div className="stage-glow">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
        <Logo size={34} />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
          <a href="#empresas" className="hover:text-ink">Empresas</a>
          <a href="#tecnicos" className="hover:text-ink">Técnicos</a>
          <a href="#pago" className="hover:text-ink">Pago seguro</a>
          <a href="#precio" className="hover:text-ink">Precio</a>
        </nav>
        <div className="flex gap-2">
          <Link href="/entrar" className="btn btn-ghost hidden sm:inline-flex">Entrar</Link>
          <Link href="/empresa/eventos/nuevo" className="btn btn-amber">Crear evento</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-10 md:grid-cols-[1.1fr_1fr] md:px-6 md:pt-20">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber">Crew técnico para eventos en vivo</div>
          <h1 className="mt-5 font-display text-6xl font-extrabold uppercase leading-[0.9] md:text-8xl">
            Tu crew,
            <br />
            listo para
            <br />
            <span className="text-amber">el llamado.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            Productoras, rentas de equipo y bandas encuentran técnicos verificados de audio, luces, video y rigging. Los
            técnicos encuentran trabajo cerca y cobran seguro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/empresa" className="btn btn-amber !px-5 !py-3">
              Soy empresa <ArrowRight size={16} />
            </Link>
            <Link href="/tecnico" className="btn btn-light !px-5 !py-3">
              Soy técnico
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-sm">
            <div><div className="font-display text-3xl font-bold">10%</div><div className="text-muted">comisión por contratación</div></div>
            <div><div className="font-display text-3xl font-bold">SPEI</div><div className="text-muted">pago resguardado</div></div>
            <div><div className="font-display text-3xl font-bold">1 sem</div><div className="text-muted">para que el técnico cobre</div></div>
          </div>
        </div>

        {/* Product preview */}
        <div className="relative">
          <div className="card p-5 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between">
              <Badge tone="amber">INVITACIÓN NUEVA</Badge>
              <span className="font-mono text-xs text-muted">Responde en 1:42 h</span>
            </div>
            <div className="mt-4 font-display text-4xl font-bold">Gira Noreste 2026</div>
            <div className="text-sm text-muted">Arena Monterrey · 6 al 8 nov · Llamado 07:00</div>
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line text-sm">
              {[
                ["Puesto", "Ingeniera de luces"],
                ["Días", "M: 1 · E: 2"],
                ["Consola", "grandMA3 light"],
                ["Encargado", "Samuel Ortega"],
              ].map(([k, v]) => (
                <div key={k} className="bg-panel p-3">
                  <div className="text-xs text-dim">{k}</div>
                  <div className="font-medium">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-xs text-muted">Total para ti</div>
                <div className="font-display text-4xl font-bold">$7,500</div>
              </div>
              <Link href="/tecnico/ofertas/o1" className="btn btn-amber">Ver oferta</Link>
            </div>
            <div className="mt-3 text-xs text-ok">Pago seguro: la empresa ya depositó por SPEI.</div>
          </div>
          <div className="card absolute -bottom-8 -left-4 hidden w-64 p-4 md:block">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-panel-2 font-semibold">DR</span>
              <div>
                <div className="text-sm font-semibold">Daniela Ruiz</div>
                <div className="text-xs text-muted">Ingeniera de luces · Monterrey</div>
              </div>
            </div>
            <div className="mt-2"><Stars n={5} black /></div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="border-y border-line bg-panel/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 py-2 md:grid-cols-3 md:px-6">
          {areas.map(({ icon: Icon, label, note }) => (
            <div key={label} className="flex gap-3 p-5">
              <Icon className="mt-0.5 shrink-0 text-amber" size={20} />
              <div>
                <div className="font-semibold">{label}</div>
                <div className="text-sm text-muted">{note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empresas */}
      <section id="empresas" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="font-mono text-xs uppercase tracking-widest text-amber">Para empresas</div>
        <h2 className="mt-3 font-display text-5xl font-bold">Arma el crew de tu producción en minutos</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {companySteps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="card p-6">
              <div className="flex items-center justify-between">
                <Icon className="text-amber" size={22} />
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
              </div>
              <div className="mt-5 text-lg font-semibold">{title}</div>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="card p-6">
            <Badge tone="ok">Mi Crew</Badge>
            <p className="mt-3 text-muted">Guarda a los técnicos de confianza con los que siempre trabajas y mándales la invitación primero.</p>
          </div>
          <div className="card p-6">
            <Badge tone="info">New Crew</Badge>
            <p className="mt-3 text-muted">Descubre técnicos nuevos de la ciudad del evento, filtrados por área, equipo que dominan, nivel y disponibilidad.</p>
          </div>
        </div>
      </section>

      {/* Técnicos */}
      <section id="tecnicos" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:px-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-amber">Para técnicos</div>
            <h2 className="mt-3 font-display text-5xl font-bold">Trabajo cerca de ti, pago asegurado</h2>
            <p className="mt-4 text-muted">
              Instala 2Crew en tu celular desde el navegador, sin tienda de apps. Activa tu disponibilidad y recibe alertas
              cuando una empresa te necesite.
            </p>
            <Link href="/tecnico" className="btn btn-amber mt-8">Ver la app del técnico <ArrowRight size={16} /></Link>
          </div>
          <div className="flex flex-col gap-4">
            {techSteps.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card flex gap-4 p-5">
                <Icon className="mt-0.5 shrink-0 text-amber" size={20} />
                <div>
                  <div className="font-semibold">{title}</div>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pago */}
      <section id="pago" className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-amber">Pago seguro</div>
          <h2 className="mt-3 font-display text-5xl font-bold">El dinero se mueve solo cuando el trabajo está hecho</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { icon: Building2, t: "1 · Depósito SPEI", d: "La empresa transfiere el total del evento a la CLABE de 2Crew con su referencia única." },
              { icon: ShieldCheck, t: "2 · Resguardo", d: "El monto queda retenido. Cada técnico ve en su app que su pago ya está depositado." },
              { icon: KeyRound, t: "3 · Código de liberación", d: "Al terminar, el técnico entrega su código al encargado en sitio y se libera su pago." },
              { icon: Wallet, t: "4 · Dispersión", d: "2Crew dispersa por SPEI a la cuenta de cada técnico la semana siguiente al evento." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="card p-5">
                <Icon className="text-amber" size={20} />
                <div className="mt-4 font-semibold">{t}</div>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precio */}
      <section id="precio" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="card grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-amber">Precio</div>
            <h2 className="mt-3 font-display text-5xl font-bold">Sin mensualidades. 10% por contratación.</h2>
            <p className="mt-3 max-w-xl text-muted">
              La empresa paga el sueldo del crew más el 10% de comisión 2Crew, en un solo depósito por evento. Para los
              técnicos la app es gratis.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/empresa/eventos/nuevo" className="btn btn-amber !py-3">Crear mi primer evento</Link>
            <Link href="/tecnico" className="btn btn-ghost !py-3">Registrarme como técnico</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-dim md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-2.png" alt="" width={24} height={24} />
            <span>2crew entertainment S.A. de C.V. · CDMX</span>
          </div>
          <div className="flex gap-6">
            <Link href="/entrar" className="hover:text-ink">Entrar</Link>
            <Link href="/admin" className="hover:text-ink">Admin</Link>
            <span>Aviso de privacidad</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
