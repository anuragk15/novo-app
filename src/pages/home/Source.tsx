import Sidebar from "@/components/home/sidebar";
import SourcesScreen from "@/components/home/sources";
import { useParams } from "react-router-dom";

export default function SourceHome() {
  const { projectId } = useParams(); // Extract the projectId from the URL

  return (
    <div className="flex  bg-slate-100">
      <Sidebar projectId={projectId} />

      <SourcesScreen />
    </div>
  );
}