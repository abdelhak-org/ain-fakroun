"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "الدليل", href: "/directory" },
    { name: "الفعاليات", href: "/events" },
    { name: "المساجد", href: "/mosques" },
    { name: "الصحة", href: "/medical" },
    { name: "الطوارئ", href: "/emergency" },
    { name: "الخريطة", href: "/map" },
  ];

  return (
    <nav className="bg-emerald-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">🏛️</span>
              <span className="text-xl font-bold">عين فكرون</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {/* Auth Buttons */}
              {status === "loading" ? (
                <div className="px-3 py-2">
                  <div className="w-16 h-4 bg-emerald-600 rounded animate-pulse"></div>
                </div>
              ) : session ? (
                <div className="flex items-center gap-2 mr-2">
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-500 transition-colors"
                  >
                    لوحة التحكم
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mr-2">
                  <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors"
                  >
                    دخول
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-white text-emerald-700 hover:bg-gray-100 transition-colors"
                  >
                    تسجيل
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-emerald-600"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="border-t border-emerald-600 mt-2 pt-2">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-emerald-600 hover:bg-emerald-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="block w-full text-right px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-white text-emerald-700 hover:bg-gray-100 mt-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
