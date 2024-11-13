import { getSources } from "@/api/functions/sources";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Library } from "lucide-react";
import { useParams } from "react-router-dom";
import { BorderTrail } from "../ui/border-trail";

import { SourcesTable } from "../home/ui/sourcesTable";

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
      <div className="flex w-full items-center gap-2 justify-start">
        <div className="bg-blue-100 rounded-full p-2 ">
          <Library size={24} className="text-blue-500" />
        </div>
        <p className="text-xl font-sans font-medium">Knowledge Hub</p>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full italic">
          Fetching training materials...
        </div>
      ) : (
        <div className="w-full">
          {data && (
            <SourcesTable
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
