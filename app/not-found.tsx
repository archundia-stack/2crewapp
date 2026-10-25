import Link from "next/link";

export default function NotFound() {
  return (
    <div className="stage-glow flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="font-display text-7xl font-bold">404</div>
      <p className="text-muted">Esta página no está en el rider.</p>
      <Link href="/" className="btn btn-amber">Volver al inicio</Link>
    </div>
  );
}
