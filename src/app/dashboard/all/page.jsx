"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../components/EventCard";

async function fetchAllEvents() {
  const res = await fetch("/api/events/all");
  if (!res.ok) throw new Error("Network response was not ok");
  const result = await res.json();
  return result?.data || [];
}

export default function AllEventsPage() {
  const { data: session, status } = useSession();

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-events"],
    queryFn: fetchAllEvents,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <p>loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load events.</p>;

  return (
    <section className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Events</h1>
      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
