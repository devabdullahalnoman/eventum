import bcrypt from "bcryptjs";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, password } = body;
    const cleanEmail = (email || "").trim().toLowerCase();

    if (!cleanEmail || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400 }
      );
    }

    const users = dbConnect(collectionNamesObj.userCollection);

    await users.createIndex({ email: 1 }, { unique: true });

    const exists = await users.findOne({ email: cleanEmail });
    if (exists) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await users.insertOne({
      name: name || cleanEmail.split("@")[0],
      email: cleanEmail,
      password: hash,
      provider: "credentials",
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (e) {
    if (String(e?.message || "").includes("E11000")) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409,
      });
    }
    return new Response(
      JSON.stringify({ error: e?.message || "Registration failed" }),
      { status: 500 }
    );
  }
}
