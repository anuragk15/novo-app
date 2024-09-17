import { getProjectBilling } from "@/api/functions/projects";
import SettingsBilling from "@/components/settings/billing";
import SettingsSidebar from "@/components/settings/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SettingsBillingScreen() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "billing", "project", projectId],
    queryFn: async () => {
      const res = await getProjectBilling({ projectId });
      return res?.data;
    },
    staleTime: Infinity,
  });
  console.log(data);
  return (
    <div className="flex  bg-slate-100">
      <SettingsSidebar projectId={projectId} />
      {isLoading ? (
        <div className="flex flex-col w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <SettingsBilling data={data} />
      )}
    </div>
  );
}
