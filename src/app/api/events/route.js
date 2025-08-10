import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

function serializeId(doc) {
  if (!doc) return doc;
  if (Array.isArray(doc)) return doc.map(serializeId);
  if (doc._id && typeof doc._id === "object") {
    return { ...doc, _id: String(doc._id) };
  }
  return doc;
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const mine = url.searchParams.get("mine") === "1";

    const events = dbConnect(collectionNamesObj.eventsCollection);
    let filter = {};

    if (mine) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) return NextResponse.json([]);
      filter.createdBy = session.user.id;
    }

    const list = await events.find(filter).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(serializeId(list));
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, date } = await req.json();
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const events = dbConnect(collectionNamesObj.eventsCollection);

    const doc = {
      title: title.trim(),
      description: typeof description === "string" ? description : "",
      date: date || null,
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await events.insertOne(doc);

    revalidatePath("/dashboard/events");
    return NextResponse.json(
      { ok: true, id: String(insertedId) },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to create" },
      { status: 500 }
    );
  }
}
