import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#0049A8] text-white hover:bg-[#004297] active:bg-[#003A86]",
    secondary:
      "border border-[#B0C7E4] bg-white text-[#0049A8] hover:bg-[#E6EDF6]",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-[#0049A8] hover:bg-[#E6EDF6]",
  };

  return (
    <button
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        variants[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
