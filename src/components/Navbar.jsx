"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <nav className="navbar shadow-sm bg-base-200 px-4 sm:px-6">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn border-none rounded-2xl px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {pathname !== "/dashboard" ? (
          <Link
            href="/"
            className="text-xl md:text-4xl font-bold text-base-content"
          >
            Eventum
          </Link>
        ) : (
          <Link href="/" className="text-4xl font-bold text-base-content pl-5">
            Eventum
          </Link>
        )}
      </div>

      <div className="navbar-center hidden lg:flex list-none gap-3">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:bg-neutral-400 p-2 rounded text-lg"
            >
              {label}
            </Link>
          </li>
        ))}
      </div>

      <div className="navbar-end gap-3">
        <div className="flex gap-4 items-center">
          {status === "loading" ? null : session?.user ? (
            <>
              {pathname !== "/dashboard" && (
                <Link href="/dashboard">
                  <Button className="cursor-pointer hover:bg-neutral-400 hover:text-foreground rounded-2xl md:text-lg">
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer hover:bg-neutral-400 hover:text-foreground rounded-2xl md:text-lg"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signUp">
                <Button className="cursor-pointer hover:bg-neutral-400 hover:text-foreground rounded-2xl md:text-lg">
                  Sign Up
                </Button>
              </Link>
              <Link href="/auth/signIn">
                <Button className="cursor-pointer hover:bg-neutral-400 hover:text-foreground rounded-2xl md:text-lg">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
