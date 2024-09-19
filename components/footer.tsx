"use client";
import { CONSTANTS } from "@/text/landing";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <nav className="flex gap-4 text-sm">
            <Link
              href="#"
              className="font-medium transition-colors hover:underline underline-offset-4"
            >
              {CONSTANTS.FOOTER_TERMS}
            </Link>
            <Link
              href="#"
              className="font-medium transition-colors hover:underline underline-offset-4"
            >
              {CONSTANTS.FOOTER_PRIVACY}
            </Link>
          </nav>
          <div className="text-center text-sm">
            {CONSTANTS.FOOTER_COPYRIGHT}
          </div>
        </div>
      </footer>
  );
}
