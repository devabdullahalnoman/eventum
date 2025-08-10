"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <div className="flex gap-4 items-center">
            {status === "loading" ? null : session?.user ? (
              <>
                <Link href="/dashboard">
                  <Button className="cursor-pointer hover:bg-neutral-400 hover:text-foreground">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer hover:bg-neutral-400 hover:text-foreground"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signUp">
                  <Button className="cursor-pointer hover:bg-neutral-400 hover:text-foreground">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/auth/signIn">
                  <Button className="cursor-pointer hover:bg-neutral-400 hover:text-foreground">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
