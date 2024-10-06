/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClipboardCopy, Copy, Sparkles } from "lucide-react";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { useToast } from "../../use-toast";
import { useState } from "react";

export default function AlternativeTitlesSidePanel() {
  const { toast } = useToast();
  const [value, setValue] = useState<string | null>(null);
  const text = "Write with Novo and get the best title for your content";
  return (
    <div className="w-full">
      <div>
        <button className="flex px-1  w-full   flex-col  mx-auto py-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200">
          <Sparkles size={18} className="text-slate-700" />
          <span className=" font-mono">
            Generate titles using Novo in 1-click
          </span>
        </button>
      </div>
      <div className="my-5 flex flex-col gap-2">
        {Array.from({ length: 5 }, (item, i) => {
          return (
            <div key={i} className="flex gap-2 relative group">
              <p className=" text-slate-500">#{i + 1}</p>
              <p
                onInput={(e) => setValue(e.currentTarget.textContent)}
                className="p-2 font-sans pr-3 border bg-slate-50 group-hover:bg-white border-slate-300 rounded-md "
                contentEditable={true}
              >
                {text}
              </p>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(value || text);
                  setValue(null);
                  toast({
                    title: "✨ Copied to clipboard!",
                    description: "You’ve copied the title!",
                  });
                }}
                className="hidden absolute right-0 hover:bg-slate-200 p-2 rounded-lg cursor-pointer group-hover:flex"
              >
                <Copy size={18} className=" text-slate-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
