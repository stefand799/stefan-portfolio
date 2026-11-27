import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

const SITE_URL = "https://stefantech.space";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Only /en and /ro exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { description } = getDictionary(lang).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: "Ștefan D.", template: "%s — Ștefan D." },
    description,
    openGraph: {
      type: "website",
      siteName: "Ștefan D.",
      title: "Ștefan D.",
      description,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      alternateLocale: lang === "ro" ? "en_US" : "ro_RO",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@stefan_d799",
      title: "Ștefan D.",
      description,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${jetbrainsMono.variable} ${dmSans.variable}`}
      // The inline theme script adds "dark" to <html> before React hydrates,
      // so its className differs from the server HTML on purpose.
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
        <Navbar
          lang={lang}
          labels={dict.nav}
          theme={dict.theme}
          menu={dict.menu}
          switchTo={dict.switchTo}
        />
        <main className="max-w-3xl mx-auto px-6">{children}</main>
        <div className="max-w-3xl mx-auto px-6">
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
