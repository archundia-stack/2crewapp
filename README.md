# 2Crew web app

Web app / PWA de 2Crew: landing page y los tres módulos.

- `/` landing page
- `/entrar` elegir rol (demo, sin login todavía)
- `/empresa` panel de la productora: eventos, crear evento y pedir crew, buscar crew, Mi Crew, pagos SPEI
- `/tecnico` app del técnico (mobile first, instalable): inicio, ofertas, aceptar/rechazar/contraofertar, agenda, mis pagos y código de liberación, perfil
- `/admin` administración 2Crew: resumen, conciliación SPEI, liberación por código, dispersión, empresas, técnicos, eventos, tabulador

Todo usa datos de ejemplo en `lib/data.ts`. Modelo: 10% de comisión por contratación; pago solo por transferencia SPEI, retenido hasta el código de liberación y dispersado la semana siguiente al evento.

## Desarrollo

```bash
npm install
npm run dev
```

Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4. Fuentes: Big Shoulders, Instrument Sans, IBM Plex Mono.
