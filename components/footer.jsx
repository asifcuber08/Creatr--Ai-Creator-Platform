"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative z-10 bg-black/60 backdrop-blur-xl border-t border-gray-800 text-gray-400 py-4 sm:py-5 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div>
          <h3
            className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 
            bg-clip-text text-transparent transition-all duration-500 hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
          >
            Creatr
          </h3>
          <p className="text-xs mt-1 text-gray-500">
            Built with ❤️ by{" "}
            <span className="text-purple-300 font-medium">Asif Shamim</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-3 text-xs sm:text-sm font-light">
          <Link
            href="/privacy"
            className="hover:text-white transition-all hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-white transition-all hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="hover:text-white transition-all hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
          >
            Contact
          </Link>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-800 pt-3 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} Creatr. All rights reserved.
      </div>
    </motion.footer>
  );
}
