import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId, note = "" } = await req.json();
  if (!eventId || !ObjectId.isValid(eventId)) {
    return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
  }

  const eventsCol = dbConnect(collectionNamesObj.eventsCollection);
  const bookingsCol = dbConnect(
    collectionNamesObj.bookingCollection ||
      collectionNamesObj.registrationCollection
  );

  const event = await eventsCol.findOne({ _id: new ObjectId(eventId) });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const doc = {
    eventId: new ObjectId(eventId),
    userEmail: session.user.email,
    userName: session.user.name || "",
    note,
    createdAt: new Date(),
  };

  const result = await bookingsCol.insertOne(doc);
  return NextResponse.json({ bookingId: result.insertedId }, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookingsCol = dbConnect(
    collectionNamesObj.bookingCollection ||
      collectionNamesObj.registrationCollection
  );

  const pipeline = [
    { $match: { userEmail: session.user.email } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: collectionNamesObj.eventsCollection,
        localField: "eventId",
        foreignField: "_id",
        as: "event",
      },
    },
    { $unwind: { path: "$event", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        userEmail: 1,
        userName: 1,
        note: 1,
        createdAt: 1,
        eventId: 1,
        event: {
          _id: "$event._id",
          title: "$event.title",
          date: "$event.date",
          updatedAt: "$event.updatedAt",
        },
      },
    },
  ];

  const bookings = await bookingsCol.aggregate(pipeline).toArray();
  return NextResponse.json({ bookings }, { status: 200 });
}
