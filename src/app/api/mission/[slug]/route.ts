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
    const objectId = new ObjectId(params.slug);

    const mission = await db.collection("missions").findOne({ _id: objectId });

    return NextResponse.json(mission, { status: 200 });
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
      context,
      goals,
      date,
      price,
      length,
      modalities,
      competences,
    } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();
    const objectId = new ObjectId(params.slug);

    const mission = await db.collection("missions").findOne({ _id: objectId });

    if (!mission) {
      return NextResponse.json(
        { message: "Mission not found" },
        { status: 404 }
      );
    }

    await db.collection("missions").updateOne(
      { _id: objectId },
      {
        $set: {
          title,
          context,
          goals,
          date,
          price,
          length,
          modalities,
          competences,
        },
      }
    );

    const updatedMission = await db
      .collection("missions")
      .findOne({ _id: objectId });

    return NextResponse.json(updatedMission, { status: 200 });
  } catch (err) {
    console.error("Error updating mission:", err);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const objectId = new ObjectId(params.slug);

    const deleteResult = await db
      .collection("missions")
      .deleteOne({ _id: objectId });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "Mission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Mission deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting mission:", err);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
