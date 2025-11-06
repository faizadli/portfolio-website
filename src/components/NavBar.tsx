"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/certificate", label: "Certificate" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Tutup menu saat berpindah halaman
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b border-white/5">
      <nav className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold heading text-xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-accent">FAIZ</span>
        </Link>
        {/* Tombol hamburger untuk mobile */}
        <button
          type="button"
          className="md:hidden inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label="Toggle navigation"
          aria-controls="mobile-nav"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <>
              <XIcon className="h-5 w-5" />
              <span>Tutup</span>
            </>
          ) : (
            <>
              <MenuIcon className="h-5 w-5" />
              <span>Menu</span>
            </>
          )}
        </button>
        <ul className="hidden md:flex items-center gap-4">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-2 py-1 text-sm text-foreground/90 hover:text-foreground transition-colors`}
                >
                  {l.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left transform bg-gradient-to-r from-brand to-accent transition-[scale] duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Menu mobile dropdown */}
      <div
        id="mobile-nav"
        className={mobileOpen ? "md:hidden block border-t border-white/5" : "md:hidden hidden"}
      >
        <div className="container">
          <ul className="flex flex-col items-center gap-2 py-3">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href} className="w-full">
                  <Link
                    href={l.href}
                    className={`block w-full rounded-md px-4 py-2 text-center text-sm border border-white/10 bg-white/5 hover:bg-white/10 ${active ? "font-semibold" : ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}