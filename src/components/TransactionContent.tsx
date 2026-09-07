"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./common/Button";
import Modal from "./common/Modal";
import type { Transaction } from "../types";

const initialData: Transaction[] = [
  { id: 1, date: "24 Jan 2026", type: "Pemasukan", category: "Kopi", note: "Penjualan Kopi Susu Gula Aren 20 botol", amount: 400000 },
  { id: 2, date: "23 Jan 2026", type: "Pengeluaran", category: "Bahan Baku", note: "Pembelian Susu UHT Full Cream 2 Karton", amount: 320000 },
  { id: 3, date: "22 Jan 2026", type: "Pemasukan", category: "Biji Kopi", note: "Penjualan Kopi Arabika Toraja 250g 5 pack", amount: 375000 },
  { id: 4, date: "22 Jan 2026", type: "Pengeluaran", category: "Operasional", note: "Biaya listrik dan air toko kopi", amount: 450000 },
  { id: 5, date: "21 Jan 2026", type: "Pemasukan", category: "Camilan", note: "Penjualan makaroni pedas 30 pcs", amount: 450000 },
];

const money = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function TransactionContent() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Semua");
  const [category, setCategory] = useState("Semua");
  const [open, setOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(data.map((t) => t.category))),
    [data]
  );

  const filtered = useMemo(
    () => data.filter((t) =>
      (type === "Semua" || t.type === type) &&
      (category === "Semua" || t.category === category) &&
      `${t.category} ${t.note}`.toLowerCase().includes(search.toLowerCase())
    ),
    [data, search, type, category]
  );

  const addTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const item: Transaction = {
      id: Date.now(),
      date: String(form.get("date")),
      type: form.get("type") as Transaction["type"],
      category: String(form.get("category")),
      note: String(form.get("note")),
      amount: Number(form.get("amount")),
    };
    setData((prev) => [item, ...prev]);
    setOpen(false);
  };

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col gap-4 px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-xl font-bold text-[#001229]">Riwayat Transaksi</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari transaksi..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0049A8] sm:w-56"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Calendar size={16} className="text-slate-400" />
            01 Jan - 24 Jan 2026
          </button>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-[#2F6FED] px-4 py-2.5 text-sm text-white hover:bg-[#255FDB]"
          >
            <Plus size={16} className="mr-2 inline" />
            Tambah Transaksi
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-5 pb-5">
        {["Semua", "Pemasukan", "Pengeluaran"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setType(item)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              type === item
                ? "bg-[#173B8F] text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {item === "Semua" ? "Semua Jenis" : item}
          </button>
        ))}

        {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory((prev) => (prev === cat ? "Semua" : cat))}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === cat
                  ? "bg-[#173B8F] text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Kategori {cat}
            </button>
          ))}
        </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-[#F4F9FF] text-slate-500">
            <tr>{["Tanggal", "Jenis", "Kategori", "Catatan", "Nominal", "Aksi"].map(h => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="px-5 py-3.5">{t.date}</td>
                <td className="px-5 py-3.5"><span className={`rounded-full px-3 py-1 text-xs font-bold ${t.type === "Pemasukan" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>{t.type}</span></td>
                <td className="px-5 py-3.5">{t.category}</td>
                <td className="px-5 py-3.5">{t.note}</td>
                <td className={`px-5 py-3.5 font-bold ${t.type === "Pemasukan" ? "text-emerald-600" : "text-red-500"}`}>{money(t.amount)}</td>
                <td className="px-5 py-3.5">
                  <button className="mr-2 rounded-lg p-2 text-[#0049A8] hover:bg-[#E6EDF6]"><Pencil size={16} /></button>
                  <button onClick={() => setData(data.filter(x => x.id !== t.id))} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 p-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Menampilkan {filtered.length} dari 312 transaksi</span>
        <div className="flex items-center gap-1">
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50">
            <ChevronLeft size={16} />
          </button>
          <button className="h-8 w-8 rounded-lg bg-[#173B8F] text-xs font-semibold text-white">1</button>
          <button className="h-8 w-8 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">2</button>
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Tambah Transaksi Baru">
        <form onSubmit={addTransaction} className="space-y-4">
          <select name="type" required className="w-full rounded-xl border border-slate-200 p-3"><option>Pemasukan</option><option>Pengeluaran</option></select>
          <input name="category" required placeholder="Kategori" className="w-full rounded-xl border border-slate-200 p-3" />

          <input name="amount" type="number" required placeholder="Nominal (Rupiah)" className="w-full rounded-xl border border-slate-200 p-3" />
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-500">
              Tanggal
            </label>

            <div className="relative">
              <input
                name="date"
                type="date"
                required
                className="w-full rounded-xl border border-slate-200 p-3 pr-10 text-sm outline-none focus:border-[#0049A8]"
              />

              <Calendar
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <textarea name="note" required placeholder="Catatan" className="w-full rounded-xl border border-slate-200 p-3" />
          <div className="flex justify-end gap-3"><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Batal</Button><Button type="submit">Simpan Transaksi</Button></div>
        </form>
      </Modal>
    </div>
  );
}
