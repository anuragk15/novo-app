/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgeInfo } from "lucide-react";
import { useParams } from "react-router-dom";
import AddSource from "./ui/addSource";
import SourceSearch from "./ui/sourceSearch";
import { SourcesTable } from "./ui/sourcesTable";

export default function SourcesScreen({ data }) {
  const { projectId } = useParams();

  return (
    <div className=" flex-col w-full md:w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <SourceSearch />

      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[91vh] bg-white">
        <div className="flex justify-between w-full items-center">
          <div className=" flex items-center gap-2">
            <h2 className="text-2xl">Sources</h2>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeInfo size={16} />
                </TooltipTrigger>
                <TooltipContent className="md:max-w-[60vw]">
                  <p className="text-slate-500">
                    By uploading your unique sources, you provide the AI with
                    the specific context it needs to deliver smarter, more
                    personalized suggestions, fine-tuned to your individual
                    needs. You can add website or Youtube links, and even upload
                    files!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <AddSource projectId={projectId} />
        </div>
        {data?.length > 0 ? (
          <SourcesTable sources={data} />
        ) : (
          <div className="flex h-[70vh] w-full flex-col  justify-center items-center ">
            <img
              src={"/EmptyState.svg"}
              style={{
                width: "15rem",
                height: "15rem",
              }}
            />
            <p className=" text-center font-sans text-2xl">No sources found</p>
          </div>
        )}
      </div>
    </div>
  );
}
