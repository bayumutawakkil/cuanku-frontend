"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ToastContextType = {
  showError: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000); // Sembunyikan setelah 5 detik
  };

  useEffect(() => {
    const handleGlobalError = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string }>;
      showError(customEvent.detail.message);
    };

    window.addEventListener("cuanku-error", handleGlobalError);
    return () => {
      window.removeEventListener("cuanku-error", handleGlobalError);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5">
          <div className="flex items-center gap-3 rounded-lg bg-red-50 px-5 py-4 text-red-700 shadow-[0_8px_30px_rgba(220,38,38,0.2)] border border-red-200 backdrop-blur-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
              !
            </span>
            <p className="text-sm font-medium">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="ml-4 rounded text-red-400 hover:text-red-700 hover:bg-red-100 p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
