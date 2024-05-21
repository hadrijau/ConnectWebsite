import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log("HERRRRE");
    console.log("SLUUG", params.slug);
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db
      .collection("freelance")
      .findOne({ email: params.slug });
    console.log("user", user);
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
      email,
      title,
      phone,
      lastMission,
      lengthMissionWanted,
      descriptionMissionWanted,
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

    await db.collection("freelance").updateOne(
      { email: params.slug },
      {
        $set: {
          email,
          title,
          phone,
          lastMission,
          lengthMissionWanted,
          descriptionMissionWanted,
          profilePicture,
        },
      }
    );
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
