interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  positive?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  icon,
  positive = true,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#E6EDF6] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#001229]">
            {value}
          </h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6EDF6] text-xl">
          {icon}
        </div>
      </div>
      <p className={`text-sm font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}>
        {change} <span className="font-normal text-slate-400">vs bulan lalu</span>
      </p>
    </div>
  );
}
