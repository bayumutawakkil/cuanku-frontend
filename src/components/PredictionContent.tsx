"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, PackageCheck, TrendingUp } from "lucide-react";
import { apiRequest, unwrapObject } from "../lib/api";

const restock = [
  ["Susu UHT Full Cream 1L", "Habis dlm 2 hari", "40 Liter", "Urgent"],
  ["Cup Plastik 16oz (Pack)", "Habis dlm 5 hari", "10 Packs", "Urgent"],
  ["Gula Aren Cair 5L", "Habis dlm 12 hari", "5 Botol", "Normal"],
  ["Kopi Arabika Toraja 250g", "Habis dlm 18 hari", "25 Packs", "Aman"],
];

export default function PredictionContent() {
  const [prediction, setPrediction] = useState<Record<string, unknown>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest<unknown>("/dashboard/predict-revenue")
      .then((response) => setPrediction(unwrapObject(response)))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Gagal memuat prediksi."));
  }, []);

  const estimatedRevenue = prediction.estimatedRevenue ?? prediction.estimated_revenue;
  const insight = prediction.insight ?? prediction.ai_insight;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3"><TrendingUp className="text-[#0049A8]"/><div><h2 className="font-bold">Prediksi Pendapatan</h2><p className="text-sm text-slate-500">Proyeksi Penjualan & Pendapatan</p></div></div>
          <div className="flex h-56 items-end gap-3 border-b border-l p-4">
            {[45,55,52,67,60,75,71,82,78,90,84,100].map((h,i)=><div key={i} className="flex-1 rounded-t bg-[#5C9DEF]" style={{height:`${h}%`}}/>)}
          </div>
          <div className="mt-4 flex gap-5 text-sm text-slate-500"><span>━ Historis</span><span>╌ Prediksi AI</span></div>
        </div>
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Estimasi Pendapatan Bulan Depan</p>
          <h2 className="mt-2 text-3xl font-black text-[#0049A8]">{estimatedRevenue ? String(estimatedRevenue) : "Rp 45.500.000"}</h2>
          <p className="mt-2 text-sm font-semibold text-emerald-600">+12.5% dari rata-rata bulan ini</p>
          <div className="mt-6 rounded-xl bg-[#F4F9FF] p-4"><p className="text-sm font-bold text-[#0049A8]">Insight CuanKu AI</p><p className="mt-2 text-sm leading-6 text-slate-600">{insight ? String(insight) : "Tren menunjukkan peningkatan konsisten dalam 3 bulan terakhir. Permintaan untuk Kopi Susu Gula Aren diperkirakan melonjak sebesar 18% di akhir pekan dikarenakan acara komunitas lokal di sekitar ruko Anda."}</p></div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="rounded-2xl border border-[#E6EDF6] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b p-6"><PackageCheck className="text-[#0049A8]"/><div><h2 className="font-bold">Rekomendasi Restock Pintar</h2><p className="text-sm text-slate-500">Rekomendasi berdasarkan prediksi kebutuhan stok</p></div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-[#F4F9FF] text-slate-500"><tr>{["Nama Barang","Sisa Waktu","Rekomendasi","Status"].map(x=><th key={x} className="px-6 py-4">{x}</th>)}</tr></thead><tbody>{restock.map(r=><tr key={r[0]} className="border-t"><td className="px-6 py-4 font-medium">{r[0]}</td><td className="px-6 py-4">{r[1]}</td><td className="px-6 py-4 font-bold">{r[2]}</td><td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${r[3]==="Urgent"?"bg-red-50 text-red-600":r[3]==="Normal"?"bg-amber-50 text-amber-600":"bg-emerald-50 text-emerald-600"}`}>{r[3]}</span></td></tr>)}</tbody></table></div>
      </div>

      <div className="flex gap-4 rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm"><BrainCircuit className="text-[#0049A8]"/><div><h3 className="font-bold">Analisis CuanKu AI</h3><p className="mt-1 text-sm text-slate-500">Disarankan menambah persediaan cup plastik dan gula aren cair sebelum hari Jumat untuk mengantisipasi peningkatan permintaan.</p></div></div>
    </div>
  );
}
