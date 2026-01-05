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
  Building2,
} from "lucide-react";
import type { Business } from "@/types";
import { BUSINESS_CATEGORY_LABELS, BUSINESS_CATEGORY_ICONS } from "@/constants";

export default function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/businesses/${id}`);
        if (!res.ok) {
          throw new Error("Business not found");
        }
        const data = await res.json();
        setBusiness(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  const getLocalizedName = (b: Business) => b.nameAr || b.name;
  const getLocalizedDescription = (b: Business) =>
    b.descriptionAr || b.description;
  const getLocalizedAddress = (b: Business) => b.addressAr || b.address;

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-emerald-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-emerald-600 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-emerald-600 rounded w-1/4"></div>
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

  if (error || !business) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            لم يتم العثور على النشاط التجاري
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/directory"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الدليل
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/directory"
            className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الدليل
          </Link>
          <div className="flex items-start gap-4">
            <div className="text-5xl">
              {BUSINESS_CATEGORY_ICONS[business.category] || "🏢"}
            </div>
            <div>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-2">
                {BUSINESS_CATEGORY_LABELS[business.category] ||
                  business.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {getLocalizedName(business)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Description */}
          {getLocalizedDescription(business) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="h-5 w-5 ml-2 text-emerald-600" />
                نبذة عن النشاط التجاري
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {getLocalizedDescription(business)}
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
                <MapPin className="h-5 w-5 ml-3 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">العنوان</p>
                  <p className="text-gray-600">
                    {getLocalizedAddress(business)}
                  </p>
                  {business.latitude && business.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${business.latitude},${business.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 text-sm mt-1 inline-block"
                    >
                      عرض على الخريطة ←
                    </a>
                  )}
                </div>
              </div>

              {/* Phones */}
              {business.phones && business.phones.length > 0 && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 ml-3 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">الهاتف</p>
                    <div className="space-y-1">
                      {business.phones.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${phone}`}
                          className="block text-gray-600 hover:text-emerald-600"
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
              {business.email && (
                <div className="flex items-start">
                  <Mail className="h-5 w-5 ml-3 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      البريد الإلكتروني
                    </p>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-gray-600 hover:text-emerald-600"
                      dir="ltr"
                    >
                      {business.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {business.website && (
                <div className="flex items-start">
                  <Globe className="h-5 w-5 ml-3 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      الموقع الإلكتروني
                    </p>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-emerald-600"
                      dir="ltr"
                    >
                      {business.website}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {business.hours && (
                <div className="flex items-start">
                  <Clock className="h-5 w-5 ml-3 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">ساعات العمل</p>
                    <p className="text-gray-600">{business.hours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Placeholder */}
          {business.latitude && business.longitude && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                الموقع على الخريطة
              </h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <a
                  href={`https://www.google.com/maps?q=${business.latitude},${business.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
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
