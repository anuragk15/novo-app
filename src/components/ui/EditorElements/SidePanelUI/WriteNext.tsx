/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  promptCopilotNextTopics
} from "@/api/functions/prompts";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tiptap/core";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BorderTrail } from "../../border-trail";
import { useToast } from "../../use-toast";

export default function WriteNext({
  editor,
  topics,
}: {
  editor: Editor;
  topics: string[];
}) {
  const { toast } = useToast();
  const { projectId, id } = useParams();
  const [value, setValue] = useState<string | null>(null);
  const [altTitles, setTitles] = useState<string[]>(topics || []);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["update", "document", id],
    mutationFn: async () => {
      const res = await promptCopilotNextTopics({
        projectId,
        documentId: id,
      });

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
  const text = "How Novo can help you write better content";
  return (
    <div className="w-full">
      {altTitles?.length == 0 ? (
        <div>
          <button
            onClick={async () => await mutateAsync()}
            className="flex px-1 relative  w-full   flex-col  mx-auto py-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
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
            <span className=" font-mono">
              Having a writer's block? Let Novo suggest the next topics!
            </span>
          </button>
        </div>
      ) : (
        <div className="my-5 flex flex-col gap-2">
          <p className="text-slate-600 text-sm">
            Click any of the topics & Novo will write it for you
          </p>

          {altTitles.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  // scroll to bottom
                  window.scrollTo(0, document?.body?.scrollHeight);

                  editor.chain().writeNextWithAI({
                    topic: item,
                    content: editor.getText().substring(0, 20000),
                    projectId: projectId,
                  });
                }}
                className="flex gap-2 flex-col  cursor-pointer  group "
              >
                <div className="flex gap-2">
                  <p className=" text-slate-500">#{i + 1}</p>
                  <div className="p-2 w-full font-sans pr-3  border bg-slate-50 relative group-hover:bg-white border-slate-300 rounded-md ">
                    {item}
                  </div>
                </div>
              </div>
            );
          })}
          <button
            disabled={isPending}
            onClick={async () => {
              await mutateAsync().then(() => {
                queryClient.invalidateQueries({
                  queryKey: ["get", "document", id],
                });
              });
            }}
            className="flex px-1 relative justify-center  w-full  mx-auto py-2 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
          >
            <BorderTrail
              className={cn(
                "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
                isPending && "opacity-100"
              )}
              size={30}
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
