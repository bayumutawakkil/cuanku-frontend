"use client";

import { useState, type FormEvent } from "react";
import InputField from "./InputField";
import GoogleIcon from "../ui/GoogleIcon";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Login diproses");
  };

  const handleGoogleLogin = () => {
    console.log("Login dengan Google");
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
        />

        <InputField
          label="♧ Kata Sandi"
          type="password"
          placeholder="••••••••"
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

        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)] transition hover:scale-[1.01] hover:shadow-[0_10px_25px_rgba(37,99,235,0.45)] active:scale-[0.99]"
        >
          Masuk
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 py-3 font-semibold text-slate-700 shadow-md transition hover:bg-white hover:shadow-lg"
        >
          <GoogleIcon />
          Masuk dengan akun Google
        </button>
      </form>

      <p className="mt-14 text-center text-sm text-slate-500">
        Belum punya akun?{" "}
        <button className="font-medium text-blue-500 hover:underline">
          Daftar
        </button>
      </p>
    </div>
  );
}