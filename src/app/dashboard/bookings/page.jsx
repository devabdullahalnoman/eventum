// src/app/dashboard/bookings/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function BookingsListPage() {
  const { data: session } = useSession();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Failed to load bookings");
      return res.json();
    },
    enabled: !!session?.user?.id,
  });

  const bookings = data?.bookings || [];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your bookings</h1>
        <Link href="/dashboard" className="text-gray-700 underline">
          Back to My Events
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to load bookings</p>}
      {!isLoading && bookings.length === 0 && (
        <p className="text-gray-700">No bookings yet.</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id || String(b.createdAt)}
            className="rounded border bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Event</p>
                <p className="font-semibold">
                  {b.event?.title || "Event deleted"}
                </p>
                <p className="text-gray-700">
                  {b.event?.date
                    ? new Date(b.event.date).toLocaleString()
                    : "—"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Booked on</p>
                <p className="text-gray-700">
                  {b.createdAt ? new Date(b.createdAt).toLocaleString() : "—"}
                </p>
              </div>
            </div>
            {b.note && (
              <p className="mt-2 text-gray-800">
                <span className="text-sm text-gray-500">Note: </span>
                {b.note}
              </p>
            )}
            {b.event?._id && (
              <div className="mt-3">
                <Link
                  href={`/dashboard/${b.event._id}`}
                  className="text-blue-600 underline"
                >
                  View event
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
