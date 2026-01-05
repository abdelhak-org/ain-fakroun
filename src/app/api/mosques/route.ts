import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Mosque } from "@/models";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    const [mosques, total] = await Promise.all([
      Mosque.find(query).sort({ name: 1 }).skip(skip).limit(limit).lean(),
      Mosque.countDocuments(query),
    ]);

    return NextResponse.json({
      data: mosques,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching mosques:", error);
    return NextResponse.json(
      { error: "Failed to fetch mosques" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const mosque = await Mosque.create(body);
    return NextResponse.json({ data: mosque }, { status: 201 });
  } catch (error) {
    console.error("Error creating mosque:", error);
    return NextResponse.json(
      { error: "Failed to create mosque" },
      { status: 500 }
    );
  }
}
