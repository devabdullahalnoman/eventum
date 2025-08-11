"use client";
import { signIn } from "next-auth/react";

export default function GoogleAuthBtn({ callbackUrl = "/" }) {
  return (
    <button
      className="w-full border rounded py-3 mt-4 hover:bg-gray-400"
      onClick={() => signIn("google", { callbackUrl })}
    >
      Continue with Google
    </button>
  );
}
