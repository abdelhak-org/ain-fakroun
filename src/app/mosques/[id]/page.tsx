"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  User,
  CheckCircle,
} from "lucide-react";
import type { Mosque } from "@/types";
import { PRAYER_NAMES, MOSQUE_FACILITY_LABELS } from "@/constants";

export default function MosqueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [mosque, setMosque] = useState<Mosque | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMosque = async () => {
      try {
        const res = await fetch(`/api/mosques/${id}`);
        if (!res.ok) {
          throw new Error("Mosque not found");
        }
        const data = await res.json();
        setMosque(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    };

    fetchMosque();
  }, [id]);

  const getLocalizedName = (m: Mosque) => m.nameAr || m.name;
  const getLocalizedDescription = (m: Mosque) =>
    m.descriptionAr || m.description;
  const getLocalizedAddress = (m: Mosque) => m.addressAr || m.address;

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-amber-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-amber-600 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-amber-600 rounded w-1/4"></div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !mosque) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            لم يتم العثور على المسجد
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/mosques"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى المساجد
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-amber-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/mosques"
            className="inline-flex items-center text-amber-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى المساجد
          </Link>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🕌</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {getLocalizedName(mosque)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Prayer Times */}
          {mosque.prayerTimes && Object.keys(mosque.prayerTimes).length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 ml-2 text-amber-600" />
                مواقيت الصلاة
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(mosque.prayerTimes).map(
                  ([prayer, time]) =>
                    time && (
                      <div
                        key={prayer}
                        className="bg-amber-50 rounded-lg p-4 text-center"
                      >
                        <p className="font-medium text-amber-800">
                          {PRAYER_NAMES[prayer] || prayer}
                        </p>
                        <p
                          className="text-2xl font-bold text-amber-900 mt-1"
                          dir="ltr"
                        >
                          {time}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {getLocalizedDescription(mosque) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                نبذة عن المسجد
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {getLocalizedDescription(mosque)}
              </p>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              معلومات الاتصال
            </h2>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <MapPin className="h-5 w-5 ml-3 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">العنوان</p>
                  <p className="text-gray-600">{getLocalizedAddress(mosque)}</p>
                  {mosque.latitude && mosque.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${mosque.latitude},${mosque.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 text-sm mt-1 inline-block"
                    >
                      عرض على الخريطة ←
                    </a>
                  )}
                </div>
              </div>

              {/* Imam */}
              {mosque.imam && (
                <div className="flex items-start">
                  <User className="h-5 w-5 ml-3 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">الإمام</p>
                    <p className="text-gray-600">{mosque.imam}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {mosque.phone && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 ml-3 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">الهاتف</p>
                    <a
                      href={`tel:${mosque.phone}`}
                      className="text-gray-600 hover:text-amber-600"
                      dir="ltr"
                    >
                      {mosque.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Facilities */}
          {mosque.facilities && mosque.facilities.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                المرافق المتوفرة
              </h2>
              <div className="flex flex-wrap gap-2">
                {mosque.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                  >
                    <CheckCircle className="h-4 w-4 ml-1" />
                    {MOSQUE_FACILITY_LABELS[facility] || facility}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Map Placeholder */}
          {mosque.latitude && mosque.longitude && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                الموقع على الخريطة
              </h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <a
                  href={`https://www.google.com/maps?q=${mosque.latitude},${mosque.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  📍 افتح في خرائط جوجل
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
