"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Providers } from "@/components/providers/providers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔹 Foydalanuvchini tekshirish
  useEffect(() => {
    // sessiya yuklanib bo‘lgach tekshiramiz
    if (status === "loading") return;

    if (!session?.user) {
      router.replace("/"); // foydalanuvchi yo‘q → redirect
    }
  }, [status, session, router]);

  // 🔹 Yuklanish holati
  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-gray-600 text-lg font-medium">Yuklanmoqda...</p>
      </div>
    );
  }

  // 🔹 Agar foydalanuvchi yo‘q bo‘lsa, hech narsa ko‘rsatmaymiz
  if (!session?.user) {
    return null;
  }

  // 🔹 Foydalanuvchi mavjud bo‘lsa — childrenni render qilamiz
  return (
    <Providers>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
          <ToastContainer />
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
