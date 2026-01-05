"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import type { Mosque } from "@/types";
import { PRAYER_NAMES } from "@/constants";

export default function MosquesPage() {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMosques();
  }, []);

  const fetchMosques = async () => {
    try {
      const res = await fetch("/api/mosques");
      const data = await res.json();
      setMosques(data.data || []);
    } catch (error) {
      console.error("Error fetching mosques:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedName = (mosque: Mosque) => {
    return mosque.nameAr || mosque.name;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">المساجد</h1>
          <p className="text-emerald-100 mt-2">
            ابحث عن المساجد ومواقيت الصلاة في عين فكرون
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : mosques.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🕌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لا توجد مساجد مدرجة بعد
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mosques.map((mosque) => (
              <Link
                key={mosque._id}
                href={`/mosques/${mosque._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
              >
                <div className="h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                  <span className="text-5xl">🕌</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {getLocalizedName(mosque)}
                  </h3>
                  {mosque.imam && (
                    <p className="text-sm text-emerald-600 mb-2">
                      الإمام: {mosque.imam}
                    </p>
                  )}
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 ml-2 shrink-0" />
                      <span className="truncate">{mosque.address}</span>
                    </div>
                    {mosque.phone && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 ml-2 shrink-0" />
                        <a
                          href={`tel:${mosque.phone}`}
                          className="text-blue-600"
                          dir="ltr"
                        >
                          {mosque.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Prayer Times */}
                  {mosque.prayerTimes && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          مواقيت الصلاة
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {mosque.prayerTimes.fajr && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">الفجر</span>
                            <span className="font-medium" dir="ltr">
                              {mosque.prayerTimes.fajr}
                            </span>
                          </div>
                        )}
                        {mosque.prayerTimes.dhuhr && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">الظهر</span>
                            <span className="font-medium" dir="ltr">
                              {mosque.prayerTimes.dhuhr}
                            </span>
                          </div>
                        )}
                        {mosque.prayerTimes.asr && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">العصر</span>
                            <span className="font-medium" dir="ltr">
                              {mosque.prayerTimes.asr}
                            </span>
                          </div>
                        )}
                        {mosque.prayerTimes.maghrib && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">المغرب</span>
                            <span className="font-medium" dir="ltr">
                              {mosque.prayerTimes.maghrib}
                            </span>
                          </div>
                        )}
                        {mosque.prayerTimes.isha && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">العشاء</span>
                            <span className="font-medium" dir="ltr">
                              {mosque.prayerTimes.isha}
                            </span>
                          </div>
                        )}
                        {mosque.prayerTimes.jumua && (
                          <div className="flex justify-between col-span-2 pt-1 border-t">
                            <span className="text-gray-500">الجمعة</span>
                            <span className="font-medium" dir="ltr">
                              {mosque.prayerTimes.jumua}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Facilities */}
                  {mosque.facilities?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        {mosque.facilities.map((facility, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded-full"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center text-emerald-600 text-sm font-medium mt-4">
                    عرض التفاصيل
                    <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
