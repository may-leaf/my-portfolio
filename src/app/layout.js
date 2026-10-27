import { Inter, Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const metadata = {
  title: {
    default: "MaguroSushi — Anime & Manga Illustrator",
    template: "%s | MaguroSushi",
  },
  description:
    "Portfolio and commission information for MaguroSushi, an anime and manga illustrator from Indonesia.",
  openGraph: {
    title: "MaguroSushi — Anime & Manga Illustrator",
    description:
      "Portfolio and commission information for MaguroSushi, an anime and manga illustrator from Indonesia.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJp.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
