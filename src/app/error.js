"use client";
export default function Error({ error, reset }) {
  return (
    <div className="p-8 text-red-600">
      <p>Error: {error?.message || "Something went wrong"}</p>
      <button className="btn mt-4" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
