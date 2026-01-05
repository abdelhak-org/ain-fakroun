"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  AlertCircle,
  Filter,
  ChevronRight,
} from "lucide-react";
import type { Medical } from "@/types";
import { MEDICAL_TYPES } from "@/constants";

export default function MedicalPage() {
  const [facilities, setFacilities] = useState<Medical[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");

  useEffect(() => {
    fetchFacilities();
  }, [type]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (type !== "all") params.append("type", type);

      const res = await fetch(`/api/medical?${params}`);
      const data = await res.json();
      setFacilities(data.data || []);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedName = (facility: Medical) => {
    return facility.nameAr || facility.name;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            الرعاية الصحية
          </h1>
          <p className="text-red-100 mt-2">
            المستشفيات والعيادات والصيدليات والخدمات الطبية في عين فكرون
          </p>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <span className="font-semibold text-red-800">الطوارئ: </span>
              <a href="tel:14" className="text-red-600 font-bold text-lg">
                14
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <span className="font-semibold text-red-800">الإسعاف: </span>
              <a href="tel:115" className="text-red-600 font-bold text-lg">
                115
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-4 flex-row-reverse">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              dir="rtl"
              className="pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white min-w-[200px]"
            >
              {MEDICAL_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
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
        ) : facilities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لا توجد مرافق
            </h3>
            <p className="text-gray-600">جرب فئة مختلفة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <Link
                key={facility._id}
                href={`/medical/${facility._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
              >
                <div className="p-4">
                  {facility.isEmergency24h && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full mb-2">
                      <AlertCircle className="h-3 w-3 ml-1" />
                      طوارئ 24/7
                    </span>
                  )}
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-2 mr-2 capitalize">
                    {MEDICAL_TYPES.find((t) => t.value === facility.type)
                      ?.label || facility.type}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {getLocalizedName(facility)}
                  </h3>
                  {facility.specialty && (
                    <p className="text-sm text-gray-500 mb-2">
                      {facility.specialty}
                    </p>
                  )}
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center text-sm text-gray-500 flex-row-reverse">
                      <MapPin className="h-4 w-4 ml-2 shrink-0" />
                      <span className="truncate">{facility.address}</span>
                    </div>
                    {facility.phones?.[0] && (
                      <div className="flex items-center text-sm text-gray-500 flex-row-reverse">
                        <Phone className="h-4 w-4 ml-2 shrink-0" />
                        <span className="text-blue-600" dir="ltr">
                          {facility.phones[0]}
                        </span>
                      </div>
                    )}
                    {facility.hours && (
                      <div className="flex items-center text-sm text-gray-500 flex-row-reverse">
                        <Clock className="h-4 w-4 ml-2 shrink-0" />
                        <span>{facility.hours}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-red-600 text-sm font-medium mt-4">
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
