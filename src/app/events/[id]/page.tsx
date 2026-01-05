"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Tag,
} from "lucide-react";
import type { Event } from "@/types";
import { EVENT_CATEGORY_LABELS, EVENT_CATEGORY_ICONS } from "@/constants";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) {
          throw new Error("Event not found");
        }
        const data = await res.json();
        setEvent(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const getLocalizedTitle = (e: Event) => e.titleAr || e.title;
  const getLocalizedDescription = (e: Event) =>
    e.descriptionAr || e.description;
  const getLocalizedLocation = (e: Event) => e.locationAr || e.location;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-DZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ar-DZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-blue-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-600 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-blue-600 rounded w-1/4"></div>
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

  if (error || !event) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            لم يتم العثور على الحدث
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الفعاليات
          </Link>
        </div>
      </main>
    );
  }

  const isPastEvent = new Date(event.endDate || event.startDate) < new Date();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الفعاليات
          </Link>
          <div className="flex items-start gap-4">
            <div className="text-5xl">
              {EVENT_CATEGORY_ICONS[event.category] || "📅"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
                  {EVENT_CATEGORY_LABELS[event.category] || event.category}
                </span>
                {event.isFeatured && (
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                    ⭐ مميز
                  </span>
                )}
                {isPastEvent && (
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                    انتهى
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {getLocalizedTitle(event)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Date & Time Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 ml-2 text-blue-600" />
              التاريخ والوقت
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-900">تاريخ البدء</p>
                <p className="text-gray-600">{formatDate(event.startDate)}</p>
                <p className="text-gray-500 text-sm">
                  {formatTime(event.startDate)}
                </p>
              </div>
              {event.endDate && (
                <div>
                  <p className="font-medium text-gray-900">تاريخ الانتهاء</p>
                  <p className="text-gray-600">{formatDate(event.endDate)}</p>
                  <p className="text-gray-500 text-sm">
                    {formatTime(event.endDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {getLocalizedDescription(event) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 ml-2 text-blue-600" />
                تفاصيل الحدث
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {getLocalizedDescription(event)}
              </p>
            </div>
          )}

          {/* Location & Contact */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              الموقع والاتصال
            </h2>
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start">
                <MapPin className="h-5 w-5 ml-3 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">المكان</p>
                  <p className="text-gray-600">{getLocalizedLocation(event)}</p>
                  {event.latitude && event.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm mt-1 inline-block"
                    >
                      عرض على الخريطة ←
                    </a>
                  )}
                </div>
              </div>

              {/* Organizer */}
              {event.organizer && (
                <div className="flex items-start">
                  <User className="h-5 w-5 ml-3 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">المنظم</p>
                    <p className="text-gray-600">{event.organizer}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {event.contactPhone && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 ml-3 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">هاتف التواصل</p>
                    <a
                      href={`tel:${event.contactPhone}`}
                      className="text-gray-600 hover:text-blue-600"
                      dir="ltr"
                    >
                      {event.contactPhone}
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              {event.contactEmail && (
                <div className="flex items-start">
                  <Mail className="h-5 w-5 ml-3 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      البريد الإلكتروني
                    </p>
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="text-gray-600 hover:text-blue-600"
                      dir="ltr"
                    >
                      {event.contactEmail}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Placeholder */}
          {event.latitude && event.longitude && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                الموقع على الخريطة
              </h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <a
                  href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
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
