import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { brand } from "@/data/content";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://budgethomes.com"),
  title: "Budget Homes | Home for all - All for home",
  description: brand.intro,
  openGraph: {
    title: "Budget Homes | Home for all - All for home",
    description: brand.intro,
    images: ["/images/bdjet-homes.png"], // updated to logo as requested
    type: "website",
    locale: "en_IN"
  }
};

export const viewport: Viewport = {
  themeColor: "#FBF8F3"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": brand.name,
    "telephone": brand.contact.phone,
    "email": brand.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, Door No: 1308, Tower-1, Hilite Business Park, Hilite City, Thondayad Bypass, G A, College P O",
      "addressLocality": "Kozhikode",
      "addressRegion": "Kerala",
      "postalCode": "673014",
      "addressCountry": "IN"
    },
    "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-17:30",
    "url": "https://budgethomes.com"
  };

  return (
    <html lang="en" className="h-full">
      <body
        className={`${cormorant.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground min-h-full selection:bg-primary selection:text-primary-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>
          <TooltipProvider>
            {children}
            <WhatsAppFab />
          </TooltipProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
