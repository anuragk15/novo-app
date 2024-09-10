import { ChevronLeftIcon, CloudDownload, Share2 } from "lucide-react";
import { Button } from "../button";
import { SettingsPopup } from "./Settings";
import { Editor } from "@tiptap/core";

export default function DocNavbar({ editor }: { editor: Editor }) {
  return (
    <div className=" flex justify-between items-center py-2 w-full max-w-[1280px] mx-auto">
      <ChevronLeftIcon />

      <div className="flex items-center gap-2">
          <SettingsPopup />
      
        <div className="  p-3  cursor-pointer rounded-lg  hover:bg-slate-100 flex gap-2 items-center">
          <Share2 size={16} />
        </div>

        <Button className=" font-mono flex gap-2 items-center">
          <CloudDownload size={14} />
          Export
        </Button>
      </div>
    </div>
  );
}
