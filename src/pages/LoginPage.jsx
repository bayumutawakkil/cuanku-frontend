"use client";

import { useState } from "react";
import GoogleIcon from "../components/ui/GoogleIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("rendiwahyudi@gmail.com");
  const [password, setPassword] = useState("rahasia");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(230deg,#B6ECFF_0%,#4B9AFF_35%,#193283_100%)] text-[#001229]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(47,40,255,0.72)_0%,rgba(138,89,253,0.2)_42%,transparent_60%),linear-gradient(35deg,rgba(170,208,252,0.48)_0%,rgba(36,32,255,0.35)_100%),linear-gradient(155deg,rgba(172,210,255,0.5)_0%,rgba(245,239,255,0.25)_55%,rgba(221,87,255,0.35)_100%)] bg-blend-screen" />
      <div className="pointer-events-none absolute -left-20 top-[-100px] h-[440px] w-[520px] rounded-br-[180px] bg-[#2F28FF] opacity-70" />
      <div className="pointer-events-none absolute bottom-[-180px] left-[-70px] h-[430px] w-[680px] rounded-tr-[220px] bg-[#2420FF] opacity-75" />
      <div className="pointer-events-none absolute bottom-[-180px] right-[-100px] h-[480px] w-[500px] rotate-12 rounded-tl-[180px] bg-[#DD57FF] opacity-65" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col lg:flex-row">
        <section className="flex min-h-[360px] flex-1 flex-col p-6 text-[#F4F9FF] sm:p-10 lg:min-h-screen lg:p-8">
          <button type="button" className="flex w-fit items-center gap-2 text-base font-semibold text-white/85 transition hover:text-white sm:text-[22px]" onClick={() => window.history.back()}>
            <span aria-hidden="true" className="text-2xl">‹</span>
            Kembali
          </button>

          <div className="mt-auto max-w-[520px] pb-4 sm:pb-8 lg:ml-10 lg:pb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5D547] text-sm font-bold text-[#7E5B00] shadow-lg">RP</div>
              <span className="text-2xl font-bold sm:text-3xl">Cuan<span className="text-[#F5D547]">Ku</span></span>
            </div>
            <h1 className="max-w-[500px] text-5xl font-black leading-[0.98] sm:text-7xl lg:text-[80px]">Selamat Datang Kembali!</h1>
          </div>
        </section>

        <section className="flex w-full items-center justify-center bg-[#F4F9FF]/90 px-6 py-12 sm:px-12 lg:w-[50%] lg:bg-[#F4F9FF]/80 lg:px-16">
          <div className="w-full max-w-[564px]">
            <h2 className="text-4xl font-black sm:text-[40px]">Masuk</h2>
            <p className="mt-5 max-w-sm text-base font-semibold leading-5 text-[#7B90A9] sm:text-lg">Selamat datang kembali! Masuk ke akun Anda.</p>

            <form className="mt-16" onSubmit={handleSubmit}>
              <label className="mb-2 block pl-5 text-base font-semibold text-[#7B90A9] sm:text-lg" htmlFor="email">Username/Email</label>
              <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-[55px] w-full rounded-full bg-white px-9 text-base text-[#7B90A9] shadow-[0_0_20px_#2d6ebe40] outline-none focus:ring-2 focus:ring-[#7BB3FB]" required />

              <label className="mb-2 mt-10 block pl-5 text-base font-semibold text-[#7B90A9] sm:text-lg" htmlFor="password">Kata Sandi</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-[55px] w-full rounded-full bg-white px-9 pr-16 text-base text-[#7B90A9] shadow-[0_0_20px_#2d6ebe40] outline-none focus:ring-2 focus:ring-[#7BB3FB]" required />
                <button type="button" className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#7B90A9]" onClick={() => setShowPassword((currentValue) => !currentValue)} aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}>{showPassword ? "Sembunyikan" : "Lihat"}</button>
              </div>

              <div className="mt-7 flex items-center justify-between gap-4 text-sm font-medium text-[#7B90A9] sm:text-base">
                <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-[#518DDB]" />Ingat Saya</label>
                <a className="text-[#7BB3FB] underline" href="#forgot-password">Lupa kata sandi?</a>
              </div>

              <button type="submit" className="mt-16 h-[55px] w-full rounded-full bg-[linear-gradient(180deg,#9FC9FE_0%,#5DA1F8_100%)] text-xl font-bold text-white shadow-[0_0_20px_#2d6ebe40] transition hover:brightness-105 sm:mt-24 sm:text-2xl">Masuk</button>
              <button type="button" className="mt-4 flex h-[55px] w-full items-center justify-center gap-3 rounded-full bg-white text-base font-bold text-[#001229] shadow-[0_0_20px_#2d6ebe40] transition hover:bg-slate-50 sm:text-xl"><GoogleIcon />Masuk dengan akun Google</button>
            </form>

            <p className="mt-12 text-center text-base font-medium text-[#647891] sm:text-xl">Belum punya akun? <a className="text-[#518DDB] underline" href="#register">Daftar</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}