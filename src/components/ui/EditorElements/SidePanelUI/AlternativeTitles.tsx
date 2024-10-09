/* eslint-disable @typescript-eslint/no-unused-vars */
import { promptsCopilotAlternativeTitles } from "@/api/functions/prompts";
import { cn } from "@/lib/utils";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { Copy, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BorderTrail } from "../../border-trail";
import { useToast } from "../../use-toast";

export default function AlternativeTitlesSidePanel({
  titles,
}: {
  titles: string[];
}) {
  const { projectId, id } = useParams();
  const { toast } = useToast();
  const [value, setValue] = useState<string | null>(null);
  const [altTitles, setTitles] = useState<string[]>(titles || []);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["update", "document", id],
    mutationFn: async () => {
      const res = await promptsCopilotAlternativeTitles({
        projectId,
        documentId: id,
      });
      //console.log(res);
      setTitles(res?.content);
      return res?.content;
    },
  });

  useEffect(() => {
    if (isError) {
      console.error(isError);
      toast({
        title: "Error",
        description: "An error occurred while fetching the data",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  return (
    <div className="w-full">
      {altTitles?.length == 0 ? (
        <div className="relative">
          <BorderTrail
            className={cn(
              "bg-gradient-to-l  from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
              isPending && "opacity-100"
            )}
            size={100}
            transition={{
              ease: [0, 0.5, 0.8, 0.5],
              duration: 4,
              repeat: 20,
            }}
          />
          <button
            disabled={isPending}
            onClick={async () => await mutateAsync()}
            className="flex px-1  w-full   flex-col  mx-auto py-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
          >
            <Sparkles size={18} className="text-slate-700" />
            <span className=" font-mono">
              Generate titles using Novo in 1-click
            </span>
          </button>
        </div>
      ) : (
        <div className="my-5 flex flex-col gap-2">
          {altTitles.map((item, i) => {
            return (
              <div key={i} className="flex gap-2 relative group">
                <p className=" text-slate-500">#{i + 1}</p>
                <p
                  onInput={(e) => setValue(e.currentTarget.textContent)}
                  className="p-2 font-sans pr-3 border bg-slate-50 group-hover:bg-white border-slate-300 rounded-md "
                  contentEditable={true}
                >
                  {item}
                </p>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(value || item);
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
          <button
            onClick={async () => {
              await mutateAsync().then(() => {
                queryClient.invalidateQueries({
                  queryKey: ["get", "document", id],
                });
              });
            }}
            disabled={isPending}
            className="flex relative px-1 justify-center  w-full  mx-auto py-2 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
          >
            <BorderTrail
              className={cn(
                "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
                isPending && "opacity-100"
              )}
              size={70}
              transition={{
                ease: [0, 0.5, 0.8, 0.5],
                duration: 4,
                repeat: 20,
              }}
            />
            <Sparkles size={18} className="text-slate-700" />
            <span className=" font-mono">Regenerate</span>
          </button>
        </div>
      )}
    </div>
  );
}
