import { BarChart3, Package, AlertTriangle } from "lucide-react";
import StatCard from "./common/StatCard";

const products = [
  ["Kopi Arabika Toraja 250g", "124 packs", "Aman"],
  ["Kopi Susu Gula Aren (Botol)", "98 botol", "Aman"],
  ["Camilan Makaroni Pedas", "85 pcs", "Aman"],
  ["Bubuk Cokelat Premium 1kg", "42 packs", "Aman"],
];

const stock = [
  ["Susu UHT Full Cream 1L", "4 pcs", "Kritis"],
  ["Cup Plastik 16oz (Pack)", "12 pcs", "Kritis"],
  ["Sedotan Ramah Lingkungan", "45 pcs", "Aman"],
  ["Gula Aren Cair 5L", "18 pcs", "Aman"],
];

export default function DashboardContent() {
  return (
    <div className="space-y-6">

      {/* STAT CARD */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Pendapatan"
          value="Rp 24.580.000"
          change="+12.5%"
          icon="💰"
        />

        <StatCard
          title="Total Pengeluaran"
          value="Rp 9.120.000"
          change="-4.3%"
          icon="💸"
          positive
        />

        <StatCard
          title="Laba Bersih"
          value="Rp 15.460.000"
          change="+18.2%"
          icon="📈"
        />

        <StatCard
          title="Total Transaksi"
          value="312 Transaksi"
          change="+8.1%"
          icon="🧾"
        />
      </div>

      {/* TREN PEMASUKAN */}
      <section className="rounded-2xl border border-[#E6EDF6] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#E6EDF6] p-3 text-[#0049A8]">
            <BarChart3 size={22} />
          </div>

          <div>
            <h2 className="font-bold text-[#001229]">
              Tren Pemasukan vs Pengeluaran
            </h2>

            <p className="text-sm text-slate-500">
              Statistik keuangan harian Anda
            </p>
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
            {stock.map(([name, qty, status]) => (
              <div
                key={name}
                className="
                  flex items-center
                  justify-between
                  border-b border-slate-100
                  pb-3
                  last:border-0
                "
              >
                <span className="text-sm text-slate-700">
                  {name}
                </span>

                <span
                  className={`
                    rounded-full
                    px-3 py-1
                    text-xs font-bold
                    ${
                      status === "Kritis"
                        ? "bg-red-50 text-red-600"
                        : "bg-emerald-50 text-emerald-600"
                    }
                  `}
                >
                  {qty} · {status}
                </span>
              </div>
            ))}
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
            {products.map(([name, qty], i) => (
              <div
                key={name}
                className="flex items-center gap-4"
              >
                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-[#E6EDF6]
                    text-sm font-bold
                    text-[#0049A8]
                  "
                >
                  {i + 1}
                </span>

                <span className="flex-1 text-sm text-slate-700">
                  {name}
                </span>

                <span className="text-sm font-bold text-[#001229]">
                  {qty}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PERINGATAN STOK */}
      <div className="flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-5">
        <AlertTriangle className="text-red-500" />

        <div>
          <h3 className="font-bold text-red-700">
            Peringatan Stok Menipis!
          </h3>

          <p className="text-sm text-red-600">
            4 pcs dan 12 pcs produk berada dalam kondisi kritis.
          </p>
        </div>
      </div>

    </div>
  );
}