import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";

const preloaderGate = `(function(){try{var seen=sessionStorage.getItem("tuna-preloader-seen");var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(seen||reduce){document.documentElement.dataset.preloader="skip"}}catch(error){document.documentElement.dataset.preloader="skip"}})();`;

export default function SiteLayout({ children }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: preloaderGate }} />
      <noscript>
        <style>{"#site-preloader{display:none !important}"}</style>
      </noscript>

      <Preloader />

      <a
        className="hud-chip hud-chip--primary sr-only m-4 min-h-11 px-4 font-mono text-xs uppercase tracking-[0.14em] focus:not-sr-only focus:fixed focus:left-0 focus:top-0 focus:z-[110]"
        href="#main"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col" id="top">
        <Navbar />
        <main className="flex-1" id="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
