import { getDocuments } from "@/api/functions/documents";
import HomeScreen from "@/components/home/files";
import MobileSideBar from "@/components/home/mobileSidebar";
import Sidebar from "@/components/home/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function FilesScreen() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "documents"],
    queryFn: async () => {
      const res = await getDocuments({ projectId });
      return res?.data;
    },
  });
  //console.log(data);

  return (
    <div className="flex  bg-slate-100 w-full">
      <div className="hidden md:block">
        <Sidebar projectId={projectId} />
      </div>

      {isLoading ? (
        <div className="flex flex-col  w-full md:min-w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <div className="w-full md:min-w-[85vw]">
          <MobileSideBar projectId={projectId} />
          <HomeScreen data={data} projectId={projectId} />
        </div>
      )}
    </div>
  );
}
