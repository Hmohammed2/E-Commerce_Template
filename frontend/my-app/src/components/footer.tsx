"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Instagram } from "lucide-react"; // Lucide icons

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const router = useRouter();

  return (
    <footer className="border-t shadow-md mx-auto px-6 py-4 flex items-center justify-between md:justify-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div>
            <Image
              src="/Logo.webp"
              alt="ArcadeStickLabs Logo"
              width={128}
              height={128}
              className="w-32 mb-4 rounded-lg"
            />
          </div>

          {/* Navigation Links */}
          {/* <div>
            <h4 className="text-xl font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {linksToRender.map(({ href, label, onClick }) => (
                <li key={label}>
                  {onClick ? (
                    <button
                      onClick={onClick}
                      className="hover:text-gray-200 transition-colors duration-200"
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-gray-200 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul> */}
          {/* </div> */}

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
            <p className="text-gray-800 mb-4">
              Subscribe to our newsletter for updates and tips.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-l-full text-gray-800 focus:outline-gray-800"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-pink-600 text-white px-6 rounded-r-full font-semibold hover:bg-pink-800 transition-colors duration-200"
              >
                {status === "loading" ? "…" : "Subscribe"}
              </button>
            </form>

            {status === "success" && (
              <p className="text-green-400 mt-2">Thanks for subscribing! 🎉</p>
            )}
            {status === "error" && (
              <p className="text-red-400 mt-2">Oops—something went wrong.</p>
            )}

            <div className="flex space-x-4 mt-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/_umm.salamah?igsh=bgrjmxlvdthod2m3"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="container mx-auto px-4 mt-8 text-center space-x-6">
          <Link
            href="/terms"
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
          >
            Cookies Policy
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <p className="text-center text-gray-400">
            &copy; 2025 ArcadeStickLabs. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
