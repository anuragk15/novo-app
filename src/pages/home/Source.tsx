import Sidebar from "@/components/home/sidebar";
import SourcesScreen from "@/components/home/sources";

export default function SourceHome() {
  return (
    <div className="flex  bg-slate-100">
      <Sidebar />

      <SourcesScreen />
    </div>
  );
}