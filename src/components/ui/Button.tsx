import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "danger-ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";
type ButtonRadius = "md" | "lg" | "xl" | "full";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    radius?: ButtonRadius;
    fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-[#5a9aef] text-white hover:bg-[#4a89db] shadow-[0_8px_20px_rgba(90,154,239,0.25)] hover:shadow-[0_8px_20px_rgba(90,154,239,0.35)]",
    secondary: "bg-[#f4f7fb] text-[#001229] hover:bg-slate-100",
    ghost: "bg-transparent text-[#001229] hover:bg-[#F4F9FF]",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-[0_8px_20px_rgba(239,68,68,0.25)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.35)]",
    "danger-ghost": "bg-transparent text-[#ff4c4c] hover:bg-red-50",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-[13px]",
    icon: "p-1.5",
};

const radiusClasses: Record<ButtonRadius, string> = {
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    radius = "xl",
    className = "",
    fullWidth = false,
    ...props
}: ButtonProps) {
    const baseClasses = "flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
    const widthClass = fullWidth ? "w-full" : "w-auto";

    return (
        <button
          {...props}
          className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${radiusClasses[radius]} ${widthClass} ${className}`.trim()}
        >
            {children}
        </button>
    );
}