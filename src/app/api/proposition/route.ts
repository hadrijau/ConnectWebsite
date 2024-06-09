import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      missionId,
      freelanceId,
      cv,
      clientStatus,
      freelanceStatus,
      freelance,
      freelanceEnterprise,
      clientDisponibility,
      freelanceDisponibility,
      city,
      freelanceProposedPrice,
      clientProposedPrice,
      modalities,
      title,
      companyName,
      length,
      whyMe,
    } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("propositions").insertOne({
      missionId,
      freelanceId,
      cv,
      clientStatus,
      freelanceStatus,
      freelance,
      freelanceEnterprise,
      clientDisponibility,
      freelanceDisponibility,
      city,
      freelanceProposedPrice,
      clientProposedPrice,
      modalities,
      title,
      whyMe,
      companyName,
      length,
    });

    return NextResponse.json(
      { message: "Proposition created" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const missions = await db.collection("propositions").find().toArray();
    return NextResponse.json(missions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
