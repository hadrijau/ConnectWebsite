import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// POST /api/freelance
// Create a new freelance.
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
      enterprise,
      experiences,
      missionsLost,
      missionsPendingApproval,
      missionsApproved,
      missionsLiked,
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
      enterprise,
      experiences,
      missionsLost,
      missionsPendingApproval,
      missionsApproved,
      missionsLiked,
    });

    return NextResponse.json({ message: "Freelance created" }, { status: 201 });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
