import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/catalog?deal=hot", label: "Hot Deals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function navClass({ isActive }) {
  return `text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-copper-500 ${
    isActive ? "text-copper-500" : "text-navy-700"
  }`;
}

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.label} to={l.to} className={navClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 text-navy-800 hover:text-copper-500"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.907-4.723 2.311-7.227a1.125 1.125 0 00-1.11-1.302H5.106M7.5 14.25L5.106 5.272M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-copper-500 px-1 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            className="text-navy-800 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-navy-100 bg-cream-50 px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className="rounded px-2 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
              onClick={() => setOpen(false)}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
