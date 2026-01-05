"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ChevronRight, Filter } from "lucide-react";
import type { Event } from "@/types";
import { EVENT_CATEGORIES } from "@/constants";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, [category]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        upcoming: "true",
        limit: "20",
      });
      if (category !== "all") queryParams.append("category", category);
      const res = await fetch("/api/events?" + queryParams);
      const data = await res.json();
      setEvents(data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedTitle = (event: Event) => event.titleAr || event.title;
  const getLocalizedDescription = (event: Event) =>
    event.descriptionAr || event.description;
  const getLocalizedLocation = (event: Event) =>
    event.locationAr || event.location;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ar-DZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("ar-DZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-purple-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">الفعاليات</h1>
          <p className="text-purple-100">
            اكتشف الفعاليات والأنشطة القادمة في عين فكرون
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-gray-700">تصفية</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={
                  category === cat.value
                    ? "px-4 py-2 rounded-full text-sm font-medium transition-colors bg-purple-600 text-white"
                    : "px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لا توجد فعاليات قادمة
            </h3>
            <p className="text-gray-600">تحقق لاحقاً للفعاليات الجديدة</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event._id}
                href={"/events/" + event._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-48 bg-purple-600 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-white/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-purple-600 text-sm mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {getLocalizedTitle(event)}
                  </h3>
                  {getLocalizedDescription(event) && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {getLocalizedDescription(event)}
                    </p>
                  )}
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{getLocalizedLocation(event)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-purple-600 font-medium">
                    <span>عرض التفاصيل</span>
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
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
