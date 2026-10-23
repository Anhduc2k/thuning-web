import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { FloatingContact, Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/json-ld";
import { locales } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { organizationLd, site } from "@/lib/site";
import "../globals.css";

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

const font = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} – ${t.tagline}`, template: `%s | ${site.name}` },
    description: t.siteDesc(site.legalName, t.tagline),
    openGraph: { type: "website", locale: t.ogLocale, siteName: site.name },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { l, t } = await getT();
  return (
    <html lang={l} className={`${font.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">
          {t.skip}
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
