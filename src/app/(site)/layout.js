import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SiteLayout({ children }) {
  return (
    <>
      <a
        className="sr-only m-4 rounded-input bg-primary px-4 py-3 font-semibold text-primary-ink focus:not-sr-only focus:fixed focus:left-0 focus:top-0 focus:z-50"
        href="#main"
      >
        Skip to content
      </a>
      <Navbar />
      <main className="flex-1" id="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
