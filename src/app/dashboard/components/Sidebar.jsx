"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiX } from "react-icons/hi";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "My Events" },
  { href: "/dashboard/add", label: "Add Event" },
  { href: "/dashboard/all", label: "All Events" },
  { href: "/dashboard/bookings", label: "My Bookings" },
];

export default function Sidebar({ visible = true, onClose }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed sm:static inset-y-0 left-0 z-40 transform ${
        visible ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 sm:translate-x-0 w-64 bg-white border-r px-4 py-6`}
    >
      <div className="flex items-center justify-between mb-6 pt-10 sm:pt-0 sm:hidden">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-600 hover:text-gray-800"
          aria-label="Close sidebar"
        >
          <HiX className="h-5 w-5" />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 hidden sm:block">Dashboard</h2>

      <nav className="space-y-2">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded hover:bg-gray-100 transition ${
                active ? "bg-gray-200 font-medium" : ""
              }`}
              aria-current={active ? "page" : undefined}
              onClick={onClose}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
