import { axiosClient } from "@/lib/axios";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import RecentFileItem from "../ui/recentFileItem";
import SearchBar from "./search";
import { FilesTable } from "./ui/filesTable";

export default function HomeScreen() {
  return (
    <div className=" flex-col w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <SearchBar />
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[91vh] bg-white">
        <div className="flex w-full items-center  justify-between">
          <p className="text-2xl font-sans font-extralight ">Recent</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <RecentFileItem />
          <RecentFileItem />
          <RecentFileItem />
        </div>
        <div className="flex w-full items-center  justify-between ">
          <p className="text-2xl font-sans font-extralight  ">All files</p>
          <Button
            onClick={async () => {
              const res = await axiosClient.get(
                "http://localhost:3000/sources",
                {
                  params: {
                    projectId: "2423",
                  },
                }
              );
              console.log(res);
            }}
            className="flex gap-1 items-center"
            variant="outline"
          >
            <Sparkles size={14} /> Create
          </Button>
        </div>
        <FilesTable />
      </div>
    </div>
  );
}
