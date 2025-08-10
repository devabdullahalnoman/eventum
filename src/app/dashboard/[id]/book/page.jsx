"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function BookEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [note, setNote] = useState("");

  const { data: eventData, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(`/api/events/${id}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    enabled: !!session?.user?.id && !!id,
  });

  const {
    mutate,
    isLoading: isSubmitting,
    error: submitError,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id, note }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed to book");
      }
      return res.json();
    },
    onSuccess: () => {
      router.push("/dashboard/bookings");
      router.refresh();
    },
  });

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Book event</h1>

      {isLoading && <p>Loading event...</p>}
      {eventData && (
        <div className="mb-6 rounded border bg-white p-4">
          <p className="text-sm text-gray-500">Event</p>
          <p className="text-lg font-semibold">{eventData.title}</p>
          <p className="text-gray-700">
            {eventData.date ? new Date(eventData.date).toLocaleString() : "—"}
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!id) return;
          mutate();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full border rounded p-2"
            placeholder="Anything we should know?"
          />
        </div>

        {submitError && (
          <p className="text-red-600 text-sm">{submitError.message}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isSubmitting ? "Booking..." : "Confirm booking"}
          </button>
          <Link href={`/dashboard/${id}`} className="text-gray-600 underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
