import HomeScreen from "@/components/home/home";
import Sidebar from "@/components/home/sidebar";

export default function DashboardHome() {
  return (
    <div className="flex  bg-slate-100">
      <Sidebar />

      <HomeScreen />
    </div>
  );
}
