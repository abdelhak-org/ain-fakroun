"use client";

import {
  MapPin,
  Users,
  History,
  Building2,
  Wheat,
  ShoppingBag,
  HeartPulse,
  Factory,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">عن عين فكرون</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">مدينتنا</h2>
          <p className="text-lg text-gray-600 mb-4">
            عين فكرون مدينة وبلدية في ولاية أم البواقي شمال شرق الجزائر. تقع في منطقة الهضاب العليا، وتعمل المدينة كمركز تجاري وإداري مهم للمنطقة المحيطة.
          </p>
          <p className="text-lg text-gray-600">
            اسم &quot;عين فكرون&quot; يعني &quot;نبع السلحفاة&quot; بالعربية، مما يعكس مصادر المياه الطبيعية في المنطقة التي دعمت المجتمعات لقرون.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">أم البواقي</div>
            <div className="text-sm text-gray-500">الولاية</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">~50,000</div>
            <div className="text-sm text-gray-500">السكان</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <History className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">عريق</div>
            <div className="text-sm text-gray-500">التاريخ</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Building2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">متنامي</div>
            <div className="text-sm text-gray-500">الاقتصاد</div>
          </div>
        </section>

        {/* Geography */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الجغرافيا والمناخ</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 mb-4">
              تقع عين فكرون عند خط عرض 35.97 درجة شمالاً وخط طول 6.87 درجة شرقاً، على ارتفاع حوالي 900 متر فوق سطح البحر. تتمتع المدينة بمناخ شبه جاف نموذجي للهضاب العليا في شرق الجزائر.
            </p>
            <ul className="list-disc text-gray-600 space-y-2 mr-6">
              <li>شتاء بارد مع تساقط ثلوج أحياناً</li>
              <li>صيف دافئ وجاف</li>
              <li>موقع استراتيجي يربط المدن الكبرى</li>
              <li>أراضي زراعية تحيط بالمدينة</li>
            </ul>
          </div>
        </section>

        {/* Economy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الاقتصاد والتجارة</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 mb-4">الاقتصاد المحلي متنوع، ويشمل الأنشطة التالية:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-r-4 pr-4 border-emerald-500">
                <div className="flex items-center gap-2">
                  <Wheat className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-gray-900">الزراعة</h3>
                </div>
                <p className="text-sm text-gray-600">القمح والشعير وتربية المواشي</p>
              </div>
              <div className="border-r-4 pr-4 border-blue-500">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">التجارة</h3>
                </div>
                <p className="text-sm text-gray-600">الأسواق المحلية ومحلات البيع بالتجزئة</p>
              </div>
              <div className="border-r-4 pr-4 border-purple-500">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">الخدمات</h3>
                </div>
                <p className="text-sm text-gray-600">الرعاية الصحية والتعليم والإدارة</p>
              </div>
              <div className="border-r-4 pr-4 border-orange-500">
                <div className="flex items-center gap-2">
                  <Factory className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">الصناعة</h3>
                </div>
                <p className="text-sm text-gray-600">التصنيع الصغير والحرف اليدوية</p>
              </div>
            </div>
          </div>
        </section>

        {/* About This Portal */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">عن هذه البوابة</h2>
          <div className="bg-emerald-50 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              تم إنشاء هذه البوابة الرقمية لربط السكان والزوار بالخدمات والأعمال والموارد المجتمعية في عين فكرون. مهمتنا هي:
            </p>
            <ul className="list-disc text-gray-700 space-y-2 mr-6">
              <li>توفير وصول سهل لمعلومات الأعمال المحلية</li>
              <li>مشاركة الفعاليات والأنشطة المجتمعية</li>
              <li>قائمة بالخدمات الأساسية بما في ذلك الرعاية الصحية وجهات الاتصال الطارئة</li>
              <li>تعزيز التجارة المحلية والسياحة</li>
              <li>الحفاظ على تراثنا الثقافي ومشاركته</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">شارك معنا</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 mb-4">
              هل تريد إضافة عملك إلى الدليل أو الإبلاغ عن معلومات خاطئة؟ نرحب بمساهمات المجتمع لجعل هذه البوابة أكثر فائدة للجميع.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              اتصل بنا
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
