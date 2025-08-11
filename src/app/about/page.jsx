export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 text-base-content">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">About Eventum</h1>
        <p className="mt-2">
          A simple, focused tool for creating, managing, and showcasing events —
          built for speed, clarity, and ownership.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border-2xl p-6 transition hover:shadow-md bg-base-300">
          <h2 className="text-xl font-semibold">Our mission</h2>
          <p className="mt-2">
            Empower creators and teams to run events without friction. From
            drafting details to sharing with your audience, Eventum keeps
            everything crisp and efficient.
          </p>
        </div>

        <div className="rounded-lg border-2xl p-6 transition hover:shadow-md bg-base-300">
          <h2 className="text-xl font-semibold">What we value</h2>
          <ul className="mt-2 space-y-2">
            <li>• Clarity over complexity</li>
            <li>• Ownership and security by default</li>
            <li>• Predictable performance at scale</li>
          </ul>
        </div>

        <div className="rounded-lg border-2xl p-6 transition hover:shadow-md bg-base-300">
          <h2 className="text-xl font-semibold">Built for developers</h2>
          <p className="mt-2">
            Production-ready foundations with modern Next.js patterns, clean
            APIs, and a dashboard that respects your workflow.
          </p>
        </div>

        <div className="rounded-lg border-2xl p-6 transition hover:shadow-md bg-base-300">
          <h2 className="text-xl font-semibold">For real-world teams</h2>
          <p className="mt-2">
            Fast to onboard, easy to manage, and flexible enough to grow with
            your needs — from small meetups to larger launches.
          </p>
        </div>
      </div>

      <footer className="mt-12">
        <p>
          Have questions?{" "}
          <a href="/contact" className="text-blue-600 underline">
            Contact us
          </a>
          .
        </p>
      </footer>
    </section>
  );
}
