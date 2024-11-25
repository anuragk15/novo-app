import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgeInfo, RefreshCcw } from "lucide-react";
import { useParams } from "react-router-dom";
import AddSource from "./ui/addSource";
import { SourcesTable } from "./ui/sourcesTable";
import { Spinner } from "../ui/spinner";

export default function SourcesScreen({ data, refetch, isRefetching }) {
  const { projectId } = useParams();

  return (
    <div className=" flex-col w-full md:min-w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mt-2 mr-2 p-8 min-h-[98vh] bg-white">
        <div className="flex justify-between w-full items-center">
          <div className=" flex items-center gap-2">
            <h2 className="text-2xl">Training Documents</h2>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeInfo size={16} />
                </TooltipTrigger>
                <TooltipContent className="md:max-w-[60vw]">
                  <p className="text-slate-500">
                    By uploading your unique documents, you provide Novo with
                    the specific context it needs to deliver smarter, more
                    personalized suggestions, fine-tuned to your individual
                    needs. You can add website or YouTube links, and even upload
                    files!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCcw
              size={16}
              onClick={() => !isRefetching && refetch()}
              className="cursor-pointer"
            />
            <AddSource projectId={projectId} />
          </div>
        </div>
        {isRefetching ? (
          <div className="flex h-[90vh] w-full flex-col  justify-center items-center ">
            <Spinner />
          </div>
        ) : data?.length > 0 ? (
          <SourcesTable sources={data} />
        ) : (
          <div className="flex h-[90vh] w-full flex-col  justify-center items-center ">
            <img
              src={"/EmptyState.svg"}
              style={{
                width: "15rem",
                height: "15rem",
              }}
            />
            <p className=" text-center font-sans text-2xl">
              No documents found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
