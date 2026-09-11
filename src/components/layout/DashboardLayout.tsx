"use client";

import type { ReactNode } from "react";
import { Search, Bell, ChevronDown, User, RefreshCw, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useState, useSyncExternalStore } from "react";
import type { SessionUser } from "../../lib/session";
import { clearSession } from "../../lib/session";
import Button from "../ui/Button";
import MultiUserModal from "../MultiUserModal";

type DashboardLayoutProps = {
  children: ReactNode;
};

const subscribeToSession = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getSessionSnapshot = () => window.localStorage.getItem("cuanku_user") ?? "";
const getServerSessionSnapshot = () => "";

function parseSessionUser(snapshot: string): SessionUser {
  if (!snapshot) return {};

  try {
    return JSON.parse(snapshot) as SessionUser;
  } catch {
    return {};
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [globalSearch, setGlobalSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMultiUserModalOpen, setIsMultiUserModalOpen] = useState(false);
  const sessionSnapshot = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );
  const user = parseSessionUser(sessionSnapshot);

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

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {showNotifications && (
          <div className="absolute right-24 top-[60px] z-50 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
            Belum ada notifikasi.
          </div>
        )}

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-2.5"
            >
              <div className="h-9 w-9 rounded-full bg-[#d9d9d9]" />

              <div className="flex items-center gap-1">
                <p className="text-sm font-bold text-[#001229]">
                  {user.nama_lengkap ?? user.email ?? "Pengguna"}
                </p>
                <ChevronDown size={16} className="text-[#001229]" strokeWidth={2.5} />
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 z-50 w-[280px] rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col items-center pb-4 text-center">
                  <div className="mb-3 h-[72px] w-[72px] rounded-full bg-[#d9d9d9]" />
                  <p className="text-base font-bold text-[#001229]">
                    {user.nama_lengkap ?? user.email ?? "Pengguna"}
                  </p>
                  <div className="mt-1.5 rounded-full bg-[#e5eef8] px-3.5 py-1 text-[11px] font-bold text-[#1f3a5f]">
                    Owner - {user.nama_UMKM ?? "Usaha belum diatur"}
                  </div>
                </div>

                <div className="mb-2 border-t border-slate-200" />

                <div className="flex flex-col space-y-1 pt-1">
                  <Button
                    onClick={() => router.push("/settings")}
                    variant="ghost"
                    size="md"
                    fullWidth
                    className="justify-start gap-3"
                  >
                    <User size={18} strokeWidth={2.5} /> Profil Saya
                  </Button>
                  <Button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setIsMultiUserModalOpen(true);
                    }}
                    variant="ghost"
                    size="md"
                    fullWidth
                    className="justify-start gap-3"
                  >
                    <RefreshCw size={18} strokeWidth={2.5} /> Multi User
                  </Button>
                  <Button
                    onClick={() => {
                      clearSession();
                      router.push("/login");
                    }}
                    variant="danger-ghost"
                    size="md"
                    fullWidth
                    className="justify-start gap-3"
                  >
                    <LogOut size={18} strokeWidth={2.5} /> Log Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          </div>
        </header>

        <main className="p-5 lg:p-8">{children}</main>
      </div>

      <MultiUserModal
        isOpen={isMultiUserModalOpen}
        onClose={() => setIsMultiUserModalOpen(false)}
        users={[
          {
            id: user.id_user || "owner",
            name: user.nama_lengkap || user.email || "Pemilik",
            role: "Pemilik",
            access: "Akses Penuh",
          },
        ]}
      />
    </div>
  );
}