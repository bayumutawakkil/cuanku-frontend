"use client";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Landmark,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSessionUser, type SessionUser } from "../../lib/session";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transaksi",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Stok Barang",
    href: "/stock",
    icon: Landmark,
  },
  {
    name: "Prediksi Bisnis",
    href: "/prediction",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Pengaturan",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser>({});

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        hidden
        h-screen
        w-[230px]
        flex-col
        bg-gradient-to-b
        from-[#f8fbff]
        via-[#e9f2fc]
        to-[#76a9e6]
        p-6
        lg:flex
      "
    >
      {/* Logo */}

      <div className="mb-4">
          <img
            src="/images/logo.svg"
            alt=""
            className="h-10 w-auto"
          />
      </div>

      {/* Menu */}

      <nav className="mt-10 space-y-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex
                w-full
                items-center
                gap-3
                text-left
                text-sm
                font-medium
                ${pathname === item.href ? "bg-white/70 text-[#315f9d]" : "text-[#344257]"}
                rounded-lg
                px-3
                py-2
                transition
                hover:text-[#4f88c9]
              `}
            >
              <Icon size={16} strokeWidth={2} />

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Business Card */}

      <div className="mt-auto border-t border-white/30 pt-4">
        <div
          className="
            rounded-xl
            bg-[#cde0f5]/80
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-[#d6d6d6]" />

            <div>
              <h3 className="text-[13px] font-bold leading-tight text-[#001229]">
                {user.nama_UMKM ?? "Usaha belum diatur"}
              </h3>

              <p className="mt-1 text-[11px] font-medium text-[#4b607a]">
                Owner: {user.nama_lengkap ?? user.email ?? "Pemilik"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}