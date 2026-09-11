import { X, Edit, Trash2 } from "lucide-react";
import Button from "./ui/Button";

type TeamMember = {
  id: string | number;
  name: string;
  role: string;
  access: string;
};

type MultiUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users?: TeamMember[];
};

export default function MultiUserModal({ isOpen, onClose, users = [] }: MultiUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001229]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[640px] rounded-[24px] bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#001229]">Manajemen Tim & Akses</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {users.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-500">Belum ada data anggota tim.</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between border-b border-slate-100 pb-5 last:border-0 last:pb-0"
              >
              <div className="flex w-[200px] items-center gap-4">
                <div className="h-[42px] w-[42px] shrink-0 rounded-full bg-[#d9d9d9]" />
                <span className="truncate text-[14px] font-bold text-[#001229]">
                  {user.name}
                </span>
              </div>

              <div className="flex w-[160px] justify-center">
                <span className="rounded-full bg-[#eef4fb] px-4 py-1.5 text-[12px] font-bold text-[#1f3a5f]">
                  {user.role}
                </span>
              </div>

              <div className="flex w-[120px] justify-center">
                <span className="text-[13px] font-bold text-[#001229]">
                  {user.access}
                </span>
              </div>

              <div className="flex w-[70px] items-center justify-end gap-3.5">
                <button className="text-[#5a9aef] transition hover:text-[#4a89db]">
                  <Edit size={18} strokeWidth={2} />
                </button>
                <button className="text-[#ff4c4c] transition hover:text-[#e63e3e]">
                  <Trash2 size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
            ))
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button className="flex items-center gap-2 rounded-full border border-[#5a9aef] px-5 py-2.5 text-[13px] font-bold text-[#5a9aef] transition hover:bg-[#F4F9FF]">
            + Tambah Pengguna
          </button>
        </div>

        <div className="mt-10 flex items-center justify-end gap-3">
          <Button
            onClick={onClose}
            variant="secondary"
            size="md"
            radius="full"
            className="px-6 py-2.5"
          >
            Batal
          </Button>
          <Button
            onClick={onClose}
            size="md"
            radius="full"
            className="px-6 py-2.5 shadow-[0_8px_20px_rgba(90,154,239,0.25)] hover:shadow-[0_8px_20px_rgba(90,154,239,0.35)]"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
