import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db
      .collection("freelance")
      .findOne({ email: params.slug });
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
    const {
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

    const user = await db
      .collection("freelance")
      .findOne({ email: params.slug });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("params", params.slug);
    await db.collection("freelance").updateOne(
      { email: params.slug },
      {
        $set: {
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
        },
      }
    );
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
