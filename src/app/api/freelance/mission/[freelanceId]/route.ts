import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Helper function to validate ObjectId
const isValidObjectId = (id: string) => {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
};

// GET /api/freelance/mission/[freelanceId]
// Get all missions for a given freelance
export async function GET(
  req: Request,
  { params }: { params: { freelanceId: string } }
) {
  try {
    const freelanceId = params.freelanceId;
    if (!freelanceId) {
      return NextResponse.json(
        { message: "Freelance ID is required" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db();

    // Retrieve the freelance data
    const freelance = await db.collection("freelance").findOne({
      _id: new ObjectId(freelanceId),
    });

    if (!freelance) {
      return NextResponse.json(
        { message: "Freelance not found" },
        { status: 404 }
      );
    }

    // Validate and convert mission ID arrays to ObjectId
    const missionsApprovedIds = (freelance.missionsApproved || [])
      .filter((id: string) => isValidObjectId(id))
      .map((id: string) => new ObjectId(id));

    const missionsPendingApprovalIds = (freelance.missionsPendingApproval || [])
      .filter((id: string) => isValidObjectId(id))
      .map((id: string) => new ObjectId(id));

    const missionsLikedIds = (freelance.missionsLiked || [])
      .filter((id: string) => isValidObjectId(id))
      .map((id: string) => new ObjectId(id));

    const missionsLostIds = (freelance.missionsLost || [])
      .filter((id: string) => isValidObjectId(id))
      .map((id: string) => new ObjectId(id));

    // Retrieve missions based on the mission IDs
    const [approvedMissions, pendingMissions, likedMissions, lostMissions] =
      await Promise.all([
        db
          .collection("missions")
          .find({ _id: { $in: missionsApprovedIds } })
          .toArray(),
        db
          .collection("missions")
          .find({ _id: { $in: missionsPendingApprovalIds } })
          .toArray(),
        db
          .collection("missions")
          .find({ _id: { $in: missionsLikedIds } })
          .toArray(),
        db
          .collection("missions")
          .find({ _id: { $in: missionsLostIds } })
          .toArray(),
      ]);

    return NextResponse.json({
      approvedMissions,
      pendingMissions,
      likedMissions,
      lostMissions,
    });
  } catch (error) {
    console.error("Error retrieving missions:", error);
    return NextResponse.json(
      { message: "Error retrieving missions" },
      { status: 500 }
    );
  }
}
