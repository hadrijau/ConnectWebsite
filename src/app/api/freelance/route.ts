import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      _id,
      title,
      phone,
      firstname,
      lastname,
      email,
      lastMission,
      lengthMissionWanted,
      descriptionMissionWanted,
      competences,
      profilePicture,
    } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();
    await db.collection("freelance").insertOne({
      _id: new ObjectId(_id),
      title,
      phone,
      firstname,
      lastname,
      email,
      lastMission,
      lengthMissionWanted,
      descriptionMissionWanted,
      competences,
      profilePicture,
    });

    return NextResponse.json({ message: "Mission created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
