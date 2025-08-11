"use client";

import Link from "next/link";

export default function EventCard({ event }) {
  const { _id, title, description, date, updatedAt } = event || {};

  return (
    <div className="rounded-2xl border text-base-content p-4 space-y-3 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold line-clamp-1">
          {title || "Untitled"}
        </h2>
        {_id && (
          <Link
            href={`/dashboard/${_id}`}
            className="btn btn-outline rounded-2xl"
          >
            View
          </Link>
        )}
      </div>

      <p className="text-sm">
        {description || "No description"}
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm pt-2">
        <div>
          <p>Date</p>
          <p>{date ? new Date(date).toLocaleDateString() : "—"}</p>
        </div>
        <div>
          <p>Updated</p>
          <p>{updatedAt ? new Date(updatedAt).toLocaleString() : "—"}</p>
        </div>
      </div>
    </div>
  );
}
