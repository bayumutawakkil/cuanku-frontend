import type { ReactNode } from "react";

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  icon,
}: InputFieldProps) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-slate-500">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="
            w-full
            rounded-full
            border
            border-slate-200
            bg-white/50
            px-5
            py-3
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

        {icon && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}