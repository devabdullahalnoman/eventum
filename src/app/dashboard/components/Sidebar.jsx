// src/app/dashboard/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "My Events" },
  { href: "/dashboard/add", label: "Add Event" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
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
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
