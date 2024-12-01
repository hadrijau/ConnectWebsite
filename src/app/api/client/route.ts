import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// POST /api/client
// Create a new client.
export async function POST(req: Request) {
  try {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      postalCode,
      city,
      domainName,
      sector,
      description,
      _id,
      lastAOId,
      missions,
      acceptedMissions,
    } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("client").insertOne({
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      postalCode,
      city,
      domainName,
      sector,
      description,
      _id: new ObjectId(_id),
      lastAOId,
      missions,
      acceptedMissions,
    });

    return NextResponse.json({ message: "Client created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
