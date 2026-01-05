import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Event } from "@/models";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const upcoming = searchParams.get("upcoming") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { isActive: true };

    if (category && category !== "all") {
      query.category = category;
    }

    if (upcoming) {
      query.startDate = { $gte: new Date() };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const [events, total] = await Promise.all([
      Event.find(query)
        .sort({ startDate: upcoming ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Event.countDocuments(query),
    ]);

    return NextResponse.json({
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const event = await Event.create(body);

    return NextResponse.json({ data: event }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
