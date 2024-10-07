/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sparkles } from "lucide-react";
import { useToast } from "../../use-toast";
import { Editor } from "@tiptap/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  promptCopilotNextTopics,
  promptsCopilotAlternativeTitles,
} from "@/api/functions/prompts";
import { Spinner } from "../../spinner";

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
      {isPending ? (
        <Spinner />
      ) : altTitles?.length == 0 ? (
        <div>
          <button
            onClick={async () => await mutateAsync()}
            className="flex px-1  w-full   flex-col  mx-auto py-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
          >
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
            onClick={async () => {
              await mutateAsync().then(() => {
                queryClient.invalidateQueries({
                  queryKey: ["get", "document", id],
                });
              });
            }}
            className="flex px-1 justify-center  w-full  mx-auto py-2 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
          >
            <Sparkles size={18} className="text-slate-700" />
            <span className=" font-mono">Regenerate</span>
          </button>
        </div>
      )}
    </div>
  );
}
