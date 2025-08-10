import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = await dbConnect("events");

    const items = await collection.find({}).toArray();

    return NextResponse.json({ data: items });
  } catch (err) {
    console.error("[/api/events/all] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch events." },
      { status: 500 }
    );
  }
}
