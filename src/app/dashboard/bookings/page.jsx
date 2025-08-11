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
    <div className="max-w-2xl text-base-content">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your bookings</h1>
        <Link href="/dashboard" className="btn btn-outline rounded-2xl">
          Back to My Events
        </Link>
      </div>

      {isLoading && <p className="text-base-content">Loading...</p>}
      {error && <p className="text-red-500">Failed to load bookings</p>}
      {!isLoading && bookings.length === 0 && (
        <p className="text-base-content">No bookings yet.</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id || String(b.createdAt)}
            className="rounded-2xl border p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Event</p>
                <p className="font-semibold">
                  {b.event?.title || "Event deleted"}
                </p>
                <p>
                  {b.event?.date
                    ? new Date(b.event.date).toLocaleString()
                    : "—"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">Booked on</p>
                <p>
                  {b.createdAt ? new Date(b.createdAt).toLocaleString() : "—"}
                </p>
              </div>
            </div>
            {b.note && (
              <p className="mt-2">
                <span className="text-sm">Note: </span>
                {b.note}
              </p>
            )}
            {b.event?._id && (
              <div className="mt-3">
                <Link
                  href={`/dashboard/${b.event._id}`}
                  className="btn btn-outline rounded-2xl"
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
