"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  AlertCircle,
  Stethoscope,
  Users,
} from "lucide-react";
import type { Medical } from "@/types";
import { MEDICAL_TYPE_LABELS, MEDICAL_TYPE_ICONS } from "@/constants";

export default function MedicalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [facility, setFacility] = useState<Medical | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await fetch(`/api/medical/${id}`);
        if (!res.ok) {
          throw new Error("Medical facility not found");
        }
        const data = await res.json();
        setFacility(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  const getLocalizedName = (f: Medical) => f.nameAr || f.name;
  const getLocalizedDescription = (f: Medical) =>
    f.descriptionAr || f.description;
  const getLocalizedAddress = (f: Medical) => f.addressAr || f.address;
  const getLocalizedSpecialty = (f: Medical) => f.specialtyAr || f.specialty;

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-red-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-red-600 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-red-600 rounded w-1/4"></div>
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

  if (error || !facility) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            لم يتم العثور على المرفق الصحي
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/medical"
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الخدمات الصحية
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/medical"
            className="inline-flex items-center text-red-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الخدمات الصحية
          </Link>
          <div className="flex items-start gap-4">
            <div className="text-5xl">
              {MEDICAL_TYPE_ICONS[facility.type] || "🏥"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                  {MEDICAL_TYPE_LABELS[facility.type] || facility.type}
                </span>
                {facility.isEmergency24h && (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                    <AlertCircle className="h-4 w-4 ml-1" />
                    طوارئ 24 ساعة
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {getLocalizedName(facility)}
              </h1>
              {getLocalizedSpecialty(facility) && (
                <p className="text-red-200 mt-1">
                  {getLocalizedSpecialty(facility)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Emergency Phone - Highlighted */}
          {facility.emergencyPhone && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 ml-2 text-red-600" />
                رقم الطوارئ
              </h2>
              <a
                href={`tel:${facility.emergencyPhone}`}
                className="text-3xl font-bold text-red-700 hover:text-red-800"
                dir="ltr"
              >
                {facility.emergencyPhone}
              </a>
            </div>
          )}

          {/* Description */}
          {getLocalizedDescription(facility) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Stethoscope className="h-5 w-5 ml-2 text-red-600" />
                نبذة عن المرفق الصحي
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {getLocalizedDescription(facility)}
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
                <MapPin className="h-5 w-5 ml-3 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">العنوان</p>
                  <p className="text-gray-600">
                    {getLocalizedAddress(facility)}
                  </p>
                  {facility.latitude && facility.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${facility.latitude},${facility.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 text-sm mt-1 inline-block"
                    >
                      عرض على الخريطة ←
                    </a>
                  )}
                </div>
              </div>

              {/* Phones */}
              {facility.phones && facility.phones.length > 0 && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 ml-3 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">الهاتف</p>
                    <div className="space-y-1">
                      {facility.phones.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${phone}`}
                          className="block text-gray-600 hover:text-red-600"
                          dir="ltr"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
              {facility.email && (
                <div className="flex items-start">
                  <Mail className="h-5 w-5 ml-3 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      البريد الإلكتروني
                    </p>
                    <a
                      href={`mailto:${facility.email}`}
                      className="text-gray-600 hover:text-red-600"
                      dir="ltr"
                    >
                      {facility.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {facility.website && (
                <div className="flex items-start">
                  <Globe className="h-5 w-5 ml-3 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      الموقع الإلكتروني
                    </p>
                    <a
                      href={facility.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-red-600"
                      dir="ltr"
                    >
                      {facility.website}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {facility.hours && (
                <div className="flex items-start">
                  <Clock className="h-5 w-5 ml-3 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">ساعات العمل</p>
                    <p className="text-gray-600">{facility.hours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Doctors */}
          {facility.doctors && facility.doctors.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 ml-2 text-red-600" />
                الأطباء
              </h2>
              <ul className="space-y-2">
                {facility.doctors.map((doctor, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full ml-3"></span>
                    {doctor}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Map Placeholder */}
          {facility.latitude && facility.longitude && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                الموقع على الخريطة
              </h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <a
                  href={`https://www.google.com/maps?q=${facility.latitude},${facility.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 font-medium"
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
