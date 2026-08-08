import type { MetadataRoute } from "next";

// Manifest della PWA: permette di installare Mandari sul telefono
// (icona in home, apertura a schermo intero come un'app).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mandari — la burocrazia dalla tua parte",
    short_name: "Mandari",
    description:
      "Il tuo assistente per diritti, documenti, scadenze e pratiche amministrative.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#faf6f2",
    theme_color: "#f2560a",
    lang: "it",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
