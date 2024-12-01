import Client from "@/entities/client";
import Mission from "@/entities/mission";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      clientId,
      title,
      context,
      goals,
      date,
      price,
      length,
      modalities,
      competences,
      hiddenCompany,
      createdAt,
      hiddenMissionPlace,
      hiddenTJM,
      aoId,
      city,
      postalCode,
      companyName,
      status,
      propositions,
    } = await req.json();

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db();

    // Insert the new mission into the database
    const result = await db.collection("missions").insertOne({
      clientId,
      title,
      context,
      goals,
      date,
      price,
      length,
      modalities,
      competences,
      hiddenCompany,
      hiddenMissionPlace,
      hiddenTJM,
      createdAt,
      aoId,
      city,
      postalCode,
      companyName,
      status,
      propositions,
    });

    // Fetch the newly inserted mission using the inserted _id
    const newMission = await db
      .collection("missions")
      .findOne({ _id: result.insertedId });

    if (!newMission) {
      return NextResponse.json(
        { message: "Mission creation failed" },
        { status: 500 }
      );
    }

    // Return the newly created mission
    return NextResponse.json({ mission: newMission }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const missions = await db.collection("missions").find().toArray();
    return NextResponse.json(missions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
