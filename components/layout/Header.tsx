"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation, type NavItem } from "@/lib/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-forest/95 backdrop-blur-sm border-b border-emerald"
          : "bg-forest border-b border-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-[clamp(1rem,4vw,2rem)] h-16 flex items-center justify-between"
        aria-label="التنقل الرئيسي"
      >
        <Link
          href="#hero"
          className="flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
        >
          <Image src="/logo.png" alt="جراڤيكس" width={40} height={40} className="w-10 h-10 object-contain" />
          <span className="text-lime font-extrabold uppercase tracking-wider text-lg">
            جراڤيكس
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navigation.map((item: NavItem) => (
            <li key={item.href}>
              {item.isPrimary ? (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="bg-lime text-forest font-bold uppercase tracking-wider text-sm px-4 py-2 border-2 border-lime hover:bg-limeBright transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-forest"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-neutral-light uppercase tracking-wider text-sm font-semibold hover:text-lime transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-forest"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-lime p-2 focus:outline-none focus:ring-2 focus:ring-lime"
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={menuOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-forest border-t border-emerald overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-[clamp(1rem,4vw,2rem)] py-4 flex flex-col gap-3">
          {navigation.map((item: NavItem) => (
            <li key={item.href}>
              {item.isPrimary ? (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-start bg-lime text-forest font-bold uppercase tracking-wider text-sm px-4 py-3 border-2 border-lime hover:bg-limeBright transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-start text-neutral-light uppercase tracking-wider text-sm font-semibold py-3 hover:text-lime transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
