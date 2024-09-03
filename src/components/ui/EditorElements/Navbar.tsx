import { ChevronLeftIcon, CloudDownload, Share2 } from "lucide-react";
import { Button } from "../button";

export default function DocNavbar() {
  return (
    <div className=" flex justify-between items-center py-2 w-full max-w-[1280px] mx-auto">
      <ChevronLeftIcon />

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className=" font-mono  border hover:bg-slate-200 flex gap-2 items-center"
        >
          <Share2 size={14} />
          Share
        </Button>
        <Button className=" font-mono flex gap-2 items-center">
          <CloudDownload size={14} />
          Export
        </Button>
      </div>
    </div>
  );
}
