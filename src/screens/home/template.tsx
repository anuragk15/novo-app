import { getBookmarks } from "@/api/functions/templates";
import Sidebar from "@/components/home/sidebar";
import TemplatesScreen from "@/components/home/templates";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function TemplatesHome() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "bookmarked", "templates"],
    queryFn: async () => {
      const res = await getBookmarks({ projectId });
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
        <TemplatesScreen data={data} />
      )}
    </div>
  );
}
