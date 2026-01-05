import Link from "next/link";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";

async function getEvents() {
  await dbConnect();
  const events = await Event.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(events));
}

export default async function EventsPage() {
  const events = await getEvents();

  const categoryLabels: Record<string, string> = {
    sports: "رياضي",
    cultural: "ثقافي",
    religious: "ديني",
    educational: "تعليمي",
    community: "مجتمعي",
    other: "أخرى",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          إدارة الفعاليات
        </h1>
        <Link
          href="/dashboard/events/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>إضافة فعالية</span>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد فعاليات
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            ابدأ بإضافة فعالية جديدة
          </p>
          <Link
            href="/dashboard/events/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>إضافة فعالية</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  العنوان
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  التصنيف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.map(
                (event: {
                  _id: string;
                  title: string;
                  titleAr?: string;
                  category: string;
                  startDate: string;
                  isActive: boolean;
                  isFeatured: boolean;
                }) => (
                  <tr key={event._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.titleAr || event.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                        {categoryLabels[event.category] || event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.startDate).toLocaleDateString("ar-DZ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          event.isActive
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                        }`}
                      >
                        {event.isActive ? "نشط" : "غير نشط"}
                      </span>
                      {event.isFeatured && (
                        <span className="mr-2 px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                          مميز
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/events/${event._id}/edit`}
                          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                        >
                          تعديل
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">
                          |
                        </span>
                        <Link
                          href={`/events/${event._id}`}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          target="_blank"
                        >
                          عرض
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
