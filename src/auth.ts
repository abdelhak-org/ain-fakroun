import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "البريد الإلكتروني", type: "email" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("البريد الإلكتروني وكلمة المرور مطلوبان");
        }

        await dbConnect();

        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase(),
        });

        if (!user) {
          throw new Error("بيانات الاعتماد غير صحيحة");
        }

        if (!user.isActive) {
          throw new Error("الحساب غير مفعل");
        }

        const isPasswordValid = await user.comparePassword(
          credentials.password as string
        );

        if (!isPasswordValid) {
          throw new Error("بيانات الاعتماد غير صحيحة");
        }

        // Update last login
        await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
