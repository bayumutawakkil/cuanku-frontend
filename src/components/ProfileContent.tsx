"use client";

import { BriefcaseBusiness, Pencil, RefreshCw, Settings, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getSessionUser, type SessionUser } from "../lib/session";

const valueOrDash = (value?: string) => value || "-";

export default function ProfileContent() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser>({});

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

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
            <button type="button" className="flex items-center justify-center gap-2 rounded-[10px] bg-[#5a9aef] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4a89db]">
              <Pencil size={15} /> Edit Profil
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-[10px] bg-[#5a9aef] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4a89db]">
              <RefreshCw size={15} /> Multi User
            </button>
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
