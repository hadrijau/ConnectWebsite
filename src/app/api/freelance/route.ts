import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, firstname, lastname } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    console.log("here");
    await db.collection("freelance").insertOne({
      email,
      firstname,
      lastname,
    });

    console.log("CREATED");
    return NextResponse.json({ message: "Mission created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
