"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">عين فكرون</h3>
            <p className="text-gray-400 text-sm">
              البوابة الرسمية لمدينة عين فكرون، أم البواقي، الجزائر. بوابتك إلى
              الخدمات المحلية والأعمال والفعاليات المجتمعية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/directory"
                  className="text-gray-400 hover:text-white"
                >
                  الدليل
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white">
                  الفعاليات
                </Link>
              </li>
              <li>
                <Link
                  href="/emergency"
                  className="text-gray-400 hover:text-white"
                >
                  الطوارئ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  حول
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الخدمات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/medical"
                  className="text-gray-400 hover:text-white"
                >
                  الصحة
                </Link>
              </li>
              <li>
                <Link
                  href="/mosques"
                  className="text-gray-400 hover:text-white"
                >
                  المساجد
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-400 hover:text-white">
                  الخريطة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>عين فكرون، أم البواقي، الجزائر</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span dir="ltr">+213 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@ainfakroun.dz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} بوابة مدينة عين فكرون. جميع الحقوق
            محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
