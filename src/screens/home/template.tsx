import { getTemplates } from "@/api/functions/templates";
import MobileSideBar from "@/components/home/mobileSidebar";
import Sidebar from "@/components/home/sidebar";
import TemplatesScreen from "@/components/home/templates";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function TemplatesHome() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "templates"],
    queryFn: async () => {
      const res = await getTemplates({ projectId });
      return res?.data;
    },
  });

  return (
    <div className="flex  bg-slate-100">
      <div className="hidden md:block">
        <Sidebar projectId={projectId} />
      </div>
      {isLoading ? (
        <div className="flex flex-col w-full md:min-w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <div className="w-full md:min-w-[85vw]">
          <MobileSideBar projectId={projectId} />
          <TemplatesScreen data={data} />
        </div>
      )}
    </div>
  );
}
