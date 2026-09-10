"use client";

import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, PackageCheck, TrendingUp } from "lucide-react";
import { apiRequest, unwrapList } from "../lib/api";

type Forecast = {
  tanggal: string;
  prediksi_rp: number;
};

type Stock = {
  nama_produk: string;
  sisa_stok: number;
};

export default function PredictionContent() {
  const [forecast, setForecast] = useState<Forecast[]>([]);
  const [stock, setStock] = useState<Stock[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiRequest<unknown>("/dashboard/predict-revenue", {
        method: "POST",
        body: JSON.stringify({ n_hari: 7 }),
      }),
      apiRequest<unknown>("/transaksi/stok"),
    ])
      .then(([predictionResponse, stockResponse]) => {
        const body = predictionResponse as { result?: { data?: Forecast[] }; data?: Forecast[] };
        setForecast(body.result?.data ?? body.data ?? []);
        setStock(
          unwrapList<Record<string, unknown>>(stockResponse, ["products", "produk", "stocks", "stok", "items"]).map((item) => ({
            nama_produk: String(item.nama_produk ?? item.name ?? "-"),
            sisa_stok: Number(item.sisa_stok ?? item.stock ?? item.stok ?? 0),
          }))
        );
      })
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Gagal memuat prediksi."))
      .finally(() => setLoading(false));
  }, []);

  const estimatedRevenue = useMemo(
    () => forecast.reduce((total, item) => total + Number(item.prediksi_rp || 0), 0),
    [forecast]
  );
  const restock = stock.filter((item) => item.sisa_stok <= 10).sort((a, b) => a.sisa_stok - b.sisa_stok);
  const maxForecast = Math.max(...forecast.map((item) => item.prediksi_rp), 1);
  const money = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

  if (loading) return <div className="p-8 text-center text-slate-500">Memuat prediksi...</div>;

  return (
    <div className="space-y-6">
      {error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3"><TrendingUp className="text-[#0049A8]" /><div><h2 className="font-bold">Prediksi Pendapatan</h2><p className="text-sm text-slate-500">Hasil service machine learning</p></div></div>
          {forecast.length ? <div className="flex h-56 items-end gap-3 border-b border-l p-4">{forecast.map((item) => <div key={item.tanggal} className="flex-1 rounded-t bg-[#5C9DEF]" style={{ height: `${Math.max((item.prediksi_rp / maxForecast) * 100, 3)}%` }} title={`${item.tanggal}: ${money(item.prediksi_rp)}`} />)}</div> : <p className="py-24 text-center text-sm text-slate-500">Belum ada hasil prediksi.</p>}
          <div className="mt-4 text-sm text-slate-500">{forecast.length ? `${forecast.length} hari diprediksi` : "Tidak ada data prediksi"}</div>
        </div>
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Estimasi pendapatan 7 hari ke depan</p>
          <h2 className="mt-2 text-3xl font-black text-[#0049A8]">{forecast.length ? money(estimatedRevenue) : "-"}</h2>
          <div className="mt-6 rounded-xl bg-[#F4F9FF] p-4"><p className="text-sm font-bold text-[#0049A8]">Insight CuanKu AI</p><p className="mt-2 text-sm leading-6 text-slate-600">{forecast.length ? "Estimasi dihitung dari model machine learning berdasarkan data historis." : "Insight belum tersedia karena service machine learning belum mengembalikan data."}</p></div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E6EDF6] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b p-6"><PackageCheck className="text-[#0049A8]" /><div><h2 className="font-bold">Rekomendasi Restock</h2><p className="text-sm text-slate-500">Berdasarkan stok yang tersimpan di database</p></div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-[#F4F9FF] text-slate-500"><tr>{["Nama Barang", "Sisa Stok", "Status"].map((heading) => <th key={heading} className="px-6 py-4">{heading}</th>)}</tr></thead><tbody>{restock.length ? restock.map((item) => <tr key={item.nama_produk} className="border-t"><td className="px-6 py-4 font-medium">{item.nama_produk}</td><td className="px-6 py-4">{item.sisa_stok}</td><td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.sisa_stok <= 5 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>{item.sisa_stok <= 5 ? "Kritis" : "Menipis"}</span></td></tr>) : <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Tidak ada rekomendasi restock.</td></tr>}</tbody></table></div>
      </div>

      <div className="flex gap-4 rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm"><BrainCircuit className="text-[#0049A8]" /><div><h3 className="font-bold">Analisis CuanKu AI</h3><p className="mt-1 text-sm text-slate-500">Analisis akan tampil setelah service machine learning mengembalikan prediksi.</p></div></div>
    </div>
  );
}
