"use client";

import { useEffect, useState } from "react";
import { BarChart3, Package, AlertTriangle } from "lucide-react";
import StatCard from "./common/StatCard";
import { apiRequest } from "../lib/api";

interface Transaksi {
  id_transaksi: number;
  jenis_transaksi: "pemasukan" | "pengeluaran";
  kategori: string;
  jumlah: string | number; // Assuming numeric string from DB
  keterangan: string;
  tanggal: string;
}

interface StokProduk {
  id_produk: number;
  nama_produk: string;
  sisa_stok: number;
  harga_beli: string | number;
  harga_jual: string | number;
  margin_persen: string | number;
}

export default function DashboardContent() {
  const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);
  const [stokList, setStokList] = useState<StokProduk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transaksiRes, stokRes] = await Promise.all([
          apiRequest<{ data: Transaksi[] }>("/transaksi"),
          apiRequest<{ data: StokProduk[] }>("/transaksi/stok"),
        ]);
        setTransaksiList(transaksiRes.data || []);
        setStokList(stokRes.data || []);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate stats
  const totalPendapatan = transaksiList
    .filter((t) => t.jenis_transaksi === "pemasukan")
    .reduce((acc, t) => acc + Number(t.jumlah), 0);

  const totalPengeluaran = transaksiList
    .filter((t) => t.jenis_transaksi === "pengeluaran")
    .reduce((acc, t) => acc + Number(t.jumlah), 0);

  const labaBersih = totalPendapatan - totalPengeluaran;
  const totalTransaksi = transaksiList.length;

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  const getStokStatus = (stok: number) => (stok <= 10 ? "Kritis" : "Aman");

  const stokKritisList = stokList.filter((s) => getStokStatus(s.sisa_stok) === "Kritis");

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Memuat data dashboard...</div>;
  }

  return (
    <div className="space-y-6">

      {/* STAT CARD */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Pendapatan" value={formatRupiah(totalPendapatan)} change="" icon="💰" />
        <StatCard title="Total Pengeluaran" value={formatRupiah(totalPengeluaran)} change="" icon="💸" positive />
        <StatCard title="Laba Bersih" value={formatRupiah(labaBersih)} change="" icon="📈" />
        <StatCard title="Total Transaksi" value={`${totalTransaksi} Transaksi`} change="" icon="🧾" />
      </div>

      {/* TREN PEMASUKAN */}
      <section className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#E6EDF6] p-3 text-[#0049A8]">
            <BarChart3 size={22} />
          </div>

          <div>
            <h2 className="font-bold text-[#001229]">Tren Pemasukan vs Pengeluaran</h2>
            <p className="text-sm text-slate-500">Statistik keuangan (Data dummy sementara untuk grafik)</p>
          </div>
        </div>

        <div className="flex h-64 items-end gap-3 border-b border-l border-slate-200 px-4 pb-0">
          {[45, 62, 52, 72, 58, 82, 70, 91, 78, 96, 85, 100].map(
            (h, i) => (
              <div
                key={i}
                className="flex flex-1 items-end gap-1"
              >
                <div
                  className="w-1/2 rounded-t bg-[#5C9DEF]"
                  style={{ height: `${h}%` }}
                />

                <div
                  className="w-1/2 rounded-t bg-[#B0C7E4]"
                  style={{
                    height: `${Math.max(h - 25, 20)}%`,
                  }}
                />
              </div>
            )
          )}
        </div>

        <div className="mt-4 flex gap-5 text-sm text-slate-500">
          <span>
            <i className="mr-2 inline-block h-3 w-3 rounded-full bg-[#5C9DEF]" />
            Pemasukan
          </span>

          <span>
            <i className="mr-2 inline-block h-3 w-3 rounded-full bg-[#B0C7E4]" />
            Pengeluaran
          </span>

          <span>● Bulan Ini</span>
        </div>
      </section>

      {/* STOK + PRODUK TERLARIS */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* SISA STOK */}
        <section className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Package
              className="text-[#0049A8]"
              size={24}
            />

            <h2 className="font-bold text-[#001229]">
              Sisa Stok Produk
            </h2>
          </div>

          <div className="space-y-4">
            {stokList.length > 0 ? stokList.map((stok) => (
              <div key={stok.id_produk} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
                <span className="text-sm font-medium text-slate-700">{stok.nama_produk}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${getStokStatus(stok.sisa_stok) === "Kritis" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                  {stok.sisa_stok} pcs · {getStokStatus(stok.sisa_stok)}
                </span>
              </div>
            )) : <p className="text-sm text-slate-500">Belum ada data stok barang.</p>}
          </div>
        </section>

        {/* PRODUK TERLARIS */}
        <section className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <BarChart3
              className="text-[#0049A8]"
              size={24}
            />

            <h2 className="font-bold text-[#001229]">
              Produk Terlaris
            </h2>
          </div>

          <div className="space-y-4">
            {/* Tampilkan margin produk tertinggi sebagai Produk Terlaris sementara ini */}
            {stokList.length > 0 ? stokList.sort((a, b) => Number(b.margin_persen) - Number(a.margin_persen)).slice(0, 5).map((stok, i) => (
              <div key={stok.id_produk} className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6EDF6] text-sm font-bold text-[#0049A8]">{i + 1}</span>
                <span className="flex-1 text-sm font-medium text-slate-700">{stok.nama_produk}</span>
                <span className="text-sm font-bold text-[#001229]">{stok.margin_persen}% margin</span>
              </div>
            )) : <p className="text-sm text-slate-500">Belum ada data produk terlaris.</p>}
          </div>
        </section>
      </div>

      {stokKritisList.length > 0 && (
        <div className="flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-5">
          <AlertTriangle className="text-red-500" />
          <div>
            <h3 className="font-bold text-red-700">Peringatan Stok Menipis!</h3>
            <p className="text-sm text-red-600">Ada {stokKritisList.length} produk berada dalam kondisi stok kritis.</p>
          </div>
        </div>
      )}
    </div>
  );
}