import { getProjectById } from "@/api/functions/projects";
import DashboardHomeContents from "@/components/dashboard/home";
import MobileSideBar from "@/components/home/mobileSidebar";
import Sidebar from "@/components/home/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DashboardHome() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["get", "project", projectId],
    queryFn: () => getProjectById({ projectId }),
  });
  const [skipOnboarding, setSkipOnboarding] = useState(false);

  useEffect(() => {
    if (data) {
      if (!data?.onboardedOn) {
        navigate(`/project/${projectId}/onboarding`);
      } else {
        setSkipOnboarding(true);
      }
    }
  }, [data, navigate, projectId]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size='large' />
      </div>
    );
  }
  if (skipOnboarding) {
    return (
      <div className="flex  bg-slate-100 w-full">
        <div className="hidden md:block">
          <Sidebar projectId={projectId} />
        </div>

        <div className="w-full md:min-w-[85vw]">
          <MobileSideBar projectId={projectId} />
          <DashboardHomeContents projectId={projectId} />
        </div>
      </div>
    );
  }
}
