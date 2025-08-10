"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleAuthBtn from "../googleAuth/GoogleAuthBtn";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Sign up failed");
      }
      router.push("/auth/signIn");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border rounded p-3"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <input
          className="w-full border rounded p-3"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
        />
        <input
          className="w-full border rounded p-3"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          required
        />
        <button
          className="w-full bg-black text-white rounded py-3"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <GoogleAuthBtn></GoogleAuthBtn>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link href="/auth/signIn" className="underline font-medium">
          Sign In
        </Link>
      </p>
    </main>
  );
}
