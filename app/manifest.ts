import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "2Crew",
    short_name: "2Crew",
    description: "Crew técnico para eventos en vivo",
    start_url: "/tecnico",
    display: "standalone",
    background_color: "#0c0d0f",
    theme_color: "#0c0d0f",
    lang: "es-MX",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
