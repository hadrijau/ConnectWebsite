import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, context, goals, date, price, length, modalities } =
      await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("missions").insertOne({
      title: title,
      context: context,
      goals: goals,
      date: date,
      price: price,
      length: length,
      modalities: modalities,
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
