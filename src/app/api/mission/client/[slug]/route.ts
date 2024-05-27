import Client from "@/entities/client";
import Mission from "@/entities/mission";
import { connectToDatabase } from "@/lib/db";
import { Db, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    console.log("slug", params.slug);
    const missions = await db
      .collection("missions")
      .find({ clientId: params.slug })
      .toArray();

    console.log("missions", missions);
    return NextResponse.json(missions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
