import { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {/* Header pleine largeur en haut */}
          <Header locale={locale} />

          {/* Contenu principal — pt-[136px] compense le header fixe */}
          <main id="main-content" className="pt-[136px]">
            {children}
          </main>

          {/* Footer pleine largeur en bas */}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
