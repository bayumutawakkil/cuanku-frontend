"use client";

import RegisterIllustration from "../../components/auth/RegisterIllustration";
import RegisterForm from "../../components/auth/RegisterForm";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, unwrapObject } from "../../lib/api";

export default function RegisterRoute() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    const passwordConfirmation = String(
      form.get("password_confirmation")
    );

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

      if (typeof token === "string") {
        localStorage.setItem("cuanku_token", token);
      }

      router.push(token ? "/dashboard" : "/login");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Pendaftaran gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen w-full overflow-hidden bg-white lg:flex-row">
        <RegisterIllustration />

        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-sky-200 px-6 py-12 sm:px-12 lg:w-1/2">
          <RegisterForm/>
        </div>
      </section>
    </main>
  );
}