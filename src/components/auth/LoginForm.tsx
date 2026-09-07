"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "./InputField";
import GoogleIcon from "../ui/GoogleIcon";
import Button from "../ui/Button";
import { apiRequest, unwrapObject } from "../../lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Langsung masuk ke dashboard tanpa delay
    localStorage.setItem("cuanku_token", "dummy_token_123");
    router.push("/dashboard");
  };

  const handleGoogleLogin = () => {
    // Dummy login untuk tombol Google
    localStorage.setItem("cuanku_token", "dummy_token_123");
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Masuk</h2>

        <p className="mt-2 max-w-xs text-sm text-slate-500">
          Selamat datang kembali! Masuk ke akun Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <InputField
          label="♟ Username/Email"
          placeholder="rendiwahyudi@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <InputField
          label="♧ Kata Sandi"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          icon="⌁"
        />

        <div className="mb-14 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Ingat Saya
          </label>

          <button
            type="button"
            className="text-sm font-medium text-blue-500 transition hover:text-blue-700 hover:underline"
          >
            Lupa kata sandi?
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)] hover:scale-[1.01] hover:shadow-[0_10px_25px_rgba(37,99,235,0.45)] active:scale-[0.99]"
        >
          {loading ? "Memproses..." : "Masuk"}
        </Button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-3 gap-2 border border-slate-200 bg-white/70 text-slate-700 shadow-md hover:bg-white hover:shadow-lg"
        >
          <GoogleIcon />
          Masuk dengan akun Google
        </Button>
      </form>

      <p className="mt-14 text-center text-sm text-slate-500">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-blue-500 hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}