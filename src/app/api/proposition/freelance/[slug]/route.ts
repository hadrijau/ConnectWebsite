import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    const propositions = await db
      .collection("propositions")
      .find({ freelanceId: params.slug })
      .toArray();

    return NextResponse.json(propositions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
