"use client"; // needed if using Next.js App Router

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { FC } from "react";
import Image from 'next/image'
import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: "#products", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#how", label: "How it works" },
];

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-white shadow-sm w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        >
          <Image
            width={140}
            height={40}
            src="/logo.webp"
            alt="ArcadeStickLabs Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-pink-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col space-y-2 p-4 text-gray-600">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // close menu after click
                className="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;