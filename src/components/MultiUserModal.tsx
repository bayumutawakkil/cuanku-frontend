"use client";

import { BriefcaseBusiness, LogIn, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { getSavedAccounts, getSessionUser, SESSION_CHANGE_EVENT, type SavedAccount } from "../lib/session";

type MultiUserModalProps = { isOpen: boolean; onClose: () => void };

export default function MultiUserModal({ isOpen, onClose }: MultiUserModalProps) {
  const router = useRouter();
  const [accounts, setAccounts] = useState<SavedAccount[]>([]);
  const activeAccount = getSessionUser();

  useEffect(() => {
    if (!isOpen) return;
    const refreshAccounts = () => {
      const current = getSessionUser();
      const savedAccounts = getSavedAccounts();
      if (current.email && !savedAccounts.some((account) => account.email === current.email)) {
        savedAccounts.unshift({ id_user: current.id_user, nama_UMKM: current.nama_UMKM, nama_lengkap: current.nama_lengkap, email: current.email, username: current.username });
      }
      setAccounts(savedAccounts);
    };
    refreshAccounts();
    window.addEventListener(SESSION_CHANGE_EVENT, refreshAccounts);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, refreshAccounts);
  }, [isOpen]);

  if (!isOpen) return null;

  const switchAccount = (account: SavedAccount) => {
    onClose();
    if (account.email) sessionStorage.setItem("cuanku_login_email", account.email);
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001229]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[560px] rounded-[24px] bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div><h2 className="text-[18px] font-bold text-[#001229]">Pilih Akun</h2><p className="mt-1 text-sm text-slate-500">Setiap akun memiliki usaha dan data masing-masing.</p></div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 p-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600" aria-label="Tutup"><X size={18} strokeWidth={2.5} /></button>
        </div>

        <div className="space-y-3">
          {accounts.length === 0 ? <p className="py-4 text-center text-sm text-slate-500">Belum ada akun tersimpan.</p> : accounts.map((account) => {
            const isActive = account.email === activeAccount.email;
            return <button key={account.email ?? account.id_user} type="button" onClick={() => !isActive && switchAccount(account)} disabled={isActive} className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-[#5a9aef] hover:bg-[#F4F9FF] disabled:cursor-default disabled:bg-[#F4F9FF]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f1fb] text-[#35598b]"><BriefcaseBusiness size={20} /></div>
              <div className="min-w-0 flex-1"><p className="truncate font-bold text-[#001229]">{account.nama_UMKM ?? "Usaha belum diatur"}</p><p className="truncate text-sm text-slate-500">{account.nama_lengkap ?? account.email}</p><p className="truncate text-xs text-slate-400">{account.email}</p></div>
              {isActive ? <span className="text-xs font-bold text-[#5a9aef]">Aktif</span> : <LogIn size={18} className="text-slate-400" />}
            </button>;
          })}
        </div>

        <div className="mt-6 flex justify-end gap-3"><Button type="button" variant="secondary" size="md" radius="full" onClick={onClose}>Tutup</Button><Button type="button" size="md" radius="full" onClick={() => router.push("/register")}><Plus size={16} /> Tambah Akun</Button></div>
      </div>
    </div>
  );
}
