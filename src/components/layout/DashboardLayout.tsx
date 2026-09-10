"use client";

import type { ReactNode } from "react";
import { Search, Bell, ChevronDown, Repeat2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { getSessionUser, type SessionUser } from "../../lib/session";
import { getNotifications, markAllNotificationsAsRead, type NotificationItem } from "../../lib/notification";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [globalSearch, setGlobalSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const loadNotifications = () => {
      setNotifications(getNotifications());
    };

    loadNotifications();

    window.addEventListener("notifications-updated", loadNotifications);

    return () => {
      window.removeEventListener(
        "notifications-updated",
        loadNotifications
      );
    };
  }, []);
  const hasUnreadNotification = notifications.some(
    (notification) => !notification.read
  );
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [allRead, setAllRead] = useState(false); // Didefinisikan agar tidak error
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
          <div className="flex items-center gap-4 relative">
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
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  const nextState = !showNotifications;

                  setShowNotifications(nextState);

                  if (nextState) {
                    markAllNotificationsAsRead();
                  }
                }}
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
                  transition
                  hover:bg-[#e2ebf5]
                "
              >
                <Bell size={17} />

                {hasUnreadNotification && (
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-[60px] z-50 w-70 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#001229]">
                      Notifikasi
                    </h3>
                  </div>

                  {notifications.length === 0 ? (
                    <p className="py-4 text-center text-xs text-slate-400">
                      Belum ada notifikasi.
                    </p>
                  ) : (
                    <div className="max-h-72 space-y-2 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="rounded-xl bg-[#F4F9FF] px-3 py-3 text-xs text-[#001229]"
                        >
                          <div className="flex items-start gap-2">
                            <Bell
                              size={14}
                              className="mt-0.5 shrink-0 text-[#6FA8F7]"
                            />

                            <span>{notification.message}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
  </div>
)}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu((prev) => !prev);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 outline-none"
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
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {/* Dropdown Profile */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
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
              )}
            </div>
          </div>
        </header>

        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}