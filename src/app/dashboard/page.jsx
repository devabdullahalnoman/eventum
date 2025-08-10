// src/app/dashboard/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function MyEventsPage() {
  const { data: session } = useSession();

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", session?.user?.id],
    queryFn: async () => {
      const res = await fetch("/api/events?mine=1");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error fetching events</p>}
      {data?.length === 0 && <p>No events yet.</p>}

      <ul className="space-y-4">
        {data?.map((event) => (
          <li key={event._id} className="border p-4 rounded bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                {event.date && (
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                )}
                <p className="text-gray-700 mt-1 line-clamp-2">
                  {event.description || "No description"}
                </p>
              </div>
              <div className="shrink-0 space-x-3">
                <Link
                  href={`/dashboard/${event._id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
                <Link
                  href={`/dashboard/${event._id}/edit`}
                  className="text-gray-700 underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
