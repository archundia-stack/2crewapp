export const mxn = (n: number) =>
  "$" + n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

export const mxnK = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}k` : mxn(n);

export const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
