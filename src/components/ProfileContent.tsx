import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Pencil,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";

import Sidebar from "./layout/Sidebar";

export default function ProfileContent() {
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

  return (
    <div className="min-h-screen bg-[#eaf2fb]">

      {/* ================= MAIN ================= */}

      <Sidebar />
      <div className="lg:ml-[230px]">

        {/* HEADER */}

        <header
          className="
            sticky top-0 z-30
            flex h-[70px]
            items-center justify-between
            bg-[#f8f8f8]
            px-5
            shadow-[0_2px_10px_rgba(0,0,0,0.08)]
            md:px-8
          "
        >
          {/* Judul halaman */}
          <h1 className="text-2xl font-bold text-[#243248]">
            Profile
          </h1>

          <div className="flex items-center gap-5">

            {/* Notification */}

            <button
              className="
                relative flex h-10 w-10
                items-center justify-center
                rounded-full bg-[#edf2f8]
                text-[#40536d]
              "
            >
              <Bell size={18} />

              <span
                className="
                  absolute right-2 top-2
                  h-1.5 w-1.5
                  rounded-full bg-red-400
                "
              />
            </button>

            {/* User */}

            <button className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-slate-300" />

              <span className="hidden text-sm font-medium text-[#40536d] md:block">
                Rendi Wahyudi
              </span>

              <ChevronDown size={16} />
            </button>

          </div>
        </header>

        {/* PAGE CONTENT */}

        <main className="p-4 md:p-5 lg:p-6">

          <div className="mx-auto max-w-[1200px]">

            {/* PAGE TITLE */}
            <div className="mb-4">
              <h1 className="text-xl font-bold text-[#243248]">
              </h1>

            </div>

            {/* PROFILE HERO */}

            <section
              className="
                flex flex-col gap-6
                rounded-2xl bg-[#EAF4FF] p-5
                shadow-[0_10px_30px_rgba(74,113,158,0.12)]
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div className="flex items-center gap-4">

                {/* Avatar */}

                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-[#dbe7f5]" />

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
                  <h2 className="text-xl font-bold text-[#34445b]">
                    Rendi Wahyudi
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3">

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

                    <span className="text-sm text-[#34445b]">
                      Minimarket Jaya Sentosa
                    </span>

                  </div>
                </div>
              </div>


              {/* Edit */}

              <button
                className="
                  flex items-center justify-center gap-2
                  rounded-lg
                  bg-[#4F91E8] 
                  px-5 py-2.5
                  text-sm font-semibold text-white
                  transition hover:bg-[#3F82D8]
                "
              >
                <Pencil size={15} />

                Edit Profile
              </button>

            </section>


            {/* GRID */}

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

              {/* LEFT */}

              <div className="space-y-5">

                {/* PERSONAL */}

                <section
                  className="
                    rounded-xl
                    bg-white
                    p-5
                    shadow-[0_8px_25px_rgba(74,113,158,0.1)]
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        bg-[#e7eff8]
                        text-[#35598b]
                      "
                    >
                      <User size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#40516a]">
                        Informasi Pribadi
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Perbarui informasi pribadi pemilik akun
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
                        <span className="font-medium text-slate-500">
                          {label}
                        </span>

                        <span className="text-right text-slate-600">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>
                </section>


                {/* PREFERENCES */}

                <section
                  className="
                    rounded-xl bg-white p-5
                    shadow-[0_8px_25px_rgba(74,113,158,0.1)]
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        bg-[#e7eff8]
                        text-[#35598b]
                      "
                    >
                      <Settings size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#40516a]">
                        Preferensi Akun
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Sesuaikan pengaturan akun Anda.
                      </p>
                    </div>

                  </div>


                  <div className="mt-4 border-t border-slate-200">

                    <div className="border-b border-slate-200 py-4">

                      <h4 className="text-xs font-medium text-slate-600">
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
                        <h4 className="text-xs font-medium text-slate-600">
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
                          text-[#5b6f87]
                        "
                      >
                        Bahasa Indonesia
                      </button>

                    </div>

                  </div>
                </section>

              </div>


              {/* RIGHT */}

              <div className="space-y-5">

                {/* BUSINESS */}

                <section
                  className="
                    rounded-xl bg-white p-5
                    shadow-[0_8px_25px_rgba(74,113,158,0.1)]
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        bg-[#e7eff8]
                        text-[#35598b]
                      "
                    >
                      <BriefcaseBusiness size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#40516a]">
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
                        <span className="font-medium text-slate-500">
                          {label}
                        </span>

                        <span className="text-right leading-relaxed text-slate-600">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>
                </section>


                {/* SECURITY */}

                <section
                  className="
                    rounded-xl bg-white p-5
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
                      <ShieldCheck size={20} />
                    </div>


                    <div>
                      <h3 className="font-semibold text-[#40516a]">
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
                      bg-[#5c91ce]
                      py-3
                      text-xs font-semibold text-white
                      transition
                      hover:bg-[#4a7fb9]
                    "
                  >
                    Simpan Perubahan
                  </button>

                </section>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}