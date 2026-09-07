import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export default function Button({
    children,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
          {...props}
          className={`flex w-full items-center justify-center rounded-full py-3 font-semibold transition ${className}`}
          >
            {children}
          </button>
    );
}