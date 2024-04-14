import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, firstname, lastname } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("client").insertOne({
      email,
      firstname,
      lastname,
    });

    return NextResponse.json({ message: "Client created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
