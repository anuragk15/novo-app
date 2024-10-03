import { getProjectById } from "@/api/functions/projects";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import {
  Bot,
  ChevronLeft,
  Home,
  LayoutTemplate,
  Menu,
  Settings,
  Users2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function MobileSideBar({ projectId }) {
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
    <div className="  md:hidden w-full">
      <div className="  flex  w-full ">
        <div className="w-full">
          <div className="pt-1 px-4 w-full ">
            {isLoading ? (
              <div className="p-4">Loading...</div>
            ) : (
              <div className="flex-1  flex justify-between w-full">
                <div>
                  <div
                    onClick={() => navigate("/")}
                    className="flex items-center hover:bg-slate-100 py-2 cursor-pointer rounded-lg"
                  >
                    <ChevronLeft size={16} />
                    <p className="text-sm">Back</p>
                  </div>
                  <h1 className="text-xl   ml-1 border-b  pb-3 font-bold font-sans">
                    {data?.project?.name?.substring(0, 20)}
                  </h1>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Menu />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border mr-2 rounded-lg">
                    <DropdownMenuLabel>
                      <Link
                        to={"/project/" + projectId}
                        className={cn(
                          " flex items-center gap-2 p-2 font-sans font-light rounded-md",
                          {
                            "bg-slate-200 font-normal":
                              pathname.split("/").at(-1) === projectId,
                          }
                        )}
                      >
                        <Home size={16} />
                        Home
                      </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {" "}
                      <Link
                        to={`/project/${projectId}/sources`}
                        className={cn(
                          " flex items-center gap-2 p-2 font-sans font-light rounded-md",
                          {
                            "bg-slate-200 font-normal":
                              pathname.split("/").at(-1) === "sources",
                          }
                        )}
                      >
                        <Bot size={16} />
                        Sources
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <Link
                        to={`/project/${projectId}/templates`}
                        className={cn(
                          " flex items-center gap-2 p-2 font-sans font-light rounded-md",
                          {
                            "bg-slate-200 font-normal":
                              pathname.split("/").at(-1) === "templates",
                          }
                        )}
                      >
                        <LayoutTemplate size={16} />
                        Templates
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <Link
                        to={`/project/${projectId}/team`}
                        className={cn(
                          " flex items-center gap-2 p-2 font-sans font-light rounded-md",
                          {
                            "bg-slate-200 font-normal":
                              pathname.split("/").at(-1) === "team",
                          }
                        )}
                      >
                        <Users2 size={16} />
                        Team
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <Link
                        to={`/project/${projectId}/settings`}
                        className={cn(
                          " flex items-center gap-2 p-2 font-sans font-light rounded-md",
                          {
                            "bg-slate-200 font-normal":
                              pathname.split("/").at(-1) === "settings",
                          }
                        )}
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
