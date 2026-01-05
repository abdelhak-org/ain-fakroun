"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, Phone, ChevronRight } from "lucide-react";
import type { Business } from "@/types";
import { BUSINESS_CATEGORIES } from "@/constants";

export default function DirectoryPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBusinesses();
  }, [search, category, page]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
      });
      if (search) params.append("search", search);
      if (category !== "all") params.append("category", category);

      const res = await fetch(`/api/businesses?${params}`);
      const data = await res.json();
      setBusinesses(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedName = (business: Business) => {
    return business.nameAr || business.name;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">دليل الأعمال</h1>
          <p className="text-emerald-100 mt-2">
            ابحث عن الأعمال والخدمات المحلية في عين فكرون
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن الأعمال..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="pr-10 pl-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-[180px]"
              >
                {BUSINESS_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
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
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لا توجد أعمال
            </h3>
            <p className="text-gray-600">حاول تعديل معايير البحث أو التصفية</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <Link key={business._id} href={`/directory/${business._id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="h-40 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                      <span className="text-5xl">🏢</span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-2 w-fit capitalize">
                        {BUSINESS_CATEGORIES.find(
                          (c) => c.value === business.category
                        )?.label || business.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {getLocalizedName(business)}
                      </h3>
                      <div className="mt-auto space-y-1">
                        <div className="flex items-center text-sm text-gray-500 flex-row-reverse">
                          <MapPin className="h-4 w-4 ml-2 shrink-0" />
                          <span className="truncate">{business.address}</span>
                        </div>
                        {business.phones?.[0] && (
                          <div
                            className={`flex items-center text-sm text-gray-500 ${"flex-row-reverse"}`}
                          >
                            <Phone className={`h-4 w-4 ${"ml-2"} shrink-0`} />
                            <span dir="ltr">{business.phones[0]}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-emerald-600 text-sm font-medium mt-4">
                        عرض التفاصيل
                        <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  السابق
                </button>
                <span className="px-4 py-2">
                  صفحة {page} من {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  التالي
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
