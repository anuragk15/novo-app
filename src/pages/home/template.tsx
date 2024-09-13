import Sidebar from "@/components/home/sidebar";
import TemplatesScreen from "@/components/home/templates";
import { useParams } from "react-router-dom";

export default function TemplatesHome() {
  const { projectId } = useParams(); // Extract the projectId from the URL

  return (
    <div className="flex  bg-slate-100">
      <Sidebar projectId={projectId} />

      <TemplatesScreen />
    </div>
  );
}