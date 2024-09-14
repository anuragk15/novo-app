import { getProjectById } from "@/api/functions/projects";
import SettingsOverview from "@/components/settings/settings";
import SettingsSidebar from "@/components/settings/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SettingsOverviewScreen() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "project", projectId],
    queryFn: async () => {
      const res = await getProjectById({ projectId });
      return res?.data;
    },
    staleTime: Infinity,
  });
  return (
    <div className="flex  bg-slate-100">
      <SettingsSidebar projectId={projectId} />
      {isLoading ? (
        <div className="flex flex-col w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <SettingsOverview data={data} />
      )}
    </div>
  );
}
