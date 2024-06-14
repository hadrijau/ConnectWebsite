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
      experiences,
      enterprise,
      cv,
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
          enterprise,
          experiences,
          cv,
        },
      }
    );
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const result = await db
      .collection("freelance")
      .deleteOne({ email: params.slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Freelance not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Freelance deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
