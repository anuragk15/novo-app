import { getProjectById } from "@/api/functions/projects";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  FileBox,
  Gauge,
  Home,
  LayoutTemplate,
  Library,
  Settings,
  Users2
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";

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
  //console.log(data);
  return (
    <div className="flex flex-col w-[15vw] h-screen">
      <div className=" h-[100vh] flex flex-col justify-between bg-white ">
        <div>
          <div className="pt-1 pl-3  border-b" >
            {isLoading ? (
              <div className="p-4">Loading...</div>
            ) : (
              <div>
                <div
                  onClick={() => navigate("/")}
                  className="flex max-w-fit  px-2 items-center hover:bg-slate-100 py-2 cursor-pointer rounded-lg"
                >
                  <ChevronLeft size={16} />
                  <p className="text-sm">Back</p>
                </div>
                <h1 className="text-xl   pb-3 font-bold font-sans">
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
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 ":
                      pathname.split("/").at(-1) === projectId,
                  }
                )}
              >
                <Home size={16} />
                Home
              </Link>
              <Link
                to={"/project/" + projectId + "/files"}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === 'files',
                  }
                )}
              >
                <FileBox size={16} />
                Files
              </Link>
              <Link
                to={`/project/${projectId}/knowledge-base`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "knowledge-base",
                  }
                )}
              >
                <Library size={16} />
                Knowledge Hub
              </Link>
              <Link
                to={`/project/${projectId}/templates`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
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
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-normal rounded-md",
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
