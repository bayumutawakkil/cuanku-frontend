"use client";

import type { ReactNode } from "react";
import { Search, Bell } from "lucide-react";
import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#001229]">
      <Sidebar />
      <div className="lg:ml-[230px]">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#E6EDF6] bg-white/95 px-5 backdrop-blur lg:px-8">
          <div className="relative w-full max-w-md"><Search className="absolute left-3 top-3 text-slate-400" size={18}/><input placeholder="Cari transaksi, stok..." className="w-full rounded-xl bg-[#F4F9FF] py-2.5 pl-10 pr-4 outline-none"/></div>
          <div className="ml-5 flex items-center gap-4"><Bell size={20} className="text-slate-500"/><div><b className="text-sm">Rendi Wahyudi</b><p className="text-xs text-slate-500">Owner</p></div></div>
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
