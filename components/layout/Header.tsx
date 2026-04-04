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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ${
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
          className="flex items-center gap-3 transition-opacity duration-150 hover:opacity-80"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
        >
          <Image src="/logo.png" alt="جراڤيكس" width={40} height={40} className="w-10 h-10 object-contain" />
          <span className="text-lime font-extrabold tracking-wider text-lg">
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
                  className="bg-lime text-forest font-bold tracking-wider text-sm px-4 py-2 border-2 border-lime hover:bg-limeBright active:scale-[0.97] transition-[background-color,color,transform] duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-forest"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-neutral-light tracking-wider text-sm font-semibold hover:text-lime transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-forest"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
          <li>
            <a
              href={`https://wa.me/201273550318`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:text-limeBright transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime p-2"
              aria-label="تواصل عبر واتساب"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-lime p-3 focus:outline-none focus:ring-2 focus:ring-lime"
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
        className={`md:hidden bg-forest border-t border-emerald overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-[clamp(1rem,4vw,2rem)] py-4 flex flex-col gap-3">
          {navigation.map((item: NavItem) => (
            <li key={item.href}>
              {item.isPrimary ? (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-start bg-lime text-forest font-bold tracking-wider text-sm px-4 py-3 border-2 border-lime hover:bg-limeBright transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-start text-neutral-light tracking-wider text-sm font-semibold py-3 hover:text-lime transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/201273550318"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-start text-lime font-semibold py-3 flex items-center gap-2 hover:text-limeBright transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل عبر واتساب
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
