"use client";

import { BriefcaseBusiness, Camera, Pencil, RefreshCw, Settings, ShieldCheck, User, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../lib/api";
import { clearSession, getSessionUser, saveSessionUser, SESSION_CHANGE_EVENT, type SessionUser } from "../lib/session";
import Button from "./ui/Button";
import MultiUserModal from "./MultiUserModal";

const valueOrDash = (value?: string) => value || "-";

export default function ProfileContent() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMultiUserModalOpen, setIsMultiUserModalOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    setUser(getSessionUser());
    const refreshUser = () => setUser(getSessionUser());
    window.addEventListener(SESSION_CHANGE_EVENT, refreshUser);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, refreshUser);
  }, []);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingProfile(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await apiRequest<{ data: SessionUser }>("/auth/profil", {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      setUser(response.data);
      saveSessionUser(response.data);
      setIsEditModalOpen(false);
    } finally {
      setSavingProfile(false);
    }
  };

  const logout = () => {
    clearSession();
    router.push("/login");
  };

  const personalData = [
    ["Nama Lengkap", valueOrDash(user.nama_lengkap ?? user.nama_UMKM)],
    ["Username", valueOrDash(user.username)],
    ["Email", valueOrDash(user.email)],
    ["Nomor Telepon", valueOrDash(user.nomor_telepon)],
  ];

  const businessData = [
    ["Nama Usaha", valueOrDash(user.nama_UMKM)],
    ["Kategori Usaha", valueOrDash(user.kategori_usaha)],
    ["Alamat", valueOrDash(user.alamat)],
  ];

  const displayName = user.nama_lengkap ?? user.nama_UMKM ?? user.email ?? "Pengguna";

  return (
    <main className="px-0 pb-4 md:px-1 md:pb-6 lg:px-2 lg:pb-8">
      <div className="mx-auto max-w-[1400px]">
        <section className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(74,113,158,0.12)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-[#eef4fb]" />
              <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-2 border-white bg-[#5a9aef]" />
            </div>
            <div>
              <h2 className="text-[26px] font-bold text-[#1f3a5f]">{displayName}</h2>
              <div className="mt-3 flex flex-col items-start gap-1.5">
                <span className="rounded-full bg-[#eef4fb] px-3.5 py-1 text-xs font-semibold text-[#3b5982]">Pemilik</span>
                <span className="text-[15px] font-semibold text-[#1f3a5f]">{valueOrDash(user.nama_UMKM)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Button onClick={() => setIsEditModalOpen(true)} size="md" className="!rounded-[10px] !text-xs font-semibold">
              <Pencil size={15} /> Edit Profil
            </Button>
            <Button onClick={() => setIsMultiUserModalOpen(true)} size="md" className="!rounded-[10px] !text-xs font-semibold">
              <RefreshCw size={15} /> Multi User
            </Button>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ProfileSection icon={<User size={22} />} title="Informasi Pribadi" description="Data pribadi dari akun Anda." rows={personalData} />
          <ProfileSection icon={<Settings size={22} />} title="Preferensi Akun" description="Preferensi dapat diatur setelah endpoint profil tersedia." rows={[["Bahasa", "Bahasa Indonesia"]]} />
          <ProfileSection icon={<BriefcaseBusiness size={22} />} title="Informasi Bisnis" description="Data usaha dari akun Anda." rows={businessData} />
          <section className="rounded-2xl bg-white p-6 shadow-[0_8px_25px_rgba(74,113,158,0.1)]">
            <div className="flex items-center gap-5 rounded-lg bg-gradient-to-r from-[#edf4fb] to-[#dbe8f6] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbe7f5] text-[#35598b]"><ShieldCheck size={22} /></div>
              <div>
                <h3 className="font-semibold text-[#001F54]">Data Anda Aman</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">Data profil ditampilkan dari akun yang tersimpan di database.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001229]/40 p-4 backdrop-blur-sm">
          <form onSubmit={saveProfile} className="w-full max-w-[500px] rounded-[24px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#001229]">Edit Profil</h2>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="rounded-full border border-slate-200 p-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="relative">
                <div className="h-[120px] w-[120px] rounded-full bg-[#eef4fb]" />
                <button type="button" className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#5a9aef] text-white shadow-sm hover:bg-[#4a89db]">
                  <Camera size={18} />
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-[13px] font-bold text-[#40536d]">Nama Usaha</label>
                <input name="nama_UMKM" type="text" defaultValue={user.nama_UMKM ?? ""} required className="w-full rounded-xl bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-[#001229] outline-none transition focus:ring-2 focus:ring-[#5a9aef]/20" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-bold text-[#40536d]">Nama Lengkap</label>
                <input name="nama_lengkap" type="text" defaultValue={user.nama_lengkap ?? user.nama_UMKM ?? ""} className="w-full rounded-xl bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-[#001229] outline-none transition focus:ring-2 focus:ring-[#5a9aef]/20" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-bold text-[#40536d]">Nama Pengguna</label>
                <input name="username" type="text" defaultValue={user.username ?? ""} className="w-full rounded-xl bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-[#001229] outline-none transition focus:ring-2 focus:ring-[#5a9aef]/20" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-bold text-[#40536d]">Email</label>
                <input name="email" type="email" defaultValue={user.email ?? ""} required className="w-full rounded-xl bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-[#001229] outline-none transition focus:ring-2 focus:ring-[#5a9aef]/20" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-bold text-[#40536d]">Nomor Telepon</label>
                <input name="nomor_telepon" type="text" defaultValue={user.nomor_telepon ?? ""} className="w-full rounded-xl bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-[#001229] outline-none transition focus:ring-2 focus:ring-[#5a9aef]/20" />
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Button onClick={() => setIsEditModalOpen(false)} variant="secondary" size="lg" radius="full">
                Batal
              </Button>
              <Button type="submit" disabled={savingProfile} size="lg" radius="full">
                {savingProfile ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <MultiUserModal
        isOpen={isMultiUserModalOpen}
        onClose={() => setIsMultiUserModalOpen(false)}
      />
    </main>
  );
}

function ProfileSection({
  icon,
  title,
  description,
  rows,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  rows: string[][];
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_8px_25px_rgba(74,113,158,0.1)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7eff8] text-[#35598b]">{icon}</div>
        <div>
          <h3 className="font-semibold text-[#001F54]">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-200">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 gap-4 border-b border-slate-200 py-3 text-xs">
            <span className="font-semibold text-slate-500">{label}</span>
            <span className="text-right font-semibold leading-relaxed text-slate-600">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
