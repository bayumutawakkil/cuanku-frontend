"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Bell, Plus, Search, Pencil, Trash2, UploadCloud } from "lucide-react";
import Button from "./common/Button";
import Modal from "./common/Modal";
import type { Product } from "../types";
import { apiRequest, unwrapList } from "../lib/api";
import { addNotification } from "../lib/notification";
import { useSearchParams } from "next/navigation";

const money = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function StockContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    apiRequest<unknown>("/transaksi/stok")
      .then((response) => {
        const products = unwrapList<Record<string, unknown>>(response, ["products", "produk", "stocks", "stok", "items"]);
        setProducts(products.map((item, index) => {
            const stock = Number(item.stock ?? item.quantity ?? item.stok ?? item.sisa_stok ?? 0);
            return {
            id: Number(item.id ?? item.id_produk ?? index),
            name: String(item.name ?? item.nama ?? item.product_name ?? item.nama_produk ?? "-"),
            stock,
            unit: String(item.unit ?? item.satuan ?? "unit"),
            buyPrice: Number(item.buyPrice ?? item.buy_price ?? item.harga_beli ?? 0),
            sellPrice: Number(item.sellPrice ?? item.sell_price ?? item.harga_jual ?? 0),
            status: stock <= 5 ? "Kritis" : stock <= 10 ? "Menipis" : "Aman",
          };
        }));
      })
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Gagal memuat stok."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), [products, search]);

  const addProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const stock = Number(f.get("stock"));
    const product = {
      nama_produk: String(f.get("name")),
      sisa_stok: stock,
      harga_beli: Number(f.get("buy")),
      harga_jual: Number(f.get("sell")),
    };
    apiRequest("/transaksi/stok", {
      method: "POST",
      body: JSON.stringify(product),
    })
      .then(() => {
        const newProduct = {
          id: Date.now(),
          name: product.nama_produk,
          stock,
          unit: String(f.get("unit")),
          buyPrice: product.harga_beli,
          sellPrice: product.harga_jual,
          status:
            stock <= 5
              ? "Kritis"
              : stock <= 10
              ? "Menipis"
              : "Aman",
        } as Product;

        setProducts((current) => [...current, newProduct]);

        // Tambahkan notifikasi ke header
        addNotification(
          `1 Produk baru telah ditambahkan: ${product.nama_produk}`
        );

        setOpen(false);
      })
      .catch((requestError) =>
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Gagal menyimpan produk."
        )
      );
  };

  const totalStockValue = products.reduce((total, product) => total + product.stock * product.buyPrice, 0);
  const lowStockCount = products.filter((product) => product.stock <= 10).length;
  const criticalStockCount = products.filter(
    (product) => product.stock < 5
  ).length;

  return (
    <>
    {toast && (
      <div className="fixed left-1/2 top-9 z-[100] -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-[#E8EDF3] px-6 py-3 text-sm font-semibold text-[#001229] shadow-lg">
          <Bell size={18} className="text-[#001229]" />

          <span>{toast}</span>
        </div>
      </div>
    )}

    <div className="space-y-6"></div>
    <div className="space-y-6">
      {/* TOAST NOTIFIKASI */}
      {showToast && (
        <div className="fixed left-1/2 top-9 z-[100] -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full bg-[#D9DEE6] px-6 py-3 text-sm font-semibold text-[#001229] shadow-lg">
            <Bell
              size={22}
              strokeWidth={2}
              className="text-[#001229]"
            />

            <span>1 Produk baru telah ditambahkan</span>
          </div>
        </div>
      )}

      {/* ALERT STOK KRITIS */}
      {criticalStockCount > 0 && (
        <div className="flex items-center gap-4 rounded-xl border border-red-500 bg-red-50 px-5 py-4 text-red-500">
          <AlertTriangle
            size={22}
            strokeWidth={2}
            className="shrink-0"
          />

          <span>Stok produk kritis perlu segera diperbarui.</span>
        </div>
      )}

      <div className="rounded-2xl border border-[#E6EDF6] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:justify-between">
          <div><h2 className="text-xl font-bold text-[#001229]">Daftar Stok Produk</h2></div>
          <div className="flex gap-3">
          <div className="relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." 
              className="rounded-xl border border-slate-200 px-3 py-1.5 pl-3 pr-3"/>
          </div>
          
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full bg-[#6FA8F7] px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5F99EA]"
          >
            <Plus size={17} className="mr-2 inline" />
            Tambah Produk
          </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[#F4F9FF] text-slate-500"><tr>{["Nama Produk","Sisa Stok","Harga Beli","Harga Jual","Margin","Aksi"].map(x=><th key={x} className="px-5 py-4">{x}</th>)}</tr></thead>
            <tbody>{loading && <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-500">Memuat stok...</td></tr>}{error && !loading && <tr><td colSpan={6} className="px-5 py-8 text-center text-red-600">{error}</td></tr>}{filtered.map(p => <tr key={p.id} className="border-t border-slate-100">
              <td className="px-5 py-4 font-medium">{p.name}</td><td className="px-5 py-4">{p.stock} {p.unit}</td><td className="px-5 py-4">{money(p.buyPrice)}</td><td className="px-5 py-4">{money(p.sellPrice)}</td>
              <td className="px-5 py-4 font-bold text-emerald-600">+{Math.round((p.sellPrice/p.buyPrice-1)*100)}%</td>
              <td className="px-5 py-4"><button className="mr-2 p-2 text-[#0049A8]"><Pencil size={16}/></button><button onClick={() => setProducts(products.filter(x=>x.id!==p.id))} className="p-2 text-red-500"><Trash2 size={16}/></button></td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="border-t p-5 text-sm text-slate-500">Menampilkan {filtered.length} dari {products.length} produk</div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Produk Baru"
        width="max-w-[360px]"
      >
        <form onSubmit={addProduct} className="-mt-5 space-y-4">

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

          {/* NAMA PRODUK */}
          <div>
            <label className="mb-1 block text-[12px] font-bold text-[#657894]">
              Nama Produk
            </label>

            <input
              name="name"
              required
              placeholder="Nama Produk"
              className="h-[29px] w-full rounded-lg bg-[#F1F5F9] px-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#6FA8F7]"
            />
          </div>

          {/* SISA STOK */}
          <div>
            <label className="mb-1 block text-[12px] font-bold text-[#657894]">
              Sisa Stok
            </label>

            <input
              name="stock"
              type="number"
              required
              placeholder="1 karton"
              className="h-[29px] w-full rounded-lg bg-[#F1F5F9] px-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#6FA8F7]"
            />
          </div>

          {/* HARGA BELI */}
          <div>
            <label className="mb-1 block text-[12px] font-bold text-[#657894]">
              Harga Beli (per pcs)
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-500">
                Rp
              </span>

              <input
                name="buy"
                type="number"
                required
                placeholder="2.800"
                className="h-[29px] w-full rounded-lg bg-[#F1F5F9] py-2 pl-8 pr-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#6FA8F7]"
              />
            </div>
          </div>

          {/* HARGA JUAL */}
          <div>
            <label className="mb-1 block text-[12px] font-bold text-[#657894]">
              Harga Jual (per pcs)
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-500">
                Rp
              </span>

              <input
                name="sell"
                type="number"
                required
                placeholder="3.500"
                className="h-[29px] w-full rounded-lg bg-[#F1F5F9] py-2 pl-8 pr-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#6FA8F7]"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-2 pt-1">

            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-1.5 text-[9px]"
            >
              Batal
            </Button>

            <Button
              type="submit"
              className="rounded-full bg-[#6FA8F7] px-4 py-1.5 text-[9px] font-semibold text-white shadow-sm transition hover:bg-[#5F99EA]"
            >
              Simpan Produk
            </Button>

          </div>

        </form>
      </Modal>
    </div>
  </>
  );
}
