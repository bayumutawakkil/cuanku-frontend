"use client";

import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Pencil,
  Settings,
  ShieldCheck,
  User,
  Repeat2,
  X,
  Camera,
  Plus,
  UserPlus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function ProfileContent() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const personalData = [
    ["Nama Lengkap", "Rendi Wahyudi"],
    ["Email", "rendywahyudi@gmail.com"],
    ["Nomor Telepon", "+628"],
  ];

  const businessData = [
    ["Nama Usaha", "Minimarket Jaya Sentosa"],
    ["Kategori Usaha", "Minimarket"],
    [
      "Alamat",
      "Jl. Melati No. 12, Kec. Padang Barat, Kota Padang, Sumatera Barat",
    ],
  ];

  const [isMultiUserOpen, setIsMultiUserOpen] = useState(false);
  const users = [
    {
      name: "Rendi Wahyudi",
      role: "Pemilik",
      access: "Akses Penuh",
    },
    {
      name: "Naila",
      role: "Manajer Keuangan",
      access: "Akses Penuh",
    },
    {
      name: "Bayu",
      role: "Manajer Logistik",
      access: "Akses Penuh",
    },
    {
      name: "Sabiil",
      role: "Anggota",
      access: "Akses Terbatas",
    },
    {
      name: "Aura",
      role: "Anggota",
      access: "Akses Terbatas",
    },
  ];

  return (
    <div>

      {/* ================= MAIN ================= */}

        {/* PAGE CONTENT */}

        <main className="px-0 pb-4 pt-0 md:px-1 md:pb-6 md:pt-0 lg:px-2 lg:pb-8 lg:pt-0">
          <div className="mx-auto max-w-[1400px]">

            {/* PAGE TITLE */}
            <div className="mb-4">
              <h1 className="text-xl font-bold text-[#243248]">
              </h1>

            </div>

            {/* PROFILE HERO */}

            <section
              className="
                -mt-4
                flex flex-col gap-6
                rounded-2xl bg-white p-6
                shadow-[0_10px_30px_rgba(74,113,158,0.12)]
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div className="flex items-center gap-4">

                {/* Avatar */}

                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-[#dbe7f5]" />

                  <div
                    className="
                      absolute bottom-0 right-0
                      h-7 w-7
                      rounded-full
                      border-2 border-white
                      bg-[#5b91cf]
                    "
                  />
                </div>


                {/* Profile Info */}

                <div>
                  <h2 className="text-2xl font-bold text-[#34445b]">
                    Rendi Wahyudi
                  </h2>

                  <div className="mt-2 flex flex-col items-start gap-2">

                    <span
                      className="
                        rounded-full
                        bg-[#e5eef8]
                        px-4 py-1
                        text-xs font-semibold
                        text-[#4c6685]
                      "
                    >
                      Owner
                    </span>

                    <span className="text-sm font-semibold text-[#34445b]">
                      Minimarket Jaya Sentosa
                    </span>

                  </div>
                </div>
              </div>


              {/* Edit */}
              <div className="flex flex-col gap-2">

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg
                    bg-[#4F91E8] 
                    px-2 py-2
                    text-xs font-semibold text-white
                    transition hover:bg-[#3F82D8]
                  "
                >
                  <Pencil size={15} />

                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={() => setIsMultiUserOpen(!isMultiUserOpen)}
                  className ="
                    flex items-center justify-center gap-2
                    rounded-lg
                    bg-[#4F91E8]
                    px-2 py-2
                    text-xs font-semibold text-white
                    transition hover:bg-[#3f82d8]
                  "
                >

                  <Repeat2 size={15} />

                  Multi User
                </button>
              </div>

            </section>


            {/* GRID */}

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

              {/* LEFT */}

                {/* PERSONAL */}

                <section
                  className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-[0_8px_25px_rgba(74,113,158,0.1)]
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-[#e7eff8]
                        text-[#35598b]
                      "
                    >
                      <User size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#001F54]">
                        Informasi Pribadi
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Data Pribadi Anda sebagai Pemilik Akun
                      </p>
                    </div>

                  </div>


                  <div className="mt-4 border-t border-slate-200">

                    {personalData.map(([label, value]) => (
                      <div
                        key={label}
                        className="
                          grid grid-cols-2 gap-4
                          border-b border-slate-200
                          py-3 text-xs
                        "
                      >
                        <span className="font-medium font-semibold text-slate-500">
                          {label}
                        </span>

                        <span className="text-right font-semibold text-slate-600">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>
                </section>


                {/* PREFERENCES */}

                <section
                  className="
                    rounded-2xl bg-white p-6
                    shadow-[0_8px_25px_rgba(74,113,158,0.1)]
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-[#e7eff8]
                        text-[#35598b]
                      "
                    >
                      <Settings size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#001F54]">
                        Preferensi Akun
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Atur preferensi dan pengaturan akun Anda.
                      </p>
                    </div>

                  </div>


                  <div className="mt-4 border-t border-slate-200">

                    <div className="border-b border-slate-200 py-4">

                      <h4 className="text-xs font-medium font-semibold text-slate-600">
                        Notifikasi
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        Terima notifikasi transaksi, laporan dan stok melalui
                        email dan aplikasi.
                      </p>

                    </div>


                    <div
                      className="
                        flex items-center
                        justify-between
                        gap-4 py-4
                      "
                    >
                      <div>
                        <h4 className="text-xs font-medium font-semibold text-slate-600">
                          Bahasa
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          Pilih bahasa yang anda gunakan.
                        </p>
                      </div>

                      <button
                        className="
                          rounded-full
                          bg-[#e7eff8]
                          px-4 py-2
                          text-xs font-medium
                          font-semibold
                          text-[#5b6f87]
                        "
                      >
                        Bahasa Indonesia
                      </button>

                    </div>

                  </div>
                </section>


              {/* RIGHT */}

                {/* BUSINESS */}

                <section
                  className="
                    rounded-2xl bg-white p-6
                    shadow-[0_8px_25px_rgba(74,113,158,0.1)]
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-[#e7eff8]
                        text-[#35598b]
                      "
                    >
                      <BriefcaseBusiness size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#001F54]">
                        Informasi Bisnis
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Data usaha yang Anda kelola
                      </p>
                    </div>

                  </div>


                  <div className="mt-4 border-t border-slate-200">

                    {businessData.map(([label, value]) => (
                      <div
                        key={label}
                        className="
                          grid grid-cols-2 gap-4
                          border-b border-slate-200
                          py-3 text-xs
                        "
                      >
                        <span className="font-medium font-semibold text-slate-500">
                          {label}
                        </span>

                        <span className="text-right font-semibold leading-relaxed text-slate-600">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>
                </section>


                {/* SECURITY */}

                <section
                  className="
                    rounded-2xl bg-white p-6
                    shadow-[0_8px_25px_rgba(74,113,158,0.1)]
                  "
                >
                  <div
                    className="
                      flex items-center gap-5
                      rounded-lg
                      bg-gradient-to-r
                      from-[#edf4fb]
                      to-[#dbe8f6]
                      p-5
                    "
                  >

                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        bg-[#dbe7f5]
                        text-[#35598b]
                      "
                    >
                      <ShieldCheck size={22} />
                    </div>


                    <div>
                      <h3 className="font-semibold text-[#001F54]">
                        Data Anda Aman
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        Kami berkomitmen untuk menjaga keamanan data pribadi
                        dan bisnis Anda.
                      </p>
                    </div>

                  </div>


                  <button
                    className="
                      mt-5 w-full
                      rounded-lg
                      bg-[#4F91E8]
                      py-3
                      text-xs font-semibold text-white
                      transition
                      hover:bg-[#4a7fb9]
                    "
                  >
                    Simpan Perubahan
                  </button>

                  <button
                    className="
                      mt-5 w-full
                      rounded-lg
                      bg-red-500
                      py-3
                      text-xs font-semibold text-white
                      transition
                      hover:bg-[#c53030]
                    "
                  >
                    Log Out
                  </button>

                </section>

            </div>

          </div>

        </main>

        {/*Edit Profile Modal*/}
        {isEditModalOpen && (
          <div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-slate-900/40
              px-4
              backdrop-blur-[2px]
            "
            onClick={() => setIsEditModalOpen(false)}
          >
            <div
              className="
                relative
                w-full max-w-[400px]
                rounded-2xl bg-white p-5
                shadow-2xl
                md:p-5
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#243248]">
                  Edit Profil
                </h2>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-full
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    hover:text-slate-700
                  "
                  aria-label="Tutup"
                >
                  <X size={16} />
                </button>
              </div>

              {/* AVATAR */}

              <div className="mt-5 flex justify-center">
                <div className="relative">

                  <div
                    className="
                      h-[116px] w-[116px]
                      rounded-full
                      bg-[#E7F1FD]
                    "
                  />

                  <button
                    type="button"
                    className="
                      absolute
                      bottom-0
                      right-0
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-[#4F91E8]
                      text-white
                      shadow-md
                      transition
                      hover:bg-[#3F82D8]
                    "
                  >
                    <Camera size={17} />
                  </button>

                </div>
              </div>


              {/* FORM */}

              <div className="mt-4 space-y-3">

                {/* Nama Lengkap */}

                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-[#60738D]">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    defaultValue="Rendi Wahyudi"
                    className="
                      w-full
                      rounded-md
                      bg-[#EFF4F9]
                      px-3
                      py-2
                      text-xs
                      text-[#34445B]
                      outline-none
                      focus:ring-2
                      focus:ring-[#4F91E8]/30
                    "
                  />
                </div>


                {/* Nama Pengguna */}

                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-[#60738D]">
                    Nama Pengguna
                  </label>

                  <input
                    type="text"
                    defaultValue="rendi_wahyudi"
                    className="
                      w-full
                      rounded-md
                      bg-[#EFF4F9]
                      px-3
                      py-2
                      text-xs
                      text-[#34445B]
                      outline-none
                      focus:ring-2
                      focus:ring-[#4F91E8]/30
                    "
                  />
                </div>


                {/* Email */}

                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-[#60738D]">
                    Email
                  </label>

                  <input
                    type="email"
                    defaultValue="rendywahyudi@gmail.com"
                    className="
                      w-full
                      rounded-md
                      bg-[#EFF4F9]
                      px-3
                      py-2
                      text-xs
                      text-[#34445B]
                      outline-none
                      focus:ring-2
                      focus:ring-[#4F91E8]/30
                    "
                  />
                </div>


                {/* Nomor Telepon */}

                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-[#60738D]">
                    Nomor Telepon
                  </label>

                  <input
                    type="text"
                    defaultValue="+62 813-6789-2345"
                    className="
                      w-full
                      rounded-md
                      bg-[#EFF4F9]
                      px-3
                      py-2
                      text-xs
                      text-[#34445B]
                      outline-none
                      focus:ring-2
                      focus:ring-[#4F91E8]/30
                    "
                  />
                </div>

              </div>


              {/* BUTTON */}

              <div className="mt-23 flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="
                    rounded-md
                    bg-[#EFF4F9]
                    px-4 py-2
                    text-xs font-semibold
                    text-[#40536D]
                    transition
                    hover:bg-[#E2EAF3]
                  "
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="
                    rounded-full
                    bg-gradient-to-r from-[#5B9EF5] to-[#76B5FF]
                    px-5 py-2
                    text-xs font-semibold
                    text-white
                    shadow-sm
                    transition
                     hover:from-[#4F91E8] hover:to-[#69AAFA]
                  "
                >
                  Simpan Perubahan
                </button>

              </div>

            </div>
          </div>
        )}

        {/* Multi User Modal */}
        {isMultiUserOpen && (
          <div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-slate-900/40
              px-4
              backdrop-blur-[2px]
            "
          >
            <div
              className="
                relative
                w-full max-w-[560px]
                rounded-2xl
                bg-white
                p-5
                shadow-2xl
              "
            >

              {/* HEADER */}

              <div
                className="
                  flex items-center justify-between
                  border-b border-slate-200
                  pb-4
                "
              >
                <h2 className="text-base font-bold text-[#243248]">
                  Manajemen Tim & Akses
                </h2>

                <button
                  type="button"
                  onClick={() => setIsMultiUserOpen(false)}
                  className="
                    flex h-6 w-6
                    items-center justify-center
                    rounded-full
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    hover:text-slate-700
                  "
                  aria-label="Tutup"
                >
                  <X size={16} />
                </button>
              </div>


              {/* USER LIST */}

              <div className="mt-1">

                {users.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="
                      flex items-center gap-3
                      border-b border-slate-200
                      py-3
                    "
                  >

                    {/* AVATAR */}

                    <div
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-slate-200
                        text-sm font-semibold
                        text-slate-500
                      "
                    >
                      {item.name.charAt(0)}
                    </div>


                    {/* NAME */}

                    <div className="min-w-[95px] flex-1">
                      <p className="text-sm font-semibold text-[#243248]">
                        {item.name}
                      </p>
                    </div>


                    {/* ROLE */}

                    <div
                      className="
                        flex min-w-[150px]
                        justify-center
                        rounded-full
                        bg-[#dfe8f3]
                        px-3 py-1
                        text-center
                        text-xs font-semibold
                        text-[#243248]
                      "
                    >
                      {item.role}
                    </div>


                    {/* ACCESS */}

                    <div className="min-w-[105px]">
                      <p className="text-xs font-semibold text-[#243248]">
                        {item.access}
                      </p>
                    </div>


                    {/* EDIT */}

                    <button
                      type="button"
                      className="
                        flex h-7 w-7
                        items-center justify-center
                        text-[#3290ff]
                        transition
                        hover:text-[#1475df]
                      "
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil size={18} />
                    </button>


                    {/* DELETE */}

                    <button
                      type="button"
                      className="
                        flex h-7 w-7
                        items-center justify-center
                        text-red-500
                        transition
                        hover:text-red-600
                      "
                      aria-label={`Hapus ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                ))}

              </div>


              {/* TAMBAH PENGGUNA */}

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="
                    flex items-center gap-1
                    rounded-full
                    border border-[#4F91E8]
                    px-4 py-2
                    text-xs font-semibold
                    text-[#4F91E8]
                    transition
                    hover:bg-[#4F91E8]
                    hover:text-white
                  "
                >
                  <Plus size={14} />
                  Tambah Pengguna
                </button>
              </div>


              {/* FOOTER */}

              <div
                className="
                  mt-20
                  flex items-center justify-end gap-3
                "
              >

                <button
                  type="button"
                  onClick={() => setIsMultiUserOpen(false)}
                  className="
                    rounded-lg
                    bg-[#f1f5f9]
                    px-5 py-2
                    text-xs font-semibold
                    text-[#40516a]
                    transition
                    hover:bg-slate-200
                  "
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() => setIsMultiUserOpen(false)}
                  className="
                    rounded-full
                    bg-gradient-to-r from-[#5B9EF5] to-[#76B5FF]
                    px-6 py-2
                    text-xs font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:from-[#4F91E8] hover:to-[#69AAFA]
                  "
                >
                  Simpan Perubahan
                </button>

              </div>

            </div>
          </div>
        )}
    </div>
  );
}