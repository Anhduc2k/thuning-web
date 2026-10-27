import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { FloatingContact, Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/json-ld";
import { organizationLd, site } from "@/lib/site";
import "./globals.css";

const font = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s | ${site.name}` },
  description: `${site.legalName}: ${site.tagline}. Thiết kế, chế tạo và lắp đặt tại xưởng, giao hàng toàn quốc.`,
  openGraph: { type: "website", locale: "vi_VN", siteName: site.name },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${font.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">
          Bỏ qua menu
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
