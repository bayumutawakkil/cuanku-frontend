"use client";

import type { ReactNode } from "react";
import { Search, Bell, ChevronDown, AlertTriangle, CircleCheck, } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useState } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const [showNotifications, setShowNotifications] = useState(false);

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/transactions": "Transaksi",
    "/stock": "Stok Barang",
    "/prediction": "Prediksi Bisnis",
    "/settings": "Pengaturan & Profil",
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
            onClick={() => setShowNotifications((prev) => !prev)}
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#edf2f8]
              text-[#40536d]
              transition hover:bg-[#e2ebf5]
            "
          >
            <Bell size={17} />

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {showNotifications && (
          <div
            className="
              absolute right-24 top-[60px]
              z-50 w-[320px]
              overflow-hidden
              rounded-2xl
              border border-slate-200
              bg-white
              shadow-[0_8px_25px_rgba(0,0,0,0.15)]
            "
          >
            {/* Header Popup */}
            <div
              className="
                flex items-center
                justify-between
                border-b border-slate-200
                px-4 py-3
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#001229]">
                  Notifikasi
                </span>

                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-2 py-0.5
                    text-[9px]
                    font-semibold
                    text-slate-600
                  "
                >
                  2 Belum dibaca
                </span>
              </div>

              <button
                type="button"
                className="text-[9px] font-semibold text-[#0049A8]"
              >
                Tandai semua dibaca
              </button>
            </div>

            {/* Notifikasi 1 */}
            <div className="mx-3 mt-3 rounded-lg bg-red-100 p-3">
              <div className="flex gap-3">
                <div
                  className="
                    flex h-5 w-5 shrink-0
                    items-center justify-center
                    rounded
                    bg-red-500
                    text-white
                  "
                >
                  <AlertTriangle size={13} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#001229]">
                    Stok Sangat Kritis!
                  </p>

                  <p className="text-[10px] text-slate-600">
                    Aqua Botol 600 ml tersisa &lt; 5 karton.
                  </p>

                  <p className="mt-1 text-[9px] text-slate-500">
                    10 menit yang lalu.
                  </p>
                </div>
              </div>
            </div>

            {/* Notifikasi 2 */}
            <div className="mx-3 mt-2 rounded-lg bg-yellow-100 p-3">
              <div className="flex gap-3">
                <div
                  className="
                    flex h-5 w-5 shrink-0
                    items-center justify-center
                    rounded
                    bg-yellow-500
                    text-white
                  "
                >
                  <AlertTriangle size={13} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#001229]">
                    5 Produk Stok Menipis
                  </p>

                  <p className="text-[10px] text-slate-600">
                    Tindakan diperlukan segera untuk 5 produk.
                  </p>

                  <p className="mt-1 text-[9px] text-slate-500">
                    30 menit yang lalu.
                  </p>
                </div>
              </div>
            </div>

            {/* Notifikasi 3 */}
            <div className="mx-3 my-2 rounded-lg bg-emerald-100 p-3">
              <div className="flex gap-3">
                <div
                  className="
                    flex h-5 w-5 shrink-0
                    items-center justify-center
                    rounded
                    bg-emerald-500
                    text-white
                  "
                >
                  <CircleCheck size={13} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#001229]">
                    Laporan Aset Sinkron
                  </p>

                  <p className="text-[10px] text-slate-600">
                    Total nilai aset telah berhasil disinkron.
                  </p>

                  <p className="mt-1 text-[9px] text-slate-500">
                    Hari ini, 07:00.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
