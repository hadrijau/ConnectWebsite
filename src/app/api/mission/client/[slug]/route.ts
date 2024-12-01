import Client from "@/entities/client";
import Mission from "@/entities/mission";
import { connectToDatabase } from "@/lib/db";
import { Db, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Get all missions from a client.
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const missions = await db
      .collection("missions")
      .find({ clientId: params.slug })
      .toArray();

    return NextResponse.json(missions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
