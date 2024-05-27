import Client from "@/entities/client";
import Mission from "@/entities/mission";
import { connectToDatabase } from "@/lib/db";
import { Db, ObjectId } from "mongodb";
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
    } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("missions").insertOne({
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
    });

    return NextResponse.json({ message: "Mission created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    console.log("HERRRRRE");
    const missions = await db.collection("missions").find().toArray();
    console.log("DAATTTA", missions);
    return NextResponse.json(missions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
