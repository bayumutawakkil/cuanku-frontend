"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Plus, PencilLine, Trash2, Calendar, ChevronLeft, ChevronRight, } from "lucide-react";

import Button from "./common/Button";
import Modal from "./common/Modal";
import type { Transaction } from "../types";
import { apiRequest, unwrapList } from "../lib/api";

const initialData: Transaction[] = [
  { id: 1, date: "24 Jan 2026", type: "Pemasukan", category: "Makanan", note: "Penjualan Roti Sari Gandum 200gr 3 bks", amount: 400000 },
  { id: 2, date: "23 Jan 2026", type: "Pengeluaran", category: "Minuman", note: "Pembelian Susu UHT Full Cream 2 Karton", amount: 320000 },
  { id: 3, date: "22 Jan 2026", type: "Pemasukan", category: "Barang", note: "Penjualan Kertas HVS 250lbr 5 pack", amount: 250000 },
  { id: 4, date: "22 Jan 2026", type: "Pengeluaran", category: "Operasional", note: "Biaya listrik dan air toko kopi", amount: 450000 },
  { id: 5, date: "21 Jan 2026", type: "Pemasukan", category: "Makanan", note: "Penjualan makaroni pedas 30 pcs", amount: 450000 },
];

const money = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function TransactionContent() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Semua");
  const [category, setCategory] = useState("Semua");
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<Transaction["type"]>("Pemasukan");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(data.map((t) => t.category))),
    [data]
  );

  useEffect(() => {
    apiRequest<unknown>("/transaksi")
      .then((response) => {
        const transactions = unwrapList<Record<string, unknown>>(response, ["transactions", "transaksi", "items"]);
        if (transactions.length) {
          setData(transactions.map((item, index) => ({
            id: Number(item.id ?? index),
            date: String(item.date ?? item.tanggal ?? ""),
            type: (item.type ?? item.transaction_type ?? item.jenis) as Transaction["type"],
            category: String(item.category ?? item.kategori ?? "-"),
            note: String(item.note ?? item.description ?? item.catatan ?? "-"),
            amount: Number(item.amount ?? item.nominal ?? 0),
          })));
        }
      })
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Gagal memuat transaksi."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => data.filter((t) =>
      (type === "Semua" || t.type === type) &&
      (category === "Semua" || t.category === category) &&
      `${t.category} ${t.note}`.toLowerCase().includes(search.toLowerCase())
    ),
    [data, search, type, category]
  );

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setTransactionType(transaction.type);
    setOpen(true);
  };

  const formatDateForInput = (date: string) => {
    const [day, month, year] = date.split(" ");

    const months: Record<string, string> = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      Mei: "05",
      Jun: "06",
      Jul: "07",
      Agu: "08",
      Sep: "09",
      Okt: "10",
      Nov: "11",
      Des: "12",
    };

    return `${year}-${months[month]}-${day.padStart(2, "0")}`;
  };

  const addTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const transaction: Transaction = {
      id: editingTransaction?.id ?? Date.now(),
      date: new Date(String(form.get("date"))).toLocaleDateString("id-ID", {day: "2-digit", month: "short", year: "numeric", }),
      type: transactionType,
      category: String(form.get("category")),
      note: String(form.get("note")),
      amount: Number(form.get("amount")),
    };
    try {
      await apiRequest("/transaksi", {
        method: "POST",
        body: JSON.stringify(transaction),
      });

      if (editingTransaction) {
        // EDIT
        setData((prev) =>
          prev.map((item) =>
            item.id === editingTransaction.id ? transaction : item
          )
        );
      } else {
        // TAMBAH
        setData((prev) => [transaction, ...prev]);
      }

      setEditingTransaction(null);
      setOpen(false);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Gagal menyimpan transaksi."
      );
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white shadow-sm">
      <div className="flex flex-col gap-4 px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-[#001229]">
          Riwayat Transaksi
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari transaksi..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0049A8] sm:w-56"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Calendar size={16} className="text-slate-600" />
            01 Jan - 24 Jan 2026
          </button>

          <button
            onClick={() => {setEditingTransaction(null); setTransactionType("Pemasukan"); setOpen(true); }}
            className="rounded-full bg-[#6FA8F7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5F99EA]"
          >
            <Plus size={16} className="mr-2 inline" />
            Tambah Transaksi
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-8 pb-6">
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
            {loading && <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-500">Memuat transaksi...</td></tr>}
            {error && !loading && <tr><td colSpan={6} className="px-5 py-8 text-center text-red-600">{error}</td></tr>}
            {filtered.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="px-5 py-3.5">{t.date}</td>
                <td className="px-5 py-3.5"><span className={`rounded-full px-3 py-1 text-xs font-bold ${t.type === "Pemasukan" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>{t.type}</span></td>
                <td className="px-5 py-3.5">{t.category}</td>
                <td className="px-5 py-3.5">{t.note}</td>
                <td className={`px-5 py-3.5 font-bold ${t.type === "Pemasukan" ? "text-emerald-600" : "text-red-500"}`}>{money(t.amount)}</td>
                <td className="px-5 py-3.5">
                  <button type="button" onClick={() => handleEdit(t)} className="mr-2 rounded-lg p-1.5 text-[#0066CC] hover:bg-[#E6EDF6]"><PencilLine size={18} strokeWidth={1.8} /></button>
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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Transaksi Baru"
        width="max-w-2xl"
      >
        <form onSubmit={addTransaction} className="space-y-5">

          {/* Jenis Transaksi */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-500">
              Jenis Transaksi
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  transactionType === "Pemasukan"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Pemasukan"
                  checked={transactionType === "Pemasukan"}
                  onChange={() => setTransactionType("Pemasukan")}
                  className="hidden"
                />

                <span
                  className={`h-3 w-3 rounded-full border-2 ${
                    transactionType === "Pemasukan"
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-slate-400 bg-white"
                  }`}
                />

                Pemasukan
              </label>

              <label
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  transactionType === "Pengeluaran"
                    ? "bg-red-100 text-red-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Pengeluaran"
                  checked={transactionType === "Pengeluaran"}
                  onChange={() => setTransactionType("Pengeluaran")}
                  className="hidden"
                />

                <span
                  className={`h-3 w-3 rounded-full border-2 ${
                    transactionType === "Pengeluaran"
                      ? "border-red-500 bg-red-500"
                      : "border-slate-400 bg-white"
                  }`}
                />

                Pengeluaran
              </label>
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-500">
              Kategori
            </label>

            <select
              name="category"
              required
              defaultValue={editingTransaction?.category || ""}
              className="w-full rounded-lg bg-[#F1F5F9] px-3 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#2F6FED]"
            >
              <option value="">Pilih kategori</option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Barang">Barang</option>
              <option value="Operasional">Operasional</option>
            </select>
          </div>

          {/* Nominal */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-500">
              Nominal (Rupiah)
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                Rp
              </span>

              <input
                name="amount"
                type="number"
                required
                defaultValue={editingTransaction?.amount || ""}
                placeholder="400.000"
                className="w-full rounded-lg bg-[#F1F5F9] py-3 pl-10 pr-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#2F6FED]"
              />
            </div>
          </div>

          {/* Tanggal */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-500">
              Tanggal
            </label>

            <div className="relative">
              <input
                name="date"
                type="date"
                required
                defaultValue={editingTransaction ? formatDateForInput(editingTransaction.date): ""}
                className="w-full rounded-lg bg-[#F1F5F9] px-3 py-3 pr-10 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#2F6FED]"
              />

              <Calendar
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
              />
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-500">
              Catatan
            </label>

            <textarea
              name="note"
              required
              defaultValue={editingTransaction?.note || ""}
              placeholder="Catatan"
              rows={3}
              className="w-full resize-none rounded-lg bg-[#F1F5F9] px-3 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#2F6FED]"
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>

            <Button type="submit">
              {editingTransaction ? "Simpan Perubahan" : "Simpan Transaksi"}
            </Button>
          </div>

        </form>
      </Modal>
    </div>
  );
}
