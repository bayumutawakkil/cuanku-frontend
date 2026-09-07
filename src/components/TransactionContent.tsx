"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => data.filter((t) =>
      (type === "Semua" || t.type === type) &&
      `${t.category} ${t.note}`.toLowerCase().includes(search.toLowerCase())
    ),
    [data, search, type]
  );

  const addTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const item: Transaction = {
      id: Date.now(),
      date: "24 Jan 2026",
      type: form.get("type") as Transaction["type"],
      category: String(form.get("category")),
      note: String(form.get("note")),
      amount: Number(form.get("amount")),
    };
    setData((prev) => [item, ...prev]);
    setOpen(false);
  };

  return (
    <div className="rounded-2xl border border-[#E6EDF6] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#001229]">Riwayat Transaksi</h2>
          <p className="text-sm text-slate-500">Kelola pemasukan dan pengeluaran bisnis Anda.</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus size={17} className="mr-2 inline" />Tambah Transaksi</Button>
      </div>

      <div className="flex flex-col gap-3 p-5 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari transaksi..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-[#0049A8]" />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2.5">
          <option>Semua</option><option>Pemasukan</option><option>Pengeluaran</option>
        </select>
        <select className="rounded-xl border border-slate-200 px-4 py-2.5"><option>Semua Kategori</option><option>Kopi</option><option>Camilan</option></select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-[#F4F9FF] text-slate-500">
            <tr>{["Tanggal", "Jenis", "Kategori", "Catatan", "Nominal", "Aksi"].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="px-5 py-4">{t.date}</td>
                <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${t.type === "Pemasukan" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>{t.type}</span></td>
                <td className="px-5 py-4">{t.category}</td>
                <td className="px-5 py-4">{t.note}</td>
                <td className="px-5 py-4 font-bold">{money(t.amount)}</td>
                <td className="px-5 py-4">
                  <button className="mr-2 rounded-lg p-2 text-[#0049A8] hover:bg-[#E6EDF6]"><Pencil size={16} /></button>
                  <button onClick={() => setData(data.filter(x => x.id !== t.id))} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 p-5 text-sm text-slate-500">Menampilkan {filtered.length} dari 312 transaksi</div>

      <Modal open={open} onClose={() => setOpen(false)} title="Tambah Transaksi Baru">
        <form onSubmit={addTransaction} className="space-y-4">
          <select name="type" required className="w-full rounded-xl border border-slate-200 p-3"><option>Pemasukan</option><option>Pengeluaran</option></select>
          <input name="category" required placeholder="Kategori" className="w-full rounded-xl border border-slate-200 p-3" />
          <input name="amount" type="number" required placeholder="Nominal (Rupiah)" className="w-full rounded-xl border border-slate-200 p-3" />
          <textarea name="note" required placeholder="Catatan" className="w-full rounded-xl border border-slate-200 p-3" />
          <div className="flex justify-end gap-3"><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Batal</Button><Button type="submit">Simpan Transaksi</Button></div>
        </form>
      </Modal>
    </div>
  );
}
