import Link from "next/link";
import { ArrowDownLeft, Package, BarChart3, Brain, } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#eaf4ff]">
      
      {/*NAVBAR*/}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-6">
          
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.svg"
              alt=""
              className="h-8 w-auto"
            />
          </div>

          {/* MENU */}
          <nav className="hidden items-center gap-8 text-xs text-slate-500 md:flex">
            <a href="#fitur" className="hover:text-blue-500">
              Fitur
            </a>

            <a href="#testimoni" className="hover:text-blue-500">
              Testimoni
            </a>

            <a href="#tentang" className="hover:text-blue-500">
              Tentang Kami
            </a>

            <a href="#bantuan" className="hover:text-blue-500">
              Bantuan
            </a>
          </nav>

          {/* BUTTON */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#173b8f] hover:text-blue-500"
            >
              Masuk
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-[#5b9df5] px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#478de9]"
            >
              Mulai Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-6 py-12 md:flex-row md:py-16">
        
        {/* LEFT */}
        <div className="flex-1">
          <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-[#183b88] md:text-5xl">
            Kelola Keuangan
            <br />
            Bisnis Anda dengan
            <br />
            Mudah
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500">
            Mulai dari pencatatan pemasukan, pengeluaran, manajemen stok
            produk real-time, hingga analisis prediksi keuntungan berbasis
            kecerdasan buatan (AI) terintegrasi.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-full bg-[#5b9df5] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition duration-200 hover:bg-[#3F82D8] hover:shadow-lg"
            >
              Mulai Gratis Sekarang
            </Link>

            <a
              href="#fitur"
              className="rounded-full border border-blue-400 bg-white px-5 py-2.5 text-xs font-semibold text-blue-500 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          <p className="mt-5 text-[15px] text-black">
            ⭐ Telah dipercaya oleh 15.000+ pelaku usaha di Indonesia
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-xl">
            <img
              src="/images/Dashboard Mockup.svg"
              alt=""
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section id="fitur" className="mx-auto max-w-[1100px] px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#183b88]">
            Semua Fitur Kebutuhan UMKM Anda
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-500">
            CuanKu dirancang khusus untuk mempercepat pertumbuhan usaha mikro,
            kecil, dan menengah dengan solusi digital praktis.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          
          {/* CARD 1 */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2ff] text-[#4f91e8]">
              <ArrowDownLeft size={21} strokeWidth={1.8} />
            </div>

            <h3 className="text-sm font-bold text-slate-700">
              Input Pemasukan & Pengeluaran
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Catat setiap transaksi kas harian secara instan. Pisahkan kas pribadi dan kas bisnis dengan mudah.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2ff] text-[#4f91e8]">
              <Package size={21} strokeWidth={1.8} />
            </div>
            
            <h3 className="text-sm font-bold text-slate-700">
              Manajemen Stok Barang
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Pantau ketersediaan barang secara otomatis. Dapatkan notifikasi dini ketika stok produk Anda mulai menipis.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2ff] text-[#4f91e8]">
              <BarChart3 size={21} strokeWidth={1.8} />
            </div>

            <h3 className="text-sm font-bold text-slate-700">
              Dashboard & Visualisasi Data
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Laporan visual interaktif yang menyajikan tren laba bersih, omset bulanan, dan performa keuangan real-time.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2ff] text-[#4f91e8]">
              <Brain size={21} strokeWidth={1.8} />
            </div>

            <h3 className="text-sm font-bold text-slate-700">
              Prediksi Bisnis AI
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Ketahui prediksi pola belanja pelanggan dan estimasi penjualan bulan depan menggunakan algoritma pintar CuanKu AI.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONI ================= */}
      <section
        id="testimoni"
        className="bg-white px-6 py-14"
      >
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-center text-2xl font-bold text-[#183b88]">
            Kisah Sukses Bersama CuanKu
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            
            <div className="rounded-xl bg-[#f4f8fc] p-6">
              <p className="text-xs leading-relaxed text-slate-600">
                "Sebelum pakai CuanKu, pencatatan transaksi toko berantakan
                banget. Sekarang semuanya rapi, stok juga terpantau aman!"
              </p>

              <p className="mt-5 text-xs font-semibold text-slate-700">
                Dewi Lestari
              </p>

              <p className="text-[10px] text-slate-400">
                Aroma Coffee & Bakery
              </p>
            </div>

            <div className="rounded-xl bg-[#f4f8fc] p-6">
              <p className="text-xs leading-relaxed text-slate-600">
                "Fitur Prediksi AI CuanKu sangat membantu saya menentukan stok
                sampai target penjualan bulan berikutnya."
              </p>

              <p className="mt-5 text-xs font-semibold text-slate-700">
                Agus Pratama
              </p>

              <p className="text-[10px] text-slate-400">
                Pratama Auto Parts
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-[1100px] flex-col justify-between gap-6 md:flex-row">
          
          <div>
            <img
              src="/images/logo.svg"
              alt="CuanKu"
              className="h-7 w-auto"
            />

            <p className="mt-2 text-[10px] text-slate-400">
              Solusi pintar pencatatan & analisis keuangan UMKM Indonesia.
            </p>
          </div>

          <div className="flex gap-12 text-[10px] text-slate-500">
            <div>
              <p className="mb-2 font-bold text-slate-700">Layanan</p>
              <p>Pencatatan Kas</p>
              <p>Manajemen Stok</p>
            </div>

            <div>
              <p className="mb-2 font-bold text-slate-700">Perusahaan</p>
              <p>Tentang Kami</p>
              <p>Hubungi Kami</p>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}