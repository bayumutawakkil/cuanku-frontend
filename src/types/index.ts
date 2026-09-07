export type TransactionType = "Pemasukan" | "Pengeluaran";

export interface Transaction {
  id: number;
  date: string;
  type: TransactionType;
  category: string;
  note: string;
  amount: number;
}

export interface Product {
  id: number;
  name: string;
  stock: number;
  unit: string;
  buyPrice: number;
  sellPrice: number;
  status: "Kritis" | "Menipis" | "Aman";
}

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: string;
}
