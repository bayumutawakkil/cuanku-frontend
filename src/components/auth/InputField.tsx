"use client";

import { useState, type ReactNode } from "react";

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  labelIcon?: ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  icon,
  labelIcon,
  value,
  onChange,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label className="mb-2 flex items-center gap-1 text-sm font-medium text-slate-500">
        {labelIcon}
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-full
            border
            border-slate-200
            bg-white/50
            px-5
            py-3
            pr-12
            text-sm
            text-slate-700
            outline-none
            shadow-[0_5px_20px_rgba(71,85,105,0.12)]
            transition
            placeholder:text-slate-400
            focus:border-blue-400
            focus:ring-4
            focus:ring-blue-100
          "
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            aria-label={
              showPassword
                ? "Sembunyikan kata sandi"
                : "Tampilkan kata sandi"
            }
          >
            {showPassword ? (
              // Mata terbuka
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // Mata tertutup
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-4.2 5.038" />
                <path d="M14.084 14.084a3 3 0 0 1-4.168-4.168" />
                <path d="M17.479 17.479A10.75 10.75 0 0 1 2.062 12.348a1 1 0 0 1 0-.696A10.75 10.75 0 0 1 5.6 6.35" />
                <path d="m2 2 20 20" />
              </svg>
            )}
          </button>
        ) : (
          icon && (
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </span>
          )
        )}
      </div>
    </div>
  );
}