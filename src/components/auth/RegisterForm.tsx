"use client";

import { useState, type FormEvent } from "react";
import InputField from "./InputField";
import Button from "../ui/Button";
import GoogleIcon from "../ui/GoogleIcon";
import { apiRequest, unwrapObject } from "../../lib/api";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Konfirmasi kata sandi tidak sama.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await apiRequest<unknown>("/auth/daftar", {
                method: "POST",
                body: JSON.stringify({
                    nama_UMKM: organization,
                    email,
                    password,
                }),
            });

            const result = unwrapObject(response);
            const token = result.token ?? result.access_token;

            if (typeof token === "string") {
                localStorage.setItem("cuanku_token", token);
            }

            window.location.href = token ? "/dashboard" : "/login";
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

    const handleGoogleRegister = () => {
        console.log("Daftar dengan Google");
    };

    return (
        <div className="w-full max-w-lg">
            <div className="mb-5">
                <h2 className="text-3xl font-bold text-slate-900">
                    Daftar
                </h2>

                <p className="mt-2 max-w-xs text-sm text-slate-500">
                    Gabung sekarang dan kembangkan usaha Anda.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="border border-slate-200 bg-white text-slate-800 shadow-md hover:bg-slate-50"
                >
                    <GoogleIcon />
                    Gunakan akun Google
                </Button>

                <div className="my-3 text-center text-sm text-slate-400">
                    Atau
                </div>

                <InputField
                    label="Nama Lengkap"
                    labelIcon="👤"
                    placeholder="Rendi Wahyudi"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <InputField
                    label="Alamat Email"
                    labelIcon="📧"
                    type="email"
                    placeholder="rendiwahyudi@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <InputField
                    label="Nama UMKM/Organisasi"
                    labelIcon="🏢"
                    placeholder="Minimarket Jaya Sentosa"
                    value={organization}
                    onChange={(event) => setOrganization(event.target.value)}
                />

                <InputField
                    label="Kata Sandi"
                    labelIcon="🔒"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <InputField
                    label="Konfirmasi Kata Sandi"
                    labelIcon="🔒"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />

                {error && (
                    <p className="mb-4 text-sm text-red-500">
                        {error}
                    </p>
                )}
                
                <Button 
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md hover:shadow-lg"
                >
                    {loading ? "Mendaftarkan..." : "Daftar"}
                </Button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
                Sudah punya akun?{" "}
                <button 
                    type="button"
                    className="font-medium text-blue-500 hover:underline"
                >
                    Masuk
                </button>
            </p>
        </div>
    );
}