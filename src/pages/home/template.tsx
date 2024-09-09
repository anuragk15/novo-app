import Sidebar from "@/components/home/sidebar";
import TemplatesScreen from "@/components/home/templates";

export default function TemplatesHome() {
  return (
    <div className="flex  bg-slate-100">
      <Sidebar />

      <TemplatesScreen />
    </div>
  );
}