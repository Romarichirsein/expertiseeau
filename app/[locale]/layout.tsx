import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const viewport: Viewport = {
  themeColor: "#0a5694",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Expertise Au Cameroun | Réseau National des Experts Eaux",
    template: "%s | Expertise Au Cameroun"
  },
  description: "Portail officiel de l'expertise nationale dans le secteur de l'eau et de l'assainissement au Cameroun. Connectez-vous avec 960+ professionnels certifiés.",
  keywords: ["expertise", "cameroun", "eau", "assainissement", "experts", "forage", "hydrologie", "répertoire national"],
  authors: [{ name: "Expertise Au Cameroun" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Expertise Au Cameroun | Réseau National des Experts Eaux",
    description: "Répertoire des professionnels du secteur de l'eau au Cameroun.",
    url: "https://expertiseaucameroun.org",
    siteName: "Expertise Au Cameroun",
    locale: "fr_CM",
    type: "website",
  },
  robots: { index: true, follow: true },
};

import { ThemeProvider } from "../../components/ThemeProvider";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,200,300,400,500,600,700,800,900&display=swap" />
      </head>
      <body suppressHydrationWarning>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {/* Header pleine largeur en haut */}
            <Header locale={locale} />

            {/* Contenu principal — pt-24 compense le header fixe */}
            <main id="main-content" className="pt-24 lg:pt-[130px]">
              {children}
            </main>

            {/* Footer pleine largeur en bas */}
            <Footer locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
