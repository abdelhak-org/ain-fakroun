import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { EmergencyContact } from "@/models";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const query: Record<string, unknown> = { isActive: true };

    if (type && type !== "all") {
      query.type = type;
    }

    const contacts = await EmergencyContact.find(query)
      .sort({ priority: 1, name: 1 })
      .lean();

    return NextResponse.json({ data: contacts });
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch emergency contacts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const contact = await EmergencyContact.create(body);
    return NextResponse.json({ data: contact }, { status: 201 });
  } catch (error) {
    console.error("Error creating emergency contact:", error);
    return NextResponse.json(
      { error: "Failed to create emergency contact" },
      { status: 500 }
    );
  }
}
