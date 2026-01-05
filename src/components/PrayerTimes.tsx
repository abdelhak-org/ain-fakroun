"use client";

import { useState, useEffect } from "react";
import { Clock, Sun, Sunrise, Sunset, Moon } from "lucide-react";
import type {
  PrayerTimeDisplay,
  AladhanTimings,
  AladhanResponse,
} from "@/types";

// Ain Fakroun coordinates
const AIN_FAKROUN_LAT = 35.8667;
const AIN_FAKROUN_LON = 7.0;

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeDisplay[]>([]);
  const [hijriDate, setHijriDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentPrayer, setCurrentPrayer] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const updateCurrentPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const prayerMinutes = prayerTimes.map((p) => {
        const [hours, minutes] = p.time.split(":").map(Number);
        return { name: p.nameAr, minutes: hours * 60 + minutes };
      });

      let current = "";
      let next = "";
      let nextTime = 0;

      for (let i = prayerMinutes.length - 1; i >= 0; i--) {
        if (currentTime >= prayerMinutes[i].minutes) {
          current = prayerMinutes[i].name;
          const nextIndex = (i + 1) % prayerMinutes.length;
          next = prayerMinutes[nextIndex].name;
          nextTime =
            nextIndex === 0
              ? prayerMinutes[0].minutes + 24 * 60
              : prayerMinutes[nextIndex].minutes;
          break;
        }
      }

      if (!current) {
        current = prayerMinutes[prayerMinutes.length - 1].name;
        next = prayerMinutes[0].name;
        nextTime = prayerMinutes[0].minutes;
      }

      setCurrentPrayer(current);
      setNextPrayer(next);

      // Calculate countdown
      let diff = nextTime - currentTime;
      if (diff < 0) diff += 24 * 60;
      const hours = Math.floor(diff / 60);
      const mins = diff % 60;
      setCountdown(
        hours > 0 ? `${hours} ساعة و ${mins} دقيقة` : `${mins} دقيقة`
      );
    };

    updateCurrentPrayer();
    const interval = setInterval(updateCurrentPrayer, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const fetchPrayerTimes = async () => {
    try {
      const today = new Date();
      const date = `${today.getDate()}-${
        today.getMonth() + 1
      }-${today.getFullYear()}`;

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${date}?latitude=${AIN_FAKROUN_LAT}&longitude=${AIN_FAKROUN_LON}&method=19`
      );

      const data: AladhanResponse = await response.json();

      if (data.data) {
        const timings = data.data.timings;

        setPrayerTimes([
          {
            name: "Fajr",
            nameAr: "الفجر",
            time: timings.Fajr,
            icon: <Sunrise className="h-5 w-5" />,
          },
          {
            name: "Sunrise",
            nameAr: "الشروق",
            time: timings.Sunrise,
            icon: <Sun className="h-5 w-5" />,
          },
          {
            name: "Dhuhr",
            nameAr: "الظهر",
            time: timings.Dhuhr,
            icon: <Sun className="h-5 w-5" />,
          },
          {
            name: "Asr",
            nameAr: "العصر",
            time: timings.Asr,
            icon: <Sun className="h-5 w-5" />,
          },
          {
            name: "Maghrib",
            nameAr: "المغرب",
            time: timings.Maghrib,
            icon: <Sunset className="h-5 w-5" />,
          },
          {
            name: "Isha",
            nameAr: "العشاء",
            time: timings.Isha,
            icon: <Moon className="h-5 w-5" />,
          },
        ]);

        const hijri = data.data.date.hijri;
        setHijriDate(`${hijri.day} ${hijri.month.ar} ${hijri.year}`);
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-br from-amber-600 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-amber-500 rounded w-48 mx-auto mb-4"></div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-amber-500 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-br from-amber-600 to-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-6 w-6" />
            <h2 className="text-2xl font-bold">مواقيت الصلاة</h2>
          </div>
          {hijriDate && (
            <p className="text-amber-100 text-sm">{hijriDate} هـ</p>
          )}
        </div>

        {/* Next Prayer Countdown */}
        {nextPrayer && countdown && (
          <div className="text-center mb-6 bg-white/10 rounded-lg py-3 px-4 max-w-md mx-auto">
            <p className="text-amber-100 text-sm">الصلاة القادمة</p>
            <p className="text-xl font-bold">
              {nextPrayer} بعد {countdown}
            </p>
          </div>
        )}

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {prayerTimes.map((prayer) => (
            <div
              key={prayer.name}
              className={`rounded-lg p-3 text-center transition-all ${
                currentPrayer === prayer.nameAr
                  ? "bg-white text-amber-700 shadow-lg scale-105"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <div className="flex justify-center mb-1">{prayer.icon}</div>
              <p className="font-semibold text-sm">{prayer.nameAr}</p>
              <p
                className={`text-lg font-bold ${
                  currentPrayer === prayer.nameAr ? "text-amber-600" : ""
                }`}
                dir="ltr"
              >
                {prayer.time}
              </p>
            </div>
          ))}
        </div>

        {/* Link to Mosques */}
        <div className="text-center mt-6">
          <a
            href="/mosques"
            className="inline-flex items-center text-amber-100 hover:text-white text-sm"
          >
            عرض جميع المساجد ومواقيت الصلاة
            <span className="mr-1">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
