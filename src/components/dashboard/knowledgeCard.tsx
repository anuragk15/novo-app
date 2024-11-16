import { getSources } from "@/api/functions/sources";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Library, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { BorderTrail } from "../ui/border-trail";

import { SourcesTable } from "../home/ui/sourcesTable";
import Loader from "../ui/loader";
import AddSource from "../home/ui/addSource";

export default function UsageCard() {
  const { projectId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["get", "sources"],
    queryFn: async () => {
      const res = await getSources({ projectId });
      return res?.data;
    },
  });
  return (
    <div className="  flex flex-col relative gap-4 items-start border  h-full w-full rounded-lg p-4 bg-white">
      <BorderTrail
        className={cn(
          "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
          isLoading && "opacity-100"
        )}
        size={200}
        transition={{
          ease: [0, 0.5, 0.8, 0.5],
          duration: 4,
          repeat: 20,
        }}
      />
      <div className="flex w-full items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 rounded-full p-2 ">
            <Library size={24} className="text-blue-500" />
          </div>
          <p className="text-xl font-sans font-medium">Knowledge Hub</p>
        </div>
        <div>
          <AddSource projectId={projectId}>
            <div className="bg-slate-200 rounded-full p-2 hover:bg-slate-300 group cursor-pointer border border-slate-200">
              <Plus
                size={16}
                className=" text-slate-500 group-hover:text-slate-600"
              />
            </div>
          </AddSource>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-2 justify-center items-center w-full h-full italic">
          <Loader />
          Fetching training materials...
        </div>
      ) : (
        <div className="w-full">
          {data && (
            <SourcesTable
              pageSize={6}
              sources={data}
              showSearch={false}
              showHeaders={true}
              showSelection={false}
              showPagination={false}
            />
          )}
        </div>
      )}
    </div>
  );
}
