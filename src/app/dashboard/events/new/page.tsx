"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const eventSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  titleAr: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  category: z.enum([
    "sports",
    "cultural",
    "religious",
    "educational",
    "community",
    "other",
  ]),
  startDate: z.string().min(1, "تاريخ البداية مطلوب"),
  endDate: z.string().optional(),
  location: z.string().min(1, "الموقع مطلوب"),
  locationAr: z.string().optional(),
  organizer: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z
    .string()
    .email("البريد الإلكتروني غير صالح")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function NewEventPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      category: "other",
      isActive: true,
      isFeatured: false,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          startDate: new Date(data.startDate),
          endDate: data.endDate ? new Date(data.endDate) : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "حدث خطأ أثناء إنشاء الفعالية");
        return;
      }

      router.push("/dashboard/events");
      router.refresh();
    } catch {
      setError("حدث خطأ أثناء إنشاء الفعالية");
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { value: "sports", label: "رياضي" },
    { value: "cultural", label: "ثقافي" },
    { value: "religious", label: "ديني" },
    { value: "educational", label: "تعليمي" },
    { value: "community", label: "مجتمعي" },
    { value: "other", label: "أخرى" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          إضافة فعالية جديدة
        </h1>
        <Link
          href="/dashboard/events"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          العودة للقائمة
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                العنوان (إنجليزي) *
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                dir="ltr"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Title Arabic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                العنوان (عربي)
              </label>
              <input
                type="text"
                {...register("titleAr")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                التصنيف *
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                تاريخ البداية *
              </label>
              <input
                type="datetime-local"
                {...register("startDate")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                dir="ltr"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                تاريخ النهاية
              </label>
              <input
                type="datetime-local"
                {...register("endDate")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                dir="ltr"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الموقع (إنجليزي) *
              </label>
              <input
                type="text"
                {...register("location")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                dir="ltr"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Location Arabic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الموقع (عربي)
              </label>
              <input
                type="text"
                {...register("locationAr")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                المنظم
              </label>
              <input
                type="text"
                {...register("organizer")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                رقم الهاتف
              </label>
              <input
                type="tel"
                {...register("contactPhone")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                dir="ltr"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                {...register("contactEmail")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                dir="ltr"
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الوصف (إنجليزي)
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              dir="ltr"
            />
          </div>

          {/* Description Arabic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الوصف (عربي)
            </label>
            <textarea
              {...register("descriptionAr")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                نشط
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("isFeatured")}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                مميز
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "جاري الحفظ..." : "حفظ الفعالية"}
            </button>
            <Link
              href="/dashboard/events"
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              إلغاء
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
