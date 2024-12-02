import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Add a mission to a client.
export async function POST(req: Request) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    const body = await req.json();
    const { clientId, mission } = body;

    if (!clientId || !mission) {
      return NextResponse.json(
        { message: "clientId and mission data are required" },
        { status: 400 }
      );
    }

    const result = await db
      .collection("clients")
      .updateOne(
        { _id: new ObjectId(clientId) },
        { $push: { missions: mission } }
      );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Client not found or mission not added" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Mission added successfully" },
      { status: 200 }
    );
  } catch (err) {
    const error = err as Error;
    console.error("Error adding mission:", error.message);
    return NextResponse.json(
      { message: "ERROR", error: error.message },
      { status: 500 }
    );
  }
}
