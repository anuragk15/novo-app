import { cn } from "@/lib/utils";
import { Home, LayoutTemplate, ScrollText, Users2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex flex-col w-[15vw] h-screen bg-slate-100">
      <div>
        <div className="p-4">
          <h1 className="text-xl border-b  pb-3 font-bold font-sans">
            Project 1
          </h1>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <Link
            to="/project/2/home"
            className={cn(
              "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
              {
                "bg-slate-200 font-normal":
                  pathname.split("/").at(-1) === "home",
              }
            )}
          >
            <Home size={16} />
            Home
          </Link>
          <Link
            to="/project/2/sources"
            className={cn(
              "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
              {
                "bg-slate-200 font-normal":
                  pathname.split("/").at(-1) === "sources",
              }
            )}
          >
            <ScrollText size={16} />
            Sources
          </Link>
          <Link
            to="/project/2/templates"
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
            to="/project/2/team"
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
  );
}
