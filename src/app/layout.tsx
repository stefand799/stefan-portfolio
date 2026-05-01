import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ionel-Ștefan Dinu — Software Developer",
  description:
    "Personal portfolio of Ionel-Ștefan Dinu, a software developer from Brașov, România.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
        <Navbar />
        <main className="max-w-3xl mx-auto px-6">{children}</main>
        <div className="max-w-3xl mx-auto px-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
