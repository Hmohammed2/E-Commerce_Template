"use client";

import { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: "#about", label: "About Us" },
  { href: "#how", label: "How it works" },
];

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query);
      // TODO: hook into Django search endpoint
    }
  };

  return (
    <header className="bg-white shadow-sm w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:justify-center gap-6">
        {/* Logo */}
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

        {/* Search bar (desktop only) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border rounded-lg px-3 py-1.5 flex-1 max-w-md"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-grow outline-none text-sm text-gray-700"
          />
          <button type="submit" aria-label="Search">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </form>

        {/* Desktop Nav + Actions */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-8 text-sm text-gray-600">
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

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="px-4 py-2 text-sm text-gray-600 hover:text-pink-600 transition"
            >
              Shop
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-md border text-sm text-black hover:text-pink-800 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md border text-sm text-white bg-pink-600 hover:bg-pink-800 transition"
            >
              Register
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-pink-600 transition" />
              {/* Badge */}
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1.5">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger + Cart */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link
            href="/cart"
            className="p-2 rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition"
          >
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border rounded-lg mx-4 my-3 px-3 py-1.5"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-grow outline-none text-sm text-gray-700"
            />
            <button type="submit" aria-label="Search">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </form>

          {/* Mobile Nav */}
          <nav className="flex flex-col space-y-2 p-4 text-gray-600">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Actions */}
            <Link
              href="/shop"
              className="block py-2 px-3 rounded mt-2 text-black"
            >
              Shop
            </Link>

            {/* Actions */}
            <Link
              href="/login"
              className="block py-2 px-3 rounded border mt-2 text-black transition"
            >
              Login
            </Link>

            {/* Actions */}
            <Link
              href="/register"
              className="block py-2 px-3 rounded border mt-2 text-white bg-pink-600 hover:bg-pink-800 transition"
            >
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
