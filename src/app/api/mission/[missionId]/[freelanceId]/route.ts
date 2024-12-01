import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { Proposition } from "@/entities/mission";

// GET /api/mission/[missionId]/[freelanceId]
// Get all propositions for a given freelance and a given mission
export async function GET(
  request: Request,
  { params }: { params: { missionId: string; freelanceId: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Find the mission by its ID and filter propositions by freelanceId
    const mission = await db.collection("missions").findOne(
      {
        _id: new ObjectId(params.missionId), // Convert the missionId to ObjectId
        "propositions.freelanceId": params.freelanceId, // Filter propositions by freelanceId
      },
      {
        projection: { propositions: 1 }, // Only return the propositions field
      }
    );

    // If the mission is not found or no propositions match, return an error
    if (!mission || mission.propositions.length === 0) {
      return NextResponse.json(
        { message: "No propositions found for this freelance ID" },
        { status: 404 }
      );
    }

    // Return the propositions that match the freelanceId
    const filteredPropositions = mission.propositions.filter(
      (proposition: Proposition) =>
        proposition.freelanceId === params.freelanceId
    );

    return NextResponse.json(filteredPropositions, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching propositions" },
      { status: 500 }
    );
  }
}
