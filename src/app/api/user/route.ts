import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { email, phoneNumber, address, city, postalcode, description } =
      await req.json();

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("missions").updateOne(
      { email: email },
      {
        $set: {
          phoneNumber,
          address,
          city,
          postalcode,
          description,
        },
      }
    );

    const updatedUser = await db.collection("users").findOne({ email: email });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
