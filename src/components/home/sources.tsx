import { BadgeInfo, Info } from "lucide-react";
import { Button } from "../ui/button";
import SourceSearch from "./ui/sourceSearch";
import { SourcesTable } from "./ui/sourcesTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SourcesScreen() {
  return (
    <div className=" flex-col w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <SourceSearch />
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[91vh] bg-white">
        <div className="flex justify-between w-full items-center">
          <div className=" flex items-center gap-2">
            <h2 className="text-2xl">Sources</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeInfo  size={16}/>
                </TooltipTrigger>
                <TooltipContent className="md:max-w-[60vw]">
                  <p className="text-slate-500">
                    By uploading your unique sources, you provide the AI with
                    the specific context it needs to deliver smarter, more
                    personalized suggestions, fine-tuned to your individual
                    needs. You can add website or Youtube links, and even upload files!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button className="font-mono">Add source</Button>
        </div>

        <SourcesTable />
      </div>
    </div>
  );
}
