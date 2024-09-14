import { getProjectById } from "@/api/functions/projects";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Bot,
  ChevronLeft,
  Gauge,
  Home,
  LayoutTemplate,
  Settings,
  Users2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

export default function Sidebar({ projectId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { data, isLoading } = useQuery({
    queryKey: ["get", "project", projectId],
    queryFn: async () => {
      const res = await getProjectById({ projectId });
      return res?.data;
    },
    staleTime: Infinity,
  });
  console.log(data);
  return (
    <div className="flex flex-col w-[15vw] h-screen">
      <div className=" h-[100vh] flex flex-col justify-between ">
        <div>
          <div className="pt-1">
            {isLoading ? (
              <div className="p-4">Loading...</div>
            ) : (
              <div>
                <div
                  onClick={() => navigate("/")}
                  className="flex items-center hover:bg-slate-100 py-2 cursor-pointer rounded-lg px-1"
                >
                  <ChevronLeft size={16} />
                  <p className="text-sm">Back</p>
                </div>
                <h1 className="text-xl   ml-1 border-b  pb-3 font-bold font-sans">
                  {data?.project?.name?.substring(0, 20)}
                </h1>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2 p-2">
              <Link
                to={"/project/" + projectId}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === projectId,
                  }
                )}
              >
                <Home size={16} />
                Home
              </Link>
              <Link
                to={`/project/${projectId}/sources`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "sources",
                  }
                )}
              >
                <Bot size={16} />
                Sources
              </Link>
              <Link
                to={`/project/${projectId}/templates`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "templates",
                  }
                )}
              >
                <LayoutTemplate size={16} />
                Templates
              </Link>
              <Link
                to={`/project/${projectId}/team`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "team",
                  }
                )}
              >
                <Users2 size={16} />
                Team
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between pb-4 px-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Gauge className="text-slate-600 cursor-pointer hover:text-black " />
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
          </DropdownMenu>
          <Settings
            onClick={() => {
              navigate(`/project/${projectId}/settings`);
            }}
            className="text-slate-600 cursor-pointer hover:text-black "
          />
        </div>
      </div>
    </div>
  );
}
