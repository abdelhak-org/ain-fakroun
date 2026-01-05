import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Medical } from "@/models";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const emergency = searchParams.get("emergency") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { isActive: true };

    if (type && type !== "all") {
      query.type = type;
    }

    if (emergency) {
      query.isEmergency24h = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const [facilities, total] = await Promise.all([
      Medical.find(query)
        .sort({ isEmergency24h: -1, name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Medical.countDocuments(query),
    ]);

    return NextResponse.json({
      data: facilities,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching medical facilities:", error);
    return NextResponse.json(
      { error: "Failed to fetch medical facilities" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const facility = await Medical.create(body);
    return NextResponse.json({ data: facility }, { status: 201 });
  } catch (error) {
    console.error("Error creating medical facility:", error);
    return NextResponse.json(
      { error: "Failed to create medical facility" },
      { status: 500 }
    );
  }
}
