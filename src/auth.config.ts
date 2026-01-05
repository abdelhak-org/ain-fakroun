import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [], // Providers are added in auth.ts
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Protect dashboard routes
      if (pathname.startsWith("/dashboard")) {
        return isLoggedIn;
      }

      // Redirect authenticated users away from auth pages
      if (pathname === "/login" || pathname === "/register") {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "editor" | "viewer";
      }
      return session;
    },
  },
};
