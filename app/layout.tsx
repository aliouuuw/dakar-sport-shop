import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://dakarsport.sn";

export const metadata: Metadata = {
  title: {
    default: "Dakar Sport — Tout pour le Sport",
    template: "%s | Dakar Sport",
  },
  description:
    "Dakar Sport — Spécialiste des équipements sportifs à Dakar. Football, basketball, running, fitness, natation. Livraison rapide au Sénégal.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: "Dakar Sport",
    title: "Dakar Sport — Tout pour le Sport",
    description:
      "Spécialiste des équipements sportifs à Dakar. Football, basketball, running, fitness, natation.",
    url: APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dakar Sport — Tout pour le Sport",
    description:
      "Spécialiste des équipements sportifs à Dakar. Football, basketball, running, fitness, natation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        "h-full",
        "antialiased",
        plusJakarta.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            className: "font-sans rounded-xl border-slate-200 shadow-lg",
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
