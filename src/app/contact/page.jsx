"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 600);
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-base-content h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Contact us</h1>
        <p className="mt-2">
          We’d love to hear from you. Send a message and we’ll get back soon.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-6 transition hover:shadow-md"
        >
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800/10"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800/10"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800/10"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`rounded bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-60`}
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message sent!"
                : "Send message"}
            </button>
          </div>
        </form>

        <aside className="rounded-2xl border p-6 transition hover:shadow-md">
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <p className="mt-2">
            Prefer email? Reach us at{" "}
            <a
              href="mailto:team@eventum.app"
              className="text-blue-600 underline"
            >
              team@eventum.app
            </a>
            .
          </p>

          <div className="mt-6 space-y-3">
            <p>
              <span className="font-medium">Address:</span> Dhaka, Bangladesh
            </p>
            <p>
              <span className="font-medium">Hours:</span> Sun–Thu, 10:00–18:00
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
