"use client";

import type { ReactNode } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { getSessionUser, type SessionUser } from "../../lib/session";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [headerSearch, setHeaderSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState<SessionUser>({});

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/transactions": "Transaksi",
    "/stock": "Stok Barang",
    "/prediction": "Prediksi Bisnis",
    "/settings": "Pengaturan & Profil",
  };

  const pageTitle = pageTitles[pathname] ?? "Dashboard";
  const handleGlobalSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = globalSearch.trim();

    if (!keyword) return;

    router.push(`/transactions?search=${encodeURIComponent(keyword)}`);
  };
  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#001229]">
      <Sidebar />
      <div className="lg:ml-[230px]">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#E6EDF6] bg-white px-5 lg:px-6">
          {/* Judul halaman */}
          <h1 className="text-2xl font-bold text-[#001229]">
            {pageTitle}
          </h1>

          {/* Bagian kanan */}
          <div className="flex items-center gap-4">

          {/* Search */}
          <form onSubmit={handleGlobalSearch} className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
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
          </form>

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

             {!allRead && (
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
             )}
          </button>

          {showNotifications && (
          <div className="absolute right-24 top-[60px] z-50 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
            Belum ada notifikasi.
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
                {user.nama_lengkap ?? user.nama_UMKM ?? user.email ?? "Pengguna"}
              </p>
              <p className="text-[10px] text-slate-500">
                Pemilik
              </p>
            </div>

                  <button
                    type="button"
                    className="
                      flex w-full items-center gap-3
                      rounded-lg px-3 py-2
                      text-left text-xs font-semibold
                      text-[#001229]
                      hover:bg-[#F4F9FF]
                    "
                  >
                    <Repeat2 size={15} />
                    Multi User
                  </button>

                  <button
                    type="button"
                    className="
                      flex w-full items-center gap-3
                      rounded-lg px-3 py-2
                      text-left text-xs font-semibold
                      text-red-600
                      hover:bg-red-50
                    "
                  >
                    <span>↪</span>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          </div>
        </header>
      
        <main className="p-5 lg:p-8">{children}</main>
      
      </div>
    </div>
  );
}
