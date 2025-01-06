import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Helper function to validate ObjectId
const isValidObjectId = (id: string) => {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
};

// GET /api/client/mission/[clientId]
// Retrieve all accepted missions for a given client
export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const clientId = params.clientId;

    if (!clientId || !isValidObjectId(clientId)) {
      return NextResponse.json(
        { message: "Invalid or missing client ID" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db();

    const clientData = await db.collection("client").findOne({
      _id: new ObjectId(clientId),
    });

    if (!clientData) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    const acceptedMissionIds = (clientData.acceptedMissions || [])
      .filter((id: string) => isValidObjectId(id))
      .map((id: string) => new ObjectId(id));

    if (acceptedMissionIds.length === 0) {
      return NextResponse.json(
        { message: "No accepted missions found for this client" },
        { status: 404 }
      );
    }

    // Step 2: Fetch the missions
    const missions = await db
      .collection("missions")
      .find({
        _id: { $in: acceptedMissionIds },
      })
      .toArray();

    // Step 3: Extract freelance IDs and fetch the freelance data
    const freelanceIds = missions
      .map((mission) => mission.acceptedFreelanceId)
      .filter(Boolean)
      .map((id) => new ObjectId(id)); // Convert to ObjectId

    const freelancers = await db
      .collection("freelance")
      .find({
        _id: { $in: freelanceIds },
      })
      .toArray();

    // Step 4: Merge missions and freelance data
    const mergedMissions = missions.map((mission) => {
      const freelance = freelancers.find((f) =>
        f._id.equals(new ObjectId(mission.acceptedFreelanceId))
      );

      return {
        ...mission,
        freelanceInfos:
          `${freelance?.firstname} ${freelance?.lastname}` || null,
      };
    });

    return NextResponse.json(
      { acceptedMissions: mergedMissions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving accepted missions:", error);
    return NextResponse.json(
      { message: "Error retrieving accepted missions" },
      { status: 500 }
    );
  }
}
