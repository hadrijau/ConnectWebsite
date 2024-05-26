import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
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
    } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("missions").insertOne({
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

    const missions = await db.collection("missions").find().toArray();

    return NextResponse.json(missions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
