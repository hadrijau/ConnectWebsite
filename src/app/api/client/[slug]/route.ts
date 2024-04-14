import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

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
        },
      }
    );
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
