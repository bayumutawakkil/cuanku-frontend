"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Plus, PencilLine, Trash2, Calendar, ChevronLeft, ChevronRight, UploadCloud, Bell, } from "lucide-react";
import Modal from "./common/Modal";
import type { Transaction } from "../types";
import { apiRequest, unwrapList } from "../lib/api";

const money = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function TransactionContent() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState("Semua");
  const [category, setCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<Transaction["type"]>("Pemasukan");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const searchParams = useSearchParams();
  const globalSearch = searchParams.get("search") || "";
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const formatDisplayDate = (date: string) => {
    if (!date) return "-";
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime())
      ? date
      : parsed.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  };

  const showTransactionNotification = (count: number) => {
    setNotificationCount(count);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const [search, setSearch] = useState(globalSearch);
  
  useEffect(() => {
    const handleHeaderSearch = () => {
      const params = new URLSearchParams(window.location.search);
      const keyword = params.get("search") || "";
      setSearch(keyword);
    };

    handleHeaderSearch();

    window.addEventListener("search-header", handleHeaderSearch);

    return () => {
      window.removeEventListener("search-header", handleHeaderSearch);
    };
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(data.map((t) => t.category))),
    [data]
  );

  useEffect(() => {
    apiRequest<unknown>("/transaksi")
      .then((response) => {
        const transactions = unwrapList<Record<string, unknown>>(response, ["transactions", "transaksi", "items"]);
        setData(transactions.map((item, index) => ({
            id: Number(item.id ?? item.id_transaksi ?? index),
            date: formatDisplayDate(String(item.date ?? item.tanggal ?? "")),
            type: (item.type ?? item.transaction_type ?? item.jenis ?? item.jenis_transaksi) as Transaction["type"],
            category: String(item.category ?? item.kategori ?? "-"),
            note: String(item.note ?? item.description ?? item.catatan ?? item.keterangan ?? "-"),
            amount: Number(item.amount ?? item.nominal ?? item.jumlah ?? 0),
          })));
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, type, category]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filtered.slice(startIndex, endIndex);
  }, [filtered, currentPage]);

  const handleExportData = () => {
    if (filtered.length === 0) {
      alert("Tidak ada data transaksi untuk diekspor.");
      return;
    }

    const headers = [
      "Tanggal",
      "Jenis",
      "Kategori",
      "Catatan",
      "Nominal",
    ];

    const rows = filtered.map((t) => [
      t.date,
      t.type,
      t.category,
      t.note,
      t.amount,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "data-transaksi.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

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

    return months[month] ? `${year}-${months[month]}-${day.padStart(2, "0")}` : date;
  };

  const dateRange = useMemo(() => {
    if (!data.length) return "Belum ada transaksi";
    const dates = data.map((item) => new Date(item.date)).filter((date) => !Number.isNaN(date.getTime()));
    if (!dates.length) return "Semua tanggal";
    const first = new Date(Math.min(...dates.map((date) => date.getTime())));
    const last = new Date(Math.max(...dates.map((date) => date.getTime())));
    return `${first.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })} - ${last.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}`;
  }, [data]);

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
        body: JSON.stringify({
            jenis_transaksi: transaction.type,
            kategori: transaction.category,
            jumlah: transaction.amount,
            keterangan: transaction.note
        }),
      });

      if (editingTransaction) {
        setData((prev) =>
          prev.map((item) =>
            item.id === editingTransaction.id ? transaction : item
          )
        );
      } else {
        setData((prev) => [transaction, ...prev]);

        showTransactionNotification(1);
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
    <div className="w-full">

      {/* NOTIFIKASI */}
      {showNotification && (
        <div className="fixed left-1/2 top-10 z-[9999] -translate-x-1/2">
          <div className="flex min-w-[400px] items-center justify-center gap-3 rounded-full bg-[#D9DEE6] px-7 py-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
            <Bell
              size={22}
              strokeWidth={2}
              className="shrink-0 text-[#001229]"
            />

            <span className="whitespace-nowrap text-base font-semibold text-[#001229]">
              {notificationCount} Transaksi baru telah ditambahkan
            </span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-[#001229]">
          Riwayat Transaksi
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* SEARCH */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari transaksi..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0049A8] sm:w-56"
            />
          </div>

          {/* DATE */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Calendar size={16} className="text-slate-600" />
            {dateRange}
          </button>

          {/* TAMBAH TRANSAKSI */}
          <button
            type="button"
            onClick={() => {
              setEditingTransaction(null);
              setTransactionType("Pemasukan");
              setOpen(true);
            }}
            className="rounded-full bg-[#6FA8F7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5F99EA]"
          >
            <Plus
              size={16}
              className="mr-2 inline"
            />

            Tambah Transaksi
          </button>
        </div>
      </div>


      {/* FILTER */}
      <div className="mb-4 flex flex-wrap gap-2">

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
            {item === "Semua"
              ? "Semua Jenis"
              : item}
          </button>
        ))}

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() =>
              setCategory((prev) =>
                prev === cat ? "Semua" : cat
              )
            }
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


      {/* CONTAINER TABEL */}
      <div className="overflow-hidden rounded-2xl border border-[#E6EDF6] bg-white shadow-sm">

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">

            <thead className="bg-[#F4F9FF] text-[11px] text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">
                  Tanggal
                </th>

                <th className="px-5 py-3 font-semibold">
                  Jenis
                </th>

                <th className="px-5 py-3 font-semibold">
                  Kategori
                </th>

                <th className="px-5 py-3 font-semibold">
                  Catatan
                </th>

                <th className="px-5 py-3 text-right font-semibold">
                  Nominal
                </th>

                <th className="px-5 py-3 text-center font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-sm text-slate-500"
                  >
                    Memuat transaksi...
                  </td>
                </tr>
              )}

              {error && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-sm text-red-600"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      Tidak ada transaksi yang ditemukan.
                    </td>
                  </tr>
                )}

              {!loading &&
                !error &&
                paginatedData.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-slate-100 transition hover:bg-[#F8FBFF]"
                  >

                    {/* TANGGAL */}
                    <td className="px-5 py-4 text-xs text-slate-600">
                      {t.date}
                    </td>

                    {/* JENIS */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold ${
                          t.type === "Pemasukan"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>

                    {/* KATEGORI */}
                    <td className="px-5 py-4 text-xs font-medium text-slate-600">
                      {t.category}
                    </td>

                    {/* CATATAN */}
                    <td className="max-w-[320px] px-5 py-4 text-xs text-slate-500">
                      <span className="block truncate">
                        {t.note}
                      </span>
                    </td>

                    {/* NOMINAL */}
                    <td
                      className={`px-5 py-4 text-right text-xs font-bold ${
                        t.type === "Pemasukan"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {money(t.amount)}
                    </td>

                    {/* AKSI */}
                    <td className="px-5 py-4 text-center">

                      <button
                        type="button"
                        onClick={() => handleEdit(t)}
                        className="mr-1.5 rounded-lg p-1.5 text-[#3B82F6] transition hover:bg-[#EAF2FC]"
                        title="Edit transaksi"
                      >
                        <PencilLine
                          size={16}
                          strokeWidth={2}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setData((prev) =>
                            prev.filter(
                              (x) => x.id !== t.id
                            )
                          )
                        }
                        className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50"
                        title="Hapus transaksi"
                      >
                        <Trash2
                          size={16}
                          strokeWidth={2}
                        />
                      </button>

                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 p-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Menampilkan {filtered.length} dari {data.length} transaksi</span>
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

      </div>


      {/* EKSPOR DATA DI LUAR CONTAINER */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleExportData}
          className="flex items-center gap-2 rounded-full bg-[#6FA8F7] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#5F99EA]"
        >
          Ekspor Data
        </button>
      </div>


      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingTransaction(null);
        }}
        title="Tambah Transaksi Baru"
        width="max-w-md"
      >
        <form onSubmit={addTransaction} className="-mt-5 space-y-4">

          {/* IMPORT DOKUMEN */}
          <div>
            <label className="mb-1.5 block text-[10px] font-bold text-slate-500">
              Impor Dokumen (.XLSX)
            </label>

            <label
              htmlFor="file-upload"
              className="flex h-[80px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#9FB3CC] bg-[#F8FBFF] transition hover:bg-[#F1F7FF]"
            >
              <UploadCloud
                size={25}
                strokeWidth={2}
                className="mb-1 text-[#6B7D96]"
              />

              <span className="text-[9px] font-semibold text-[#71829A]">
                Unggah atau Tarik Dokumen
              </span>

              <span className="text-[7px] text-slate-400">
                Mendukung .XLSX (Maks. 10 MB)
              </span>

              <input
                id="file-upload"
                type="file"
                accept=".xlsx"
                className="hidden"
              />
            </label>
          </div>

          {/* JENIS TRANSAKSI */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-slate-500">
              Jenis Transaksi
            </label>

            <div className="grid grid-cols-2 gap-2.5">

              {/* PEMASUKAN */}
              <label
                className={`flex h-[27px] cursor-pointer items-center gap-2 rounded-lg px-3 text-[10px] font-semibold transition ${
                  transactionType === "Pemasukan"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-[#F1F5F9] text-slate-600"
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
                  className={`h-3 w-3 rounded-full border ${
                    transactionType === "Pemasukan"
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-slate-400 bg-white"
                  }`}
                />

                Pemasukan
              </label>

              {/* PENGELUARAN */}
              <label
                className={`flex h-[27px] cursor-pointer items-center gap-2 rounded-lg px-3 text-[10px] font-semibold transition ${
                  transactionType === "Pengeluaran"
                    ? "bg-red-100 text-red-600"
                    : "bg-[#F1F5F9] text-slate-600"
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
                  className={`h-3 w-3 rounded-full border ${
                    transactionType === "Pengeluaran"
                      ? "border-[#9BB0CA] bg-white"
                      : "border-slate-400 bg-white"
                  }`}
                />

                Pengeluaran
              </label>

            </div>
          </div>

          {/* KATEGORI */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-slate-500">
              Kategori
            </label>

            <select
              name="category"
              required
              defaultValue={editingTransaction?.category || ""}
              className="h-[29px] w-full rounded-lg bg-[#F1F5F9] px-3 text-[11px] text-slate-700 outline-none focus:ring-2 focus:ring-[#6FA8F7]"
            >
              <option value="">Pilih kategori</option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Barang">Barang</option>
              <option value="Operasional">Operasional</option>
            </select>
          </div>

          {/* NOMINAL */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-slate-500">
              Nominal (Rupiah)
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-500">
                Rp
              </span>

              <input
                name="amount"
                type="number"
                required
                defaultValue={editingTransaction?.amount || ""}
                placeholder="400.000"
                className="h-[29px] w-full rounded-lg bg-[#F1F5F9] py-2 pl-8 pr-3 text-[11px] text-slate-700 outline-none focus:ring-2 focus:ring-[#6FA8F7]"
              />
            </div>
          </div>

          {/* TANGGAL */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-slate-500">
              Tanggal
            </label>

            <div className="relative">
              <input
                name="date"
                type="date"
                required
                defaultValue={
                  editingTransaction
                    ? formatDateForInput(editingTransaction.date)
                    : ""
                }
                className="h-[29px] w-full rounded-lg bg-[#F1F5F9] px-3 pr-9 text-[11px] text-slate-700 outline-none focus:ring-2 focus:ring-[#6FA8F7]"
              />

              <Calendar
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
              />
            </div>
          </div>

          {/* CATATAN */}
          <div>
            <label className="mb-1.5 block text-[12px] font-bold text-slate-500">
              Catatan
            </label>

            <textarea
              name="note"
              required
              defaultValue={editingTransaction?.note || ""}
              placeholder="Catatan"
              rows={3}
              className="w-full resize-none rounded-lg bg-[#F1F5F9] px-3 py-2.5 text-[11px] text-slate-700 outline-none focus:ring-2 focus:ring-[#6FA8F7]"
            />
          </div>

          {/* TOMBOL */}
          <div className="flex justify-end gap-2 pt-1">

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setEditingTransaction(null);
              }}
              className="rounded-lg bg-[#F1F5F9] px-4 py-2 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-full bg-[#6FA8F7] px-5 py-2 text-[12px] font-semibold text-white shadow-md transition hover:bg-[#5F99EA]"
            >
              {editingTransaction
                ? "Simpan Perubahan"
                : "Simpan Transaksi"}
            </button>

          </div>

        </form>
      </Modal>
    </div>
  );
}
