"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../components/common/Button";
import { apiRequest, unwrapObject } from "../../lib/api";

export default function RegisterRoute() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    const passwordConfirmation = String(form.get("password_confirmation"));

    if (password !== passwordConfirmation) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await apiRequest<unknown>("/auth/masuk", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          organization: form.get("organization"),
          password,
          password_confirmation: passwordConfirmation,
          action: "register",
        }),
      });
      const result = unwrapObject(response);
      const token = result.token ?? result.access_token;
      if (typeof token === "string") localStorage.setItem("cuanku_token", token);
      router.push(token ? "/dashboard" : "/login");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Pendaftaran gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F9FF] p-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 lg:p-14">
          <div className="mb-8"><span className="text-2xl font-black text-[#0049A8]">Rp CuanKu</span></div>
          <h1 className="text-4xl font-black leading-tight text-[#001229]">Gabung sekarang dan<br /><span className="text-[#0049A8]">kembangkan usaha Anda.</span></h1>
          <p className="mt-4 text-slate-500">Buat akun CuanKu dan mulai kelola bisnis Anda dengan lebih mudah.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {["Nama Lengkap", "Alamat Email", "Nama UMKM/Organisasi", "Kata Sandi", "Konfirmasi Kata Sandi"].map((label, index) => (
              <label key={label} className="block text-sm font-semibold text-[#001229]">{label}<input name={["name", "email", "organization", "password", "password_confirmation"][index]} required type={index > 2 ? "password" : index === 1 ? "email" : "text"} placeholder={label} className="mt-2 w-full rounded-xl border border-slate-200 p-3.5 outline-none focus:border-[#0049A8]" /></label>
            ))}
            <Button type="submit" disabled={loading} fullWidth>{loading ? "Memproses..." : "Daftar"}</Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
          <p className="mt-5 text-center text-sm text-slate-500">Sudah punya akun? <Link href="/login" className="font-bold text-[#0049A8]">Masuk</Link></p>
        </div>
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#E6EDF6] to-[#5C9DEF] p-12 lg:flex lg:flex-col lg:justify-center">
          <div className="relative z-10"><p className="text-6xl font-black leading-tight text-[#001229]">Mulai<br />Perjalanan<br /><span className="text-white">Bisnis Anda!</span></p><p className="mt-6 max-w-sm text-[#001229]/70">Kelola transaksi, stok, dan prediksi bisnis dalam satu platform.</p></div>
        </div>
      </div>
    </main>
  );
}