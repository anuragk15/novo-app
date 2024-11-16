import DashboardHomeContents from "@/components/dashboard/home";
import MobileSideBar from "@/components/home/mobileSidebar";
import Sidebar from "@/components/home/sidebar";
import { useParams } from "react-router-dom";

export default function DashboardHome() {
  const { projectId } = useParams(); // Extract the projectId from the URL

  //console.log(data);

  return (
    <div className="flex  bg-slate-100 w-full">
      <div className="hidden md:block">
        <Sidebar projectId={projectId} />
      </div>

      <div className="w-full md:min-w-[85vw]">
        <MobileSideBar projectId={projectId} />
        <DashboardHomeContents  projectId={projectId} />
      </div>
    </div>
  );
}
