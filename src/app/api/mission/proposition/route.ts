import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Update the proposition status to OPENED
export async function PUT(req: Request) {
  try {
    const { missionId, freelanceId } = await req.json();

    if (!missionId || !freelanceId) {
      return NextResponse.json(
        { message: "Mission ID, Freelance ID, and Client ID are required" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db();

    // Update the proposition status to OPENED
    const result = await db.collection("missions").updateOne(
      {
        _id: new ObjectId(missionId), // Find the mission by its ID
        "propositions.freelanceId": freelanceId, // Find the specific proposition
      },
      {
        $set: { "propositions.$.status": "Ouvert" }, // Update the status to "Ouvert" (OPENED)
      }
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No proposition found or status already updated" },
        { status: 404 }
      );
    }

    // Fetch the updated mission
    const updatedMission = await db.collection("missions").findOne({
      _id: new ObjectId(missionId),
    });

    if (!updatedMission) {
      return NextResponse.json(
        { message: "Mission not found after update" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Proposition status updated", mission: updatedMission },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

// Delete a proposition from a mission
export async function DELETE(req: Request) {
  try {
    const { missionId, freelanceId } = await req.json();

    if (!missionId || !freelanceId) {
      return NextResponse.json(
        { message: "Mission ID and Freelance ID are required" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db();

    // Remove the proposition from the mission
    const result = await db.collection("missions").updateOne(
      {
        _id: new ObjectId(missionId),
      },
      {
        //@ts-ignore
        $pull: {
          propositions: { freelanceId }, // Match the freelanceId in the propositions array
        },
      }
    );

    // Check if the deletion was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No matching proposition found for deletion" },
        { status: 404 }
      );
    }

    // Fetch the updated mission (optional, for response confirmation)
    const updatedMission = await db.collection("missions").findOne({
      _id: new ObjectId(missionId),
    });

    if (!updatedMission) {
      return NextResponse.json(
        { message: "Mission not found after update" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Proposition deleted successfully", mission: updatedMission },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
