import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components";

export const metadata: Metadata = {
  title: "عين فكرون - بوابة المدينة",
  description:
    "البوابة الرسمية لمدينة عين فكرون، أم البواقي، الجزائر. اعثر على الأعمال المحلية والفعاليات والرعاية الصحية والمساجد وأرقام الطوارئ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
