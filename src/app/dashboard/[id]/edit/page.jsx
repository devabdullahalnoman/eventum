// src/app/dashboard/[id]/edit/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EventEditPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(`/api/events/${id}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    enabled: !!session?.user?.id && !!id,
  });

  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [feedback, setFeedback] = useState({ error: "", success: "" });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || "",
        description: data.description || "",
        date: data.date ? data.date.slice(0, 10) : "",
      });
    }
  }, [data]);

  async function handleUpdate(e) {
    e.preventDefault();
    setFeedback({ error: "", success: "" });

    const res = await fetch(`/api/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await res.json();

    if (!res.ok) {
      setFeedback({ error: result.error || "Update failed" });
    } else {
      setFeedback({ success: "Event updated successfully" });
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    const result = await res.json();

    if (!res.ok) {
      setFeedback({ error: result.error || "Delete failed" });
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Edit event</h1>
        <Link href={`/dashboard/${id}`} className="text-gray-700 underline">
          View
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to load event</p>}
      {!isLoading && !data && <p className="text-gray-700">Not found.</p>}

      {data && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />

          {feedback.error && <p className="text-red-500">{feedback.error}</p>}
          {feedback.success && (
            <p className="text-green-600">{feedback.success}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
