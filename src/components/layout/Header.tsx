import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[70px]
        items-center
        justify-between
        bg-[#f8f8f8]
        px-5
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
        md:px-8
      "
    >
      <h1 className="text-2xl font-bold text-[#243248]">
        Profile
      </h1>

      <div className="flex items-center gap-5">
        {/* Notification */}

        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#edf2f8]
            text-[#40536d]
          "
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-400" />
        </button>

        {/* User */}

        <button className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-slate-300" />

          <span className="hidden text-sm font-medium text-[#40536d] md:block">
            Rendi Wahyudi
          </span>

          <ChevronDown size={16} className="text-[#40536d]" />
        </button>
      </div>
    </header>
  );
}