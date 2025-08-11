"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EventViewPage() {
  const { id } = useParams();
  const { data: session } = useSession();

  const { data, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(`/api/events/${id}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    enabled: !!session?.user?.id && !!id,
  });

  return (
    <div className="max-w-2xl text-base-content">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Event details</h1>
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/${id}/book`}
            className="text-base-content btn btn-outline rounded-2xl"
          >
            Book this event
          </Link>
          <Link
            href={`/dashboard/${id}/edit`}
            className="text-base-content btn btn-outline rounded-2xl"
          >
            Edit
          </Link>
        </div>
      </div>

      {isLoading && <p className="text-base-content">Loading...</p>}
      {error && <p className="text-red-500">Failed to load event</p>}
      {!isLoading && !data && <p className="text-base-content">Not found.</p>}

      {data && (
        <div className="rounded border text-base-content p-6 space-y-4">
          <div>
            <p className="text-sm">Title</p>
            <p className="text-lg font-semibold">{data.title}</p>
          </div>

          <div>
            <p className="text-sm">Description</p>
            <p className="whitespace-pre-wrap">
              {data.description || "No description"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm">Date</p>
              <p className="">
                {data.date ? new Date(data.date).toLocaleDateString() : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm">Updated</p>
              <p>
                {data.updatedAt
                  ? new Date(data.updatedAt).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/dashboard" className="btn btn-outline rounded-2xl">
              Back to My Events
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
