import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      postalCode,
      city,
      domainName,
      sector,
      description,
      _id,
      lastAOId,
    } = await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("client").insertOne({
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      postalCode,
      city,
      domainName,
      sector,
      description,
      _id: new ObjectId(_id),
      lastAOId,
    });

    return NextResponse.json({ message: "Client created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
