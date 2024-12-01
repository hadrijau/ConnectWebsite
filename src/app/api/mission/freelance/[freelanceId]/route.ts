import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Get all propositions for a given freelance
export async function GET(
  request: Request,
  { params }: { params: { freelanceId: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Find all missions that contain a proposition with the freelanceId
    const missions = await db
      .collection("missions")
      .find(
        {
          "propositions.freelanceId": params.freelanceId, // Filtering missions where the proposition has the freelanceId
        },
        {
          projection: { propositions: 1, title: 1, _id: 1 }, // Only return mission's propositions and title
        }
      )
      .toArray();

    console.log("mission", missions);
    // Filter out the propositions that match the freelanceId in each mission
    const allPropositionsForFreelance = missions.flatMap((mission) =>
      mission.propositions.filter(
        (proposition) => proposition.freelanceId === params.freelanceId
      )
    );

    // If no propositions are found, return a 404 error
    if (allPropositionsForFreelance.length === 0) {
      return NextResponse.json(
        { message: "No propositions found for this freelance ID" },
        { status: 404 }
      );
    }

    // Return the filtered propositions
    return NextResponse.json(allPropositionsForFreelance, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching propositions" },
      { status: 500 }
    );
  }
}
