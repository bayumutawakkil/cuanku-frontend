"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Mail, UserRound, Building2, KeyRound, ArrowLeft } from "lucide-react";
import InputField from "./InputField";
import Button from "../ui/Button";
import GoogleIcon from "../ui/GoogleIcon";
import { apiRequest } from "../../lib/api";
import { saveSession } from "../../lib/session";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
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
            const response = await apiRequest<{ token?: string; access_token?: string; user?: Record<string, unknown> }>("/auth/daftar", {
                method: "POST",
                body: JSON.stringify({
                    nama_UMKM: organization || name,
                    nama_lengkap: name,
                    username,
                    email,
                    password,
                }),
            });

            const token = response.token ?? response.access_token;
            const userFromServer = response.user ?? {};

            if (typeof token === "string") {
                saveSession(token, {
                    id_user: userFromServer.id_user as string | undefined,
                    nama_UMKM: String(userFromServer.nama_UMKM ?? organization ?? name),
                    nama_lengkap: String(userFromServer.nama_lengkap ?? name),
                    username: String(userFromServer.username ?? username),
                    email,
                }, true);
                window.location.href = "/dashboard";
                return;
            }
            window.location.href = "/login";
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
        setError("Pendaftaran Google belum dikonfigurasi.");
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
                    variant="outline"
                    fullWidth
                    radius="full"
                    size="lg"
                >
                    <GoogleIcon />
                    Gunakan akun Google
                </Button>

                <div className="my-3 text-center text-sm text-slate-400">
                    Atau
                </div>

                <InputField
                    label="Nama Lengkap"
                    labelIcon={<UserRound size={14} strokeWidth={1.8} />}
                    placeholder="Nama lengkap"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <InputField
                    label="Username"
                    labelIcon={<UserRound size={14} strokeWidth={1.8} />}
                    placeholder="nama pengguna"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <InputField
                    label="Alamat Email"
                    labelIcon={<Mail size={14} strokeWidth={1.8} />}
                    type="email"
                    placeholder="email@contoh.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <InputField
                    label="Nama UMKM/Organisasi"
                    labelIcon={<Building2 size={14} strokeWidth={1.8} />}
                    placeholder="Nama usaha"
                    value={organization}
                    onChange={(event) => setOrganization(event.target.value)}
                />

                <InputField
                    label="Kata Sandi"
                    labelIcon={<KeyRound size={14} strokeWidth={2} />}
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <InputField
                    label="Konfirmasi Kata Sandi"
                    labelIcon={<KeyRound size={14} strokeWidth={2} />}
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
                    fullWidth
                    radius="full"
                    size="lg"
                    className="bg-[#5b9ef0] text-white shadow-[0_6px_20px_rgba(91,158,240,0.45)] hover:bg-[#4a8de0] hover:shadow-[0_8px_24px_rgba(91,158,240,0.55)] active:scale-[0.99]"
                >
                    {loading ? "Mendaftarkan..." : "Daftar"}
                </Button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
                Sudah punya akun?{" "}
                <Link 
                    href="/login"
                    className="font-medium text-blue-500 hover:underline"
                >
                    Masuk
                </Link>
            </p>
        </div>
    );
}