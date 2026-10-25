import Link from "next/link";
import Image from "next/image";
import { Building2, HardHat, ShieldCheck } from "lucide-react";

const roles = [
  { href: "/empresa", icon: Building2, title: "Soy empresa", text: "Productora, renta de equipo o banda. Crea eventos y arma tu crew." },
  { href: "/tecnico", icon: HardHat, title: "Soy técnico", text: "Audio, luces, video, rigging o escenario. Recibe ofertas y cobra seguro." },
  { href: "/admin", icon: ShieldCheck, title: "Equipo 2Crew", text: "Administración: verificaciones, pagos SPEI, dispersiones y tabulador." },
];

export default function Entrar() {
  return (
    <div className="stage-glow flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex flex-col items-center">
        <Image src="/logo-2.png" alt="2Crew" width={96} height={96} priority />
        <span className="font-display text-6xl font-extrabold uppercase leading-none mt-2">Crew</span>
      </Link>
      <p className="mt-4 text-center text-muted">¿Cómo quieres entrar?</p>
      <div className="mt-8 grid w-full max-w-3xl gap-4 md:grid-cols-3">
        {roles.map(({ href, icon: Icon, title, text }) => (
          <Link key={href} href={href} className="card p-6 transition hover:border-amber">
            <Icon className="text-amber" size={24} />
            <div className="mt-4 text-lg font-semibold">{title}</div>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 max-w-md text-center text-xs text-dim">
        Versión de demostración con datos de ejemplo. El registro con teléfono y la verificación de identidad llegan en la
        siguiente fase.
      </p>
    </div>
  );
}
