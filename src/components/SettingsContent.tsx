"use client";

import { useEffect, useState, type FormEvent } from "react";
import Button from "./common/Button";
import { apiRequest } from "../lib/api";
import { getSessionUser, saveSessionUser, SESSION_CHANGE_EVENT, type SessionUser } from "../lib/session";

export default function SettingsContent() {
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState<SessionUser>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setUser(getSessionUser());
    const refreshUser = () => setUser(getSessionUser());
    window.addEventListener(SESSION_CHANGE_EVENT, refreshUser);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, refreshUser);
  }, []);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await apiRequest<{ data: SessionUser }>("/auth/profil", {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())),
      });
      setUser(response.data);
      saveSessionUser(response.data);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={saveProfile} className="space-y-6">
      <section className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#001229]">Informasi Pribadi</h2>
        <p className="mb-6 mt-1 text-sm text-slate-500">Data pribadi Anda sebagai pemilik akun</p>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold">Nama Lengkap<input name="nama_lengkap" defaultValue={user.nama_lengkap ?? user.nama_UMKM ?? ""} className="mt-2 w-full rounded-xl border p-3 font-normal"/></label>
          <label className="text-sm font-semibold">Email<input name="email" type="email" required defaultValue={user.email ?? ""} className="mt-2 w-full rounded-xl border p-3 font-normal"/></label>
          <label className="text-sm font-semibold">Nomor Telepon<input name="nomor_telepon" defaultValue={user.nomor_telepon ?? ""} className="mt-2 w-full rounded-xl border p-3 font-normal"/></label>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#001229]">Informasi Bisnis</h2>
        <p className="mb-6 mt-1 text-sm text-slate-500">Data usaha yang Anda kelola</p>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold">Nama Usaha<input name="nama_UMKM" required defaultValue={user.nama_UMKM ?? ""} className="mt-2 w-full rounded-xl border p-3 font-normal"/></label>
          <label className="text-sm font-semibold">Kategori Usaha<input name="kategori_usaha" defaultValue={user.kategori_usaha ?? ""} className="mt-2 w-full rounded-xl border p-3 font-normal"/></label>
          <label className="text-sm font-semibold md:col-span-2">Alamat<textarea name="alamat" defaultValue={user.alamat ?? ""} className="mt-2 w-full rounded-xl border p-3 font-normal"/></label>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Preferensi Akun</h2>
        <p className="mb-6 mt-1 text-sm text-slate-500">Atur preferensi dan pengaturan akun Anda.</p>
        <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" defaultChecked className="h-5 w-5 accent-[#0049A8]"/><span><b>Notifikasi</b><br/><small className="text-slate-500">Terima notifikasi transaksi, laporan dan stok melalui email dan aplikasi.</small></span></label>
        <label className="mt-5 block text-sm font-semibold">Bahasa<select className="mt-2 rounded-xl border p-3 font-normal"><option>Bahasa Indonesia</option></select></label>
      </section>

      <div className="flex items-center justify-between rounded-2xl bg-[#F4F9FF] p-5"><div><b>Data Anda Aman</b><p className="text-sm text-slate-500">Kami berkomitmen untuk menjaga keamanan data pribadi dan bisnis Anda.</p></div><Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : saved ? "Tersimpan" : "Simpan Perubahan"}</Button></div>
    </form>
  );
}
