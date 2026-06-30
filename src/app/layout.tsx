import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Cinzel, Space_Grotesk, Chakra_Petch, Cormorant_Garamond, Bebas_Neue, Great_Vibes, Playfair_Display, DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from 'next-themes';
import { GlobalChatWidget } from '@/components/GlobalChatWidget';
import { BackToTop } from '@/components/BackToTop';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Display fonts — Phase 5 integrations
const fontZizo = Syne({ variable: "--font-zizo", subsets: ["latin"], weight: ["700", "800"], display: "swap" });
const fontBizantheum = Cinzel({ variable: "--font-bizantheum", subsets: ["latin"], weight: ["700", "900"], display: "swap" });
const fontMedifa = Space_Grotesk({ variable: "--font-medifa", subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const fontSkyrate = Chakra_Petch({ variable: "--font-skyrate", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const fontAllenoire = Cormorant_Garamond({ variable: "--font-allenoire", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const fontBruney = Bebas_Neue({ variable: "--font-bruney", subsets: ["latin"], weight: "400", display: "swap" });
const fontFlorisha = Great_Vibes({ variable: "--font-florisha", subsets: ["latin"], weight: "400", display: "swap" });
const fontGlitten = Playfair_Display({ variable: "--font-glitten", subsets: ["latin"], weight: ["700", "900"], display: "swap" });
const fontQurova = DM_Sans({ variable: "--font-qurova", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const fontBulgatti = Lora({ variable: "--font-bulgatti", subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Greenfield University — Shape Your Future",
  description: "Discover world-class education at Greenfield University. Explore our diverse programs, exceptional faculty, and vibrant campus life. Admissions Open 2025-26.",
  keywords: ["university", "college", "admissions", "education", "BCA", "BBA", "B.Com", "MCA", "MBA", "PhD", "higher education"],
  authors: [{ name: "Greenfield University" }],
  icons: { icon: "/logo.svg" },
  openGraph: { title: "Greenfield University — Shape Your Future", description: "World-class education, exceptional faculty, and vibrant campus life.", type: "website" },
};

const fontClasses = [
  geistSans.variable, geistMono.variable,
  fontZizo.variable, fontBizantheum.variable, fontMedifa.variable,
  fontSkyrate.variable, fontAllenoire.variable, fontBruney.variable,
  fontFlorisha.variable, fontGlitten.variable, fontQurova.variable, fontBulgatti.variable,
].join(" ");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontClasses} antialiased bg-background text-foreground overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <QueryProvider>
            {children}
            <GlobalChatWidget />
            <BackToTop />
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}