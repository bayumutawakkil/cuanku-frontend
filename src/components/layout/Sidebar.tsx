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

      <div className="flex items-center gap-2">
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-[#ffd36d]
            text-[10px]
            font-bold
            text-[#9c6d17]
            shadow-sm
          "
        >
          RP
        </div>

        <h1 className="text-2xl font-bold text-[#26374e]">
          Cuan<span className="text-[#c8952f]">Ku</span>
        </h1>
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
            bg-[#eaf3ff]/90
            p-4
            shadow-[0_8px_20px_rgba(44,92,145,0.12)]
          "
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-300" />

            <div>
              <h3 className="text-sm font-semibold text-[#33445a]">
                Minimarket Jaya Sentosa
              </h3>

              <p className="text-xs text-slate-500">
                Owner: Rendi Wahyudi
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}