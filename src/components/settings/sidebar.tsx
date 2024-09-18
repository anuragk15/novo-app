import { cn } from "@/lib/utils";
import { ChevronLeft, LayoutList, Wallet } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SettingsSidebar({ projectId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  return (
    <div className="flex flex-col w-[15vw] h-screen">
      <div className=" h-[100vh] flex flex-col justify-between ">
        <div>
          <div className="p-4">
            <div>
              <div
                onClick={() => navigate("/")}
                className="flex items-center hover:bg-slate-200 py-2 cursor-pointer rounded-lg px-1"
              >
                <ChevronLeft size={16} />
                <p className="text-sm">Back</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2 p-2">
              <Link
                to={"/project/" + projectId + "/settings"}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "settings",
                  }
                )}
              >
                <LayoutList size={16} />
                Overview
              </Link>
              <Link
                to={`/project/${projectId}/settings/billing`}
                className={cn(
                  "hover:bg-slate-200 flex items-center gap-2 p-2 font-sans font-light rounded-md",
                  {
                    "bg-slate-200 font-normal":
                      pathname.split("/").at(-1) === "billing",
                  }
                )}
              >
                <Wallet size={16} />
                Billing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
