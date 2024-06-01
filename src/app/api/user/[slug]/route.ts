import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db.collection("users").findOne({ email: params.slug });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { type } = await req.json();
    const client = await connectToDatabase();
    const db = client.db();

    const user = await db.collection("users").findOne({ email: params.slug });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.collection("users").updateOne(
      { email: params.slug },
      {
        $set: {
          type,
        },
      }
    );
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
