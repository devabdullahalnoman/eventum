"use client";

import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Hamburger for small screens */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden absolute top-4 left-4 z-50 p-2 rounded bg-white border shadow"
        aria-label="Toggle sidebar"
      >
        <HiOutlineMenuAlt2 className="h-6 w-6 text-gray-800" />
      </button>

      {/* Sidebar visibility */}
      <Sidebar visible={open} onClose={() => setOpen(false)} />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
