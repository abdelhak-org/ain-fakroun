import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const registerSchema = z.object({
  email: z
    .string()
    .email("البريد الإلكتروني غير صالح")
    .min(1, "البريد الإلكتروني مطلوب"),
  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم"
    ),
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => err.message);
      return NextResponse.json(
        { success: false, message: errors[0] },
        { status: 400 }
      );
    }

    const { email, password, name } = validationResult.data;

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "البريد الإلكتروني مسجل مسبقاً" },
        { status: 400 }
      );
    }

    // Create new user (password will be hashed by pre-save hook)
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      name,
      role: "viewer", // Default role for new users
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم إنشاء الحساب بنجاح",
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء إنشاء الحساب" },
      { status: 500 }
    );
  }
}
