"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import InputField from "../../components/auth/InputField";
import Button from "../../components/ui/Button";
import { apiRequest } from "../../lib/api";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmation) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);
    try {
      await apiRequest("/auth/lupa-password", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setMessage("Password berhasil diubah. Silakan masuk dengan password baru.");
      setTimeout(() => router.push("/login"), 1200);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Gagal mengubah password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-sky-200 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <Link href="/" className="mb-8 flex items-center gap-1 text-sm text-slate-500 hover:text-blue-500">
          <ArrowLeft size={14} /> Kembali ke halaman utama
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">Lupa kata sandi?</h1>
        <p className="mt-2 text-sm text-slate-500">Masukkan email dan buat kata sandi baru untuk akun Anda.</p>

        <form onSubmit={handleSubmit} className="mt-8">
          <InputField label="Alamat Email" labelIcon={<Mail size={14} />} type="email" placeholder="email@contoh.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          <InputField label="Kata Sandi Baru" labelIcon={<KeyRound size={14} />} type="password" placeholder="Minimal 6 karakter" value={password} onChange={(event) => setPassword(event.target.value)} />
          <InputField label="Konfirmasi Kata Sandi" labelIcon={<KeyRound size={14} />} type="password" placeholder="Ulangi kata sandi baru" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />

          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          {message && <p className="mb-3 text-sm text-emerald-600">{message}</p>}
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md">
            {loading ? "Memproses..." : "Ubah Kata Sandi"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ingat password? <Link href="/login" className="font-medium text-blue-500 hover:underline">Masuk</Link>
        </p>
      </div>
    </main>
  );
}
