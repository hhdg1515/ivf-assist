import { BottomNavigation } from "@/components/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pb-16">
      {children}
      <BottomNavigation />
    </div>
  );
}
