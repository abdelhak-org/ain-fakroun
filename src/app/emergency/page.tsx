"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  AlertTriangle,
  Building2,
  Flame,
  Heart,
  Zap,
} from "lucide-react";
import type { EmergencyContact } from "@/types";
import { EMERGENCY_TYPE_COLORS, DEFAULT_EMERGENCY_CONTACTS } from "@/constants";

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/emergency");
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      police: <Building2 className="h-8 w-8" />,
      fire: <Flame className="h-8 w-8" />,
      ambulance: <Heart className="h-8 w-8" />,
      hospital: <Heart className="h-8 w-8" />,
      municipality: <Building2 className="h-8 w-8" />,
      utility: <Zap className="h-8 w-8" />,
    };
    return icons[type] || <Phone className="h-8 w-8" />;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      police: "bg-blue-600",
      fire: "bg-orange-600",
      ambulance: "bg-red-600",
      hospital: "bg-red-600",
      municipality: "bg-emerald-600",
      utility: "bg-yellow-600",
    };
    return colors[type] || "bg-gray-600";
  };

  const getLocalizedName = (contact: EmergencyContact) => {
    return contact.nameAr || contact.name;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8" />
            <h1 className="text-3xl font-bold">أرقام الطوارئ</h1>
          </div>
          <p className="text-red-100 mt-1">
            أرقام هواتف مهمة للطوارئ في عين فكرون
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* National Emergency Numbers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            أرقام الطوارئ الوطنية
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEFAULT_EMERGENCY_CONTACTS.map((item) => (
              <a
                key={item.type}
                href={`tel:${item.phone}`}
                className="text-white rounded-xl p-6 text-center hover:opacity-90 transition-colors shadow-lg"
                style={{
                  backgroundColor:
                    item.color === "blue"
                      ? "#2563eb"
                      : item.color === "orange"
                      ? "#ea580c"
                      : item.color === "red"
                      ? "#dc2626"
                      : "#059669",
                }}
              >
                <div className="flex justify-center mb-3">
                  {getTypeIcon(item.type)}
                </div>
                <div className="text-3xl font-bold mb-2">{item.phone}</div>
                <div className="text-lg font-medium">{item.name}</div>
                <div className="text-sm opacity-90 mt-2">24/7</div>
              </a>
            ))}
          </div>
        </section>

        {/* Local Emergency Contacts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            جهات الاتصال المحلية للطوارئ
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري التحميل...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <Phone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                لا توجد جهات اتصال محلية مدرجة بعد
              </p>
              <p className="text-gray-500 mt-2">
                استخدم أرقام الطوارئ الوطنية أعلاه للمساعدة الفورية
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div
                    className={`${getTypeColor(contact.type)} text-white p-4`}
                  >
                    <div className="flex items-center gap-3">
                      {getTypeIcon(contact.type)}
                      <div>
                        <h3 className="text-lg font-semibold">
                          {getLocalizedName(contact)}
                        </h3>
                        {contact.isAvailable24h && (
                          <span className="text-sm opacity-90">طوارئ 24/7</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-emerald-600"
                    >
                      <Phone className="h-5 w-5" />
                      <span dir="ltr">{contact.phone}</span>
                    </a>
                    {contact.alternatePhone && (
                      <p className="text-gray-600 mt-2">
                        رقم بديل:{" "}
                        <span dir="ltr">{contact.alternatePhone}</span>
                      </p>
                    )}
                    {contact.address && (
                      <p className="text-gray-500 mt-2 text-sm">
                        {contact.address}
                      </p>
                    )}
                    <a
                      href={`tel:${contact.phone}`}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      اتصل الآن
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
