"use client";

import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, PackageCheck, TrendingUp } from "lucide-react";
import { apiRequest, unwrapList } from "../lib/api";

type Forecast = {
  tanggal: string;
  prediksi_rp: number;
};

type HistoryData = {
  tanggal: string;
  total_rp: number;
};

type Stock = {
  nama_produk: string;
  sisa_stok: number;
};

export default function PredictionContent() {
  const [forecast, setForecast] = useState<Forecast[]>([]);
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [stock, setStock] = useState<Stock[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"revenue" | "stock">("revenue");

  useEffect(() => {
    Promise.all([
      apiRequest<unknown>("/dashboard/predict-revenue", {
        method: "POST",
        body: JSON.stringify({ n_hari: 7 }),
      }),
      apiRequest<unknown>("/transaksi/stok"),
      apiRequest<unknown>("/transaksi"),
    ])
      .then(([predictionResponse, stockResponse, transResponse]) => {
        const body = predictionResponse as { result?: { data?: Forecast[] }; data?: Forecast[] };
        setForecast(body.result?.data ?? body.data ?? []);
        
        setStock(
          unwrapList<Record<string, unknown>>(stockResponse, ["products", "produk", "stocks", "stok", "items"]).map((item) => ({
            nama_produk: String(item.nama_produk ?? item.name ?? "-"),
            sisa_stok: Number(item.sisa_stok ?? item.stock ?? item.stok ?? 0),
          }))
        );

        const transBody = unwrapList<Record<string, unknown>>(transResponse, ["transactions", "transaksi", "items"]);
        const histMap = new Map<string, number>();
        transBody.forEach((t) => {
          const type = String(t.type ?? t.transaction_type ?? t.jenis ?? t.jenis_transaksi);
          if (type === "Pemasukan") {
            const dateVal = t.date ?? t.tanggal ?? "";
            const d = new Date(String(dateVal));
            if (!Number.isNaN(d.getTime())) {
              const dateStr = d.toISOString().split("T")[0];
              const amount = Number(t.amount ?? t.nominal ?? t.jumlah ?? 0);
              histMap.set(dateStr, (histMap.get(dateStr) || 0) + amount);
            }
          }
        });

        const histArray = Array.from(histMap.entries())
          .map(([tanggal, total_rp]) => ({ tanggal, total_rp }))
          .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());

        setHistory(histArray.slice(-14)); // Ambil max 14 hari terakhir untuk grafik
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
  const chartData = useMemo(() => {
    if (!forecast.length && !history.length) return null;

    const maxHist = history.length ? Math.max(...history.map((h) => h.total_rp)) : 0;
    const maxPred = forecast.length ? Math.max(...forecast.map((f) => f.prediksi_rp)) : 0;
    const maxY = Math.max(maxHist, maxPred, 1);

    const totalPoints = history.length + forecast.length;
    const stepX = totalPoints > 1 ? 100 / (totalPoints - 1) : 50;

    const historyCoords = history.map((h, i) => ({
      x: i * stepX,
      y: 90 - (h.total_rp / maxY) * 70,
      tanggal: h.tanggal,
      val: h.total_rp,
    }));

    const forecastCoords = forecast.map((f, i) => ({
      x: (history.length + i) * stepX,
      y: 90 - (f.prediksi_rp / maxY) * 70,
      tanggal: f.tanggal,
      val: f.prediksi_rp,
    }));

    const histPoints = historyCoords.map((c) => `${c.x},${c.y}`).join(" ");
    let predPoints = forecastCoords.map((c) => `${c.x},${c.y}`).join(" ");

    if (history.length > 0 && forecast.length > 0) {
      const lastHist = historyCoords[historyCoords.length - 1];
      predPoints = `${lastHist.x},${lastHist.y} ${predPoints}`;
    }

    const allDates = [...history.map((h) => h.tanggal), ...forecast.map((f) => f.tanggal)];
    const labels = [];
    if (allDates.length > 0) {
      labels.push(allDates[0]);
      if (allDates.length > 2) labels.push(allDates[Math.floor(allDates.length / 2)]);
      if (allDates.length > 1) labels.push(allDates[allDates.length - 1]);
    }

    return { histPoints, predPoints, historyCoords, forecastCoords, labels };
  }, [forecast, history]);

  if (loading) return <div className="p-8 text-center text-slate-500">Memuat prediksi...</div>;

  return (
    <div className="space-y-5">

      {/* TAB */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("revenue")}
          className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${
            activeTab === "revenue"
              ? "bg-[#173B8F] text-white"
              : "bg-white text-[#001229] border border-[#E6EDF6]"
          }`}
        >
          Prediksi Pendapatan
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stock")}
          className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${
            activeTab === "stock"
              ? "bg-[#173B8F] text-white"
              : "bg-white text-[#001229] border border-[#E6EDF6]"
          }`}
        >
          Prediksi Kebutuhan Stok
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* ============================= */}
      {/* GRAFIK */}
      {/* ============================= */}

      {activeTab === "revenue" ? (
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-start justify-between">

            <div>
              <h2 className="text-sm font-bold text-[#001229]">
                Proyeksi Penjualan dan Pendapatan
              </h2>

              <p className="text-[9px] text-slate-400">
                Data historis (garis solid) vs Estimasi cerdas AI (garis putus-putus)
              </p>
            </div>

            <div className="flex items-center gap-4 text-[9px] text-slate-500">

              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#173B8F]" />
                Historis
              </div>

              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                Prediksi AI
              </div>

            </div>
          </div>

          {/* CHART */}
          <div className="relative h-[190px] overflow-hidden rounded-lg">

            {/* GRID */}
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="border-t border-dashed border-slate-200" />
              <div className="border-t border-dashed border-slate-200" />
              <div className="border-t border-dashed border-slate-200" />
              <div className="border-t border-dashed border-slate-200" />
              <div className="border-t border-dashed border-slate-200" />
            </div>

            {chartData ? (
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >

                {/* GARIS PREDIKSI */}
                {chartData.predPoints && (
                  <polyline
                    points={chartData.predPoints}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                    vectorEffect="non-scaling-stroke"
                  />
                )}

                {/* GARIS HISTORIS */}
                {chartData.histPoints && (
                  <polyline
                    points={chartData.histPoints}
                    fill="none"
                    stroke="#173B8F"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )}

                {/* TITIK HISTORIS */}
                {chartData.historyCoords.map((c) => (
                  <circle
                    key={`hist-${c.tanggal}`}
                    cx={c.x}
                    cy={c.y}
                    r="1.3"
                    fill="#173B8F"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {/* TITIK PREDIKSI */}
                {chartData.forecastCoords.map((c) => (
                  <circle
                    key={`pred-${c.tanggal}`}
                    cx={c.x}
                    cy={c.y}
                    r="1.3"
                    fill="#F59E0B"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                Belum ada data riwayat atau prediksi.
              </div>
            )}

            {/* LABEL TANGGAL */}
            {chartData && chartData.labels.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-slate-400">
                {chartData.labels.map((dateStr, i) => (
                  <span key={`${dateStr}-${i}`}>
                    {new Date(dateStr).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      ) : (
        /* ============================= */
        /* PREDIKSI STOK */
        /* ============================= */

        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm">

          <div className="mb-4">
            <h2 className="text-sm font-bold text-[#001229]">
              Proyeksi Kebutuhan Stok
            </h2>

            <p className="text-[9px] text-slate-400">
              Analisis kebutuhan restock berdasarkan kondisi stok saat ini
            </p>
          </div>

          <div className="grid grid-cols-5 gap-3">

            {stock.slice(0, 5).map((item) => (
              <div
                key={item.nama_produk}
                className="rounded-xl bg-[#F4F9FF] p-3"
              >
                <p className="truncate text-[9px] font-semibold text-[#001229]">
                  {item.nama_produk}
                </p>

                <p className="mt-2 text-lg font-black text-[#173B8F]">
                  {item.sisa_stok}
                </p>

                <p className="text-[8px] text-slate-400">
                  sisa stok
                </p>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* ============================= */}
      {/* BAGIAN BAWAH */}
      {/* ============================= */}

      <div className="grid gap-4 lg:grid-cols-[1fr_1.45fr]">

        {/* KIRI */}
        <div className="space-y-4">

          {/* ESTIMASI */}
          <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm">

            <p className="text-[10px] text-slate-500">
              Estimasi Pendapatan Bulan Depan
            </p>

            <h2 className="mt-1 text-2xl font-black text-[#173B8F]">
              {forecast.length
                ? money(estimatedRevenue)
                : "-"}
            </h2>

            <div className="mt-1 inline-flex rounded-md bg-emerald-100 px-2 py-0.5 text-[8px] font-semibold text-emerald-600">
              +12.5%
            </div>

            <span className="ml-1 text-[8px] text-slate-400">
              dari rata-rata bulan ini
            </span>

          </div>

          {/* ANALISIS */}
          <div className="rounded-2xl bg-[#173B8F] p-5 text-white shadow-sm">

            <div className="flex items-center gap-2">

              <BrainCircuit size={15} />

              <h3 className="text-xs font-bold">
                Analisis Insight CuanKu AI
              </h3>

            </div>

            <p className="mt-2 text-[9px] leading-4 text-blue-50">
              {forecast.length
                ? "Tren menunjukkan peningkatan yang konsisten berdasarkan data historis. Pertahankan performa penjualan dan pastikan stok produk dengan permintaan tinggi tetap tersedia."
                : "Analisis akan tampil setelah service machine learning mengembalikan prediksi."}
            </p>

          </div>

        </div>

        {/* KANAN */}
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm">

          <div className="mb-4">
            <h3 className="text-xs font-bold text-[#001229]">
              Rekomendasi Restock Pintar
            </h3>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left text-[9px]">

              <thead className="border-b border-slate-200 text-[8px] text-slate-400">

                <tr>
                  <th className="pb-2 font-semibold">
                    Nama Barang
                  </th>

                  <th className="pb-2 font-semibold">
                    Sisa Waktu
                  </th>

                  <th className="pb-2 font-semibold">
                    Rekomendasi
                  </th>

                  <th className="pb-2 text-right font-semibold">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                {restock.length > 0 ? (
                  restock.slice(0, 5).map((item) => {

                    const critical = item.sisa_stok <= 5;

                    return (
                      <tr
                        key={item.nama_produk}
                        className="border-b border-slate-100 last:border-0"
                      >

                        <td className="py-2 font-semibold text-[#001229]">
                          {item.nama_produk}
                        </td>

                        <td className="py-2 text-slate-400">
                          {critical
                            ? "Habis dalam 2 hari"
                            : "Habis dalam 5 hari"}
                        </td>

                        <td className="py-2 font-bold text-[#173B8F]">
                          {critical
                            ? "30 Karton"
                            : "10 Packs"}
                        </td>

                        <td className="py-2 text-right">

                          <span
                            className={`rounded-md px-2 py-1 text-[7px] font-bold ${
                              critical
                                ? "bg-red-100 text-red-500"
                                : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {critical ? "Urgent" : "Normal"}
                          </span>

                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-slate-400"
                    >
                      Tidak ada rekomendasi restock.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}
