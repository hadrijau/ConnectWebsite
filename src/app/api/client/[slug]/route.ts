import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/client/[slug]
// Get a client by email.
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db.collection("client").findOne({ email: params.slug });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

// PUT /api/client/[slug]
// Update a client by email.
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const {
      email,
      domainName,
      phoneNumber,
      address,
      postalCode,
      city,
      description,
      sector,
      lastAOId,
      missions,
      acceptedMissions,
    } = await req.json();
    const client = await connectToDatabase();
    const db = client.db();

    const user = await db.collection("client").findOne({ email: params.slug });

    if (!user) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    await db.collection("client").updateOne(
      { email: params.slug },
      {
        $set: {
          email,
          domainName,
          phoneNumber,
          postalCode,
          address,
          city,
          description,
          sector,
          lastAOId,
          missions,
          acceptedMissions,
        },
      }
    );
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

// DELETE /api/client/[slug]
// Delete a client by email.
export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const result = await db
      .collection("client")
      .deleteOne({ email: params.slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
