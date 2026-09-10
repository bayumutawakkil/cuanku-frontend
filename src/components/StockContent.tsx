"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import Button from "./common/Button";
import Modal from "./common/Modal";
import type { Product } from "../types";
import { apiRequest, unwrapList } from "../lib/api";
import { useSearchParams } from "next/navigation";

const money = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function StockContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [open, setOpen] = useState(false);

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
    apiRequest("/transaksi/stok", { method: "POST", body: JSON.stringify(product) })
      .then(() => setProducts((current) => [...current, {
        id: Date.now(),
        name: product.nama_produk,
        stock,
        unit: String(f.get("unit")),
        buyPrice: product.harga_beli,
        sellPrice: product.harga_jual,
        status: stock <= 5 ? "Kritis" : stock <= 10 ? "Menipis" : "Aman",
      }]))
      .then(() => setOpen(false))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Gagal menyimpan produk."));
  };

  const totalStockValue = products.reduce((total, product) => total + product.stock * product.buyPrice, 0);
  const lowStockCount = products.filter((product) => product.stock <= 10).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total Produk Terdaftar</p><b className="mt-2 block text-2xl text-[#001229]">{products.length} Produk</b><small className="text-slate-500">Dari database</small></div>
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total Nilai Aset Stok</p><b className="mt-2 block text-2xl text-[#001229]">{money(totalStockValue)}</b><small className="text-slate-500">Estimasi modal barang</small></div>
        <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Produk Stok Menipis</p><b className="mt-2 block text-2xl text-[#001229]">{lowStockCount} Produk</b><small className="text-slate-500">Berdasarkan stok tersimpan</small></div>
      </div>

      <div className="rounded-2xl border border-[#E6EDF6] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:justify-between">
          <div><h2 className="text-xl font-bold text-[#001229]">Daftar Stok Produk</h2></div>
          <div className="flex gap-3"><div className="relative"><Search className="absolute left-3 top-3 text-slate-400" size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." className="rounded-xl border border-slate-200 py-2.5 pl-10 pr-4"/></div><Button onClick={() => setOpen(true)}><Plus size={17} className="mr-2 inline"/>Tambah Produk</Button></div>
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

      <Modal open={open} onClose={() => setOpen(false)} title="Tambah Produk">
        <form onSubmit={addProduct} className="space-y-4">
          <input name="name" required placeholder="Nama Produk" className="w-full rounded-xl border p-3"/>
          <div className="grid grid-cols-2 gap-3"><input name="stock" type="number" required placeholder="Stok" className="rounded-xl border p-3"/><input name="unit" required placeholder="Satuan" className="rounded-xl border p-3"/></div>
          <div className="grid grid-cols-2 gap-3"><input name="buy" type="number" required placeholder="Harga Beli" className="rounded-xl border p-3"/><input name="sell" type="number" required placeholder="Harga Jual" className="rounded-xl border p-3"/></div>
          <div className="flex justify-end gap-3"><Button type="button" variant="secondary" onClick={()=>setOpen(false)}>Batal</Button><Button>Simpan Produk</Button></div>
        </form>
      </Modal>
    </div>
  );
}
