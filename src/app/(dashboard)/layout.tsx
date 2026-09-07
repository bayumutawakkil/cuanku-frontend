import DashboardLayout from "../../components/layout/DashboardLayout";

export default function DashboardRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}