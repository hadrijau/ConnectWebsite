import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Get all missions from all clients.
export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const allMissions = await db
      .collection("clients")
      .aggregate([
        { $unwind: "$missions" },
        { $replaceRoot: { newRoot: "$missions" } },
      ])
      .toArray();
    return NextResponse.json({ missions: allMissions }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

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
