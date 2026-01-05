import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Mosque } from "@/models";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const mosque = await Mosque.findById(id).lean();

    if (!mosque) {
      return NextResponse.json({ error: "Mosque not found" }, { status: 404 });
    }

    return NextResponse.json({ data: mosque });
  } catch (error) {
    console.error("Error fetching mosque:", error);
    return NextResponse.json(
      { error: "Failed to fetch mosque" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const mosque = await Mosque.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!mosque) {
      return NextResponse.json({ error: "Mosque not found" }, { status: 404 });
    }

    return NextResponse.json({ data: mosque });
  } catch (error) {
    console.error("Error updating mosque:", error);
    return NextResponse.json(
      { error: "Failed to update mosque" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const mosque = await Mosque.findByIdAndDelete(id);

    if (!mosque) {
      return NextResponse.json({ error: "Mosque not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Mosque deleted successfully" });
  } catch (error) {
    console.error("Error deleting mosque:", error);
    return NextResponse.json(
      { error: "Failed to delete mosque" },
      { status: 500 }
    );
  }
}
