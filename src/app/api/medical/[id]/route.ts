import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Medical } from "@/models";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const facility = await Medical.findById(id).lean();

    if (!facility) {
      return NextResponse.json(
        { error: "Medical facility not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: facility });
  } catch (error) {
    console.error("Error fetching medical facility:", error);
    return NextResponse.json(
      { error: "Failed to fetch medical facility" },
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

    const facility = await Medical.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!facility) {
      return NextResponse.json(
        { error: "Medical facility not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: facility });
  } catch (error) {
    console.error("Error updating medical facility:", error);
    return NextResponse.json(
      { error: "Failed to update medical facility" },
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

    const facility = await Medical.findByIdAndDelete(id);

    if (!facility) {
      return NextResponse.json(
        { error: "Medical facility not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Medical facility deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting medical facility:", error);
    return NextResponse.json(
      { error: "Failed to delete medical facility" },
      { status: 500 }
    );
  }
}
