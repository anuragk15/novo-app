import { getDocuments } from "@/api/functions/documents";
import HomeScreen from "@/components/home/home";
import Sidebar from "@/components/home/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function DashboardHome() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "documents"],
    queryFn: async () => {
      const res = await getDocuments({ projectId });
      return res?.data;
    },
  });

  return (
    <div className="flex  bg-slate-100">
      <Sidebar projectId={projectId} />

      {isLoading ? (
        <div className="flex flex-col w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <HomeScreen data={data} />
      )}
    </div>
  );
}
