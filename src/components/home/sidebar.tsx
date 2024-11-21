import { getProjectById } from "@/api/functions/projects";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  FileBox,
  Flame,
  Home,
  LayoutTemplate,
  Library,
  Users2
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ projectId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const { pathname } = location;
  const { data, isLoading } = useQuery({
    queryKey: ["get", "project", projectId],
    queryFn: async () => {
      const res = await getProjectById({ projectId });
      return res?.data;
    },
    staleTime: Infinity,
  });
  //console.log(data);

  const LinkWithTooltip = ({ to, icon, label, className }) => {
    const content = (
      <Link to={to} className={className}>
        {icon}
        {!isCollapsed && label}
      </Link>
    );

    return isCollapsed ? (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="bg-white border shadow-sm">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      content
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r transition-all duration-300",
        isCollapsed ? "w-[4rem]" : "w-[15vw]"
      )}
    >
      <div className="h-[100vh] flex flex-col justify-between bg-white">
        <div>
          <div className="pt-1 pl-3 border-b relative">
            {isLoading ? (
              <div className="p-4">...</div>
            ) : (
              <div>
                <div
                  onClick={() => navigate("/")}
                  className="flex max-w-fit  items-center  py-2 cursor-pointer rounded-lg"
                >
                  <ChevronLeft size={16} />
                  {!isCollapsed && <p className="text-sm">Back</p>}
                </div>
                {!isCollapsed && (
                  <h1 className="text-xl pb-3 font-bold font-sans">
                    {data?.project?.name?.substring(0, 20)}
                  </h1>
                )}
              </div>
            )}
            <button
              onClick={() => toggleCollapse()}
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-1 hover:bg-slate-50"
            >
              {isCollapsed ? (
                <ChevronRight size={14} />
              ) : (
                <ChevronLeft size={14} />
              )}
            </button>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2 p-2">
              <LinkWithTooltip
                to={"/project/" + projectId}
                icon={<Home size={16} />}
                label="Home"
                className={cn(
                  "hover:bg-slate-100 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200/60": pathname.split("/").at(-1) === projectId,
                    "justify-center": isCollapsed,
                  }
                )}
              />
              <LinkWithTooltip
                to={"/project/" + projectId + "/files"}
                icon={<FileBox size={16} />}
                label="Files"
                className={cn(
                  "hover:bg-slate-100 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200/60 font-normal":
                      pathname.split("/").at(-1) === "files",
                    "justify-center": isCollapsed,
                  }
                )}
              />
              <LinkWithTooltip
                to={"/project/" + projectId + "/ideas"}
                icon={<Flame size={16} />}
                label="Inspiration"
                className={cn(
                  "hover:bg-slate-100 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200/60 font-normal":
                      pathname.split("/").at(-1) === "ideas",
                    "justify-center": isCollapsed,
                  }
                )}
              />
              <LinkWithTooltip
                to={`/project/${projectId}/knowledge-base`}
                icon={<Library size={16} />}
                label="Knowledge Hub"
                className={cn(
                  "hover:bg-slate-100 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200/60 font-normal":
                      pathname.split("/").at(-1) === "knowledge-base",
                    "justify-center": isCollapsed,
                  }
                )}
              />
              <LinkWithTooltip
                to={`/project/${projectId}/templates`}
                icon={<LayoutTemplate size={16} />}
                label="Templates"
                className={cn(
                  "hover:bg-slate-100 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200/60 font-normal":
                      pathname.split("/").at(-1) === "templates",
                    "justify-center": isCollapsed,
                  }
                )}
              />
              <LinkWithTooltip
                to={`/project/${projectId}/team`}
                icon={<Users2 size={16} />}
                label="Team"
                className={cn(
                  "hover:bg-slate-100 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200/60 font-normal":
                      pathname.split("/").at(-1) === "team",
                    "justify-center": isCollapsed,
                  }
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
