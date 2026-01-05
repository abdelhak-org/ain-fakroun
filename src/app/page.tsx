"use client";

import Link from "next/link";
import {
  Building2,
  Calendar,
  Heart,
  Phone,
  MapPin,
  ChevronLeft,
} from "lucide-react";
import PrayerTimes from "@/components/PrayerTimes";

export default function HomePage() {
  const features = [
    {
      icon: Building2,
      title: "دليل الأعمال",
      description: "ابحث عن الأعمال والمحلات والمطاعم والخدمات المحلية",
      href: "/directory",
      color: "emerald",
    },
    {
      icon: Calendar,
      title: "الفعاليات",
      description: "ابق على اطلاع بالفعاليات والأنشطة المحلية",
      href: "/events",
      color: "purple",
    },
    {
      icon: Heart,
      title: "الرعاية الصحية",
      description: "المستشفيات والعيادات والصيدليات والخدمات الطبية",
      href: "/medical",
      color: "red",
    },
    {
      icon: MapPin,
      title: "المساجد",
      description: "ابحث عن المساجد ومواقيت الصلاة",
      href: "/mosques",
      color: "green",
    },
    {
      icon: Phone,
      title: "الطوارئ",
      description: "أرقام الطوارئ والأرقام المهمة",
      href: "/emergency",
      color: "orange",
    },
    {
      icon: MapPin,
      title: "خريطة المدينة",
      description: "استكشف عين فكرون على الخريطة التفاعلية",
      href: "/map",
      color: "blue",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> =
      {
        emerald: {
          bg: "bg-emerald-100",
          text: "text-emerald-600",
          hover: "hover:bg-emerald-50",
        },
        purple: {
          bg: "bg-purple-100",
          text: "text-purple-600",
          hover: "hover:bg-purple-50",
        },
        red: {
          bg: "bg-red-100",
          text: "text-red-600",
          hover: "hover:bg-red-50",
        },
        green: {
          bg: "bg-green-100",
          text: "text-green-600",
          hover: "hover:bg-green-50",
        },
        orange: {
          bg: "bg-orange-100",
          text: "text-orange-600",
          hover: "hover:bg-orange-50",
        },
        blue: {
          bg: "bg-blue-100",
          text: "text-blue-600",
          hover: "hover:bg-blue-50",
        },
      };
    return colors[color] || colors.emerald;
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            مرحباً بكم في عين فكرون
          </h1>
          <p className="text-xl sm:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            بوابتك إلى الخدمات المحلية والأعمال والفعاليات والموارد المجتمعية في
            عين فكرون، أم البواقي، الجزائر.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/directory"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              استكشف الدليل
              <ChevronLeft className="h-5 w-5 mr-2" />
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              عرض خريطة المدينة
            </Link>
          </div>
        </div>
      </section>

      {/* Prayer Times */}
      <PrayerTimes />

      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="font-semibold">الطوارئ:</span>
            <a href="tel:17" className="font-bold text-lg hover:underline">
              الشرطة: 17
            </a>
            <span className="text-red-200">|</span>
            <a href="tel:14" className="font-bold text-lg hover:underline">
              الحماية المدنية: 14
            </a>
            <span className="text-red-200">|</span>
            <a href="tel:1055" className="font-bold text-lg hover:underline">
              الدرك: 1055
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              اكتشف عين فكرون
            </h2>
            <p className="text-lg text-gray-600">
              كل ما تحتاج معرفته عن مدينتنا في مكان واحد
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const colorClasses = getColorClasses(feature.color);
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className={`bg-white rounded-xl shadow-md p-6 ${colorClasses.hover} transition-colors group`}
                >
                  <div
                    className={`inline-flex p-3 rounded-lg ${colorClasses.bg} mb-4`}
                  >
                    <feature.icon className={`h-6 w-6 ${colorClasses.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                عن مدينتنا
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                عين فكرون مدينة نابضة بالحياة في ولاية أم البواقي شمال شرق
                الجزائر. تقع في منطقة الهضاب العليا الجميلة، وتشتهر مدينتنا
                بتاريخها العريق ومجتمعها الدافئ واقتصادها المتنامي.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                تعمل هذه البوابة كجسر رقمي يربط السكان والزوار بالأعمال المحلية
                وخدمات الرعاية الصحية والمؤسسات الدينية والفعاليات المجتمعية.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700"
              >
                اعرف المزيد عن عين فكرون
                <ChevronLeft className="h-5 w-5 mr-1" />
              </Link>
            </div>
            <div className="bg-emerald-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-emerald-600">
                    ~50,000
                  </div>
                  <div className="text-sm text-gray-500">السكان</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-emerald-600">
                    أم البواقي
                  </div>
                  <div className="text-sm text-gray-500">الولاية</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-emerald-600">
                    900م
                  </div>
                  <div className="text-sm text-gray-500">الارتفاع</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-3xl font-bold text-emerald-600">
                    متنوع
                  </div>
                  <div className="text-sm text-gray-500">الاقتصاد</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">لديك عمل في عين فكرون؟</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            أضف عملك إلى دليلنا للوصول إلى المزيد من العملاء. مجاني ويستغرق
            دقائق قليلة فقط.
          </p>
          <Link
            href="/directory"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
          >
            أضف عملك
          </Link>
        </div>
      </section>
    </main>
  );
}
