"use client";

import { useState, type FormEvent } from "react";
import { UserRound, KeyRound, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "./InputField";
import GoogleIcon from "../ui/GoogleIcon";
import Button from "../ui/Button";
import { apiRequest } from "../../lib/api";
import { saveSession } from "../../lib/session";

export default function LoginForm() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    const savedEmail = sessionStorage.getItem("cuanku_login_email") ?? "";
    sessionStorage.removeItem("cuanku_login_email");
    return savedEmail;
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiRequest<{ token: string; user?: { nama_UMKM?: string; email?: string } }>("/auth/masuk", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      const token = response.token;
      if (token) {
        saveSession(token, response.user ?? null, rememberMe);
        router.push("/dashboard");
      } else {
        throw new Error("Token tidak ditemukan di respons server.");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Gagal masuk.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError("Login Google belum dikonfigurasi.");
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
          label="Username/Email"
          labelIcon={<UserRound size={14} strokeWidth={1.8} />}
          placeholder="email@contoh.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <InputField
          label="Kata Sandi"
          labelIcon={<KeyRound size={14} strokeWidth={2} />}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
            onClick={() => router.push("/forgot-password")}
            className="text-sm font-medium text-blue-500 transition hover:text-blue-700 hover:underline"
          >
            Lupa kata sandi?
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          fullWidth
          radius="full"
          size="lg"
          className="bg-[#5b9ef0] text-white shadow-[0_6px_20px_rgba(91,158,240,0.45)] hover:bg-[#4a8de0] hover:shadow-[0_8px_24px_rgba(91,158,240,0.55)] active:scale-[0.99]"
        >
          {loading ? "Memproses..." : "Masuk"}
        </Button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          fullWidth
          radius="full"
          size="lg"
          className="mt-3"
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