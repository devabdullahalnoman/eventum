import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

function serializeId(doc) {
  if (!doc) return doc;
  if (doc._id && typeof doc._id === "object") {
    return { ...doc, _id: String(doc._id) };
  }
  return doc;
}

export async function GET(_req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // await params
    const _id = toObjectId(id);
    if (!_id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const events = dbConnect(collectionNamesObj.eventsCollection);
    const item = await events.findOne({ _id, createdBy: session.user.id });

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(serializeId(item));
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // await params
    const _id = toObjectId(id);
    if (!_id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const payload = await req.json();

    const events = dbConnect(collectionNamesObj.eventsCollection);
    const existing = await events.findOne({ _id });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (existing.createdBy !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const update = { $set: { updatedAt: new Date() } };
    if (typeof payload.title === "string" && payload.title.trim().length > 0) {
      update.$set.title = payload.title.trim();
    }
    if (typeof payload.description === "string") {
      update.$set.description = payload.description;
    }
    if (payload.date !== undefined) {
      update.$set.date = payload.date || null;
    }

    await events.updateOne({ _id }, update);
    revalidatePath("/dashboard/events");
    revalidatePath(`/dashboard/events/${id}`); // use resolved id

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // await params
    const _id = toObjectId(id);
    if (!_id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const events = dbConnect(collectionNamesObj.eventsCollection);
    const existing = await events.findOne({ _id });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (existing.createdBy !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await events.deleteOne({ _id });
    revalidatePath("/dashboard/events");

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to delete" },
      { status: 500 }
    );
  }
}
