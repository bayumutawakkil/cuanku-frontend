"use client";

import type { ReactNode } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/transactions": "Transaksi",
    "/stock": "Stok Barang",
    "/prediction": "Prediksi Bisnis",
    "/settings": "Pengaturan",
    "/profile": "Profil",
  };

  const pageTitle = pageTitles[pathname] ?? "Dashboard";
  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#001229]">
      <Sidebar />
      <div className="lg:ml-[230px]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E6EDF6] bg-white px-5 lg:px-6">
          {/* Judul halaman */}
          <h1 className="text-2xl font-bold text-[#001229]">
            {pageTitle}
          </h1>

          {/* Bagian kanan */}
          <div className="flex items-center gap-4">

          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Cari Transaksi, Stok..."
              className="
                w-48
                rounded-full
                bg-[#EAF2FC]
                py-2
                pl-9
                pr-3
                text-xs
                text-slate-600
                outline-none
                placeholder:text-slate-400
              "
            />
          </div>

          {/* Notifikasi */}
          <button
            type="button"
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#EAF2FC]
              text-[#001229]
            "
          >
            <Bell size={17} />

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <button
            type="button"
            className="flex items-center gap-2"
          >
            <div className="h-9 w-9 rounded-full bg-slate-200" />

            <div className="text-left">
              <p className="text-xs font-bold text-[#001229]">
                Rendi Wahyudi
              </p>
              <p className="text-[10px] text-slate-500">
                Owner
              </p>
            </div>

            <ChevronDown size={14} className="text-[#001229]" />
          </button>

          </div>
        </header>
      
        <main className="p-5 lg:p-8">{children}</main>
      
      </div>
    </div>
  );
}
