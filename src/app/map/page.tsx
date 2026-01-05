"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Layers, MapPin, Building2, Heart, Calendar } from "lucide-react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface MapItem {
  _id: string;
  name: string;
  nameAr?: string;
  type: "business" | "medical" | "mosque" | "event";
  category?: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

const AIN_FAKROUN_CENTER: [number, number] = [35.9667, 6.8667];

const layers = [
  { id: "business", label: "الأعمال", icon: Building2, color: "blue" },
  { id: "medical", label: "الصحة", icon: Heart, color: "red" },
  { id: "mosque", label: "المساجد", icon: MapPin, color: "green" },
  { id: "event", label: "الفعاليات", icon: Calendar, color: "purple" },
];

export default function MapPage() {
  const [items, setItems] = useState<MapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLayers, setActiveLayers] = useState<string[]>([
    "business",
    "medical",
    "mosque",
    "event",
  ]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [businessRes, medicalRes, mosqueRes, eventRes] = await Promise.all([
        fetch("/api/businesses?limit=100"),
        fetch("/api/medical"),
        fetch("/api/mosques"),
        fetch("/api/events"),
      ]);

      const [businessData, medicalData, mosqueData, eventData] =
        await Promise.all([
          businessRes.json(),
          medicalRes.json(),
          mosqueRes.json(),
          eventRes.json(),
        ]);

      const allItems: MapItem[] = [];

      if (businessData.data) {
        businessData.data.forEach((b: MapItem) => {
          if (b.latitude && b.longitude) {
            allItems.push({ ...b, type: "business" });
          }
        });
      }

      if (medicalData.data) {
        medicalData.data.forEach((m: MapItem) => {
          if (m.latitude && m.longitude) {
            allItems.push({ ...m, type: "medical" });
          }
        });
      }

      if (mosqueData.data) {
        mosqueData.data.forEach((m: MapItem) => {
          if (m.latitude && m.longitude) {
            allItems.push({ ...m, type: "mosque" });
          }
        });
      }

      if (eventData.data) {
        eventData.data.forEach((e: MapItem) => {
          if (e.latitude && e.longitude) {
            allItems.push({ ...e, type: "event" });
          }
        });
      }

      setItems(allItems);
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  };

  const filteredItems = items.filter((item) =>
    activeLayers.includes(item.type)
  );

  const getLocalizedName = (item: MapItem) => item.nameAr || item.name;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">خريطة المدينة</h1>
          <p className="text-emerald-100">
            استكشف عين فكرون على الخريطة التفاعلية
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">طبقات الخريطة</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={
                  activeLayers.includes(layer.id)
                    ? "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-700 border-2 border-emerald-500"
                    : "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 border-2 border-transparent"
                }
              >
                <layer.icon className="h-4 w-4" />
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="h-96">
              <MapContainer
                center={AIN_FAKROUN_CENTER}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredItems.map((item) => (
                  <Marker
                    key={item.type + "-" + item._id}
                    position={[item.latitude!, item.longitude!]}
                  >
                    <Popup>
                      <div className="text-center" dir="rtl">
                        <h3 className="font-semibold">
                          {getLocalizedName(item)}
                        </h3>
                        <p className="text-sm text-gray-600">{item.address}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full capitalize">
                          {item.type}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {layers.map((layer) => {
            const count = items.filter((item) => item.type === layer.id).length;
            return (
              <div
                key={layer.id}
                className="bg-white rounded-lg shadow-md p-4 text-center"
              >
                <layer.icon className="h-6 w-6 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-500">{layer.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
