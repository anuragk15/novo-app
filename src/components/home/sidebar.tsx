import { getProjectById } from "@/api/functions/projects";
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
  Settings,
  Users2,
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
                  className="flex max-w-fit px-2 items-center hover:bg-slate-100 py-2 cursor-pointer rounded-lg"
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
              <Link
                to={"/project/" + projectId}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200": pathname.split("/").at(-1) === projectId,
                    "justify-center": isCollapsed,
                  }
                )}
              >
                <Home size={16} />
                {!isCollapsed && "Home"}
              </Link>
              <Link
                to={"/project/" + projectId + "/files"}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "files",
                    "justify-center": isCollapsed,
                  }
                )}
              >
                <FileBox size={16} />
                {!isCollapsed && "Files"}
              </Link>
              <Link
                to={"/project/" + projectId + "/ideas"}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "ideas",
                    "justify-center": isCollapsed,
                  }
                )}
              >
                <Flame size={16} />
                {!isCollapsed && "Inspiration"}
              </Link>
              <Link
                to={`/project/${projectId}/knowledge-base`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "knowledge-base",
                    "justify-center": isCollapsed,
                  }
                )}
              >
                <Library size={16} />
                {!isCollapsed && "Knowledge Hub"}
              </Link>
              <Link
                to={`/project/${projectId}/templates`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "templates",
                    "justify-center": isCollapsed,
                  }
                )}
              >
                <LayoutTemplate size={16} />
                {!isCollapsed && "Templates"}
              </Link>
              <Link
                to={`/project/${projectId}/team`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "team",
                    "justify-center": isCollapsed,
                  }
                )}
              >
                <Users2 size={16} />
                {!isCollapsed && "Team"}
              </Link>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex pb-4 px-2",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <Gauge className="text-slate-600 cursor-pointer hover:text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="bg-white ml-5 p-5 border rounded-xl shadow-sm">
                <p>
                  AI Usage: {data?.usage?.apiCalls}/{data?.usage?.maxApiCalls}
                </p>
                <p>
                  Documents Created: {data?.usage?.documentsCreated}/
                  {data?.usage?.maxDocuments}
                </p>
                <p>
                  Collaborators: {data?.usage?.invitesCreated}/
                  {data?.usage?.maxInvites}
                </p>
                <p>
                  Sources: {data?.usage?.sourcesCreated}/
                  {data?.usage?.maxSources}
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Settings
            onClick={() => {
              navigate(`/project/${projectId}/settings`);
            }}
            className="text-slate-600 hover:text-black transition-transform cursor-pointer hover:rotate-180 hover:text-black"
          />
        </div>
      </div>
    </div>
  );
}
