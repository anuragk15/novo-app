/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  promptsCopilotRepurposeIdeas,
  promptsRepurposeContent,
} from "@/api/functions/prompts";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tiptap/core";
import { Sparkles, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BorderTrail } from "../../border-trail";
import { useToast } from "../../use-toast";

export default function ConvertDocumentPanel({
  documents,
}: {
  documents: string[];
}) {
  const { toast } = useToast();
  const { projectId, id } = useParams();
  const [altTitles, setTitles] = useState<string[]>(
    documents || ["User personas", "Blogs", "Documentation", "Launch campaign"]
  );
  const [isRepurposing, setIsRepurposing] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["update", "document", id],
    mutationFn: async () => {
      const res = await promptsCopilotRepurposeIdeas({
        projectId,
        documentId: id,
      });

      setTitles(res?.content);
      return res?.content;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get", "document", id],
      });
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
            <Wand2 size={18} className="text-slate-700" />
            <span className=" font-mono">
              Repurpose your content with AI. <br /> Turn your document into a
              blog, user docs, social media post, and more.
            </span>
          </button>
        </div>
      ) : (
        <div className=" flex flex-col gap-2">
          <p className="text-slate-600 text-sm">
            Click any of the ideas & Novo will repurpose the content for you.
          </p>
          <div className="flex flex-wrap gap-3">
            {altTitles.map((item, i) => {
              return (
                <div
                  onClick={async () => {
                    if (isRepurposing != null) {
                      return;
                    }
                    toast({
                      title: "Thinking....",
                      description: `Repurposing content into ${item}. A new tab will open shortly.`,
                    });
                    setIsRepurposing(item);
                    await promptsRepurposeContent({
                      projectId,
                      documentId: id,
                      repurpose: item,
                    }).then((res) => {
                      setIsRepurposing(null);
                      if (res?.id) {
                        window.open(
                          `/document/editor/${projectId}/${res.id}`,
                          "_blank"
                        );
                      } else {
                        toast({
                          title: "Error",
                          description:
                            "An error occurred while repurposing content. Check usage limits.",
                          variant: "destructive",
                        });
                      }
                    });
                  }}
                  className={cn(
                    "flex relative max-w-fit cursor-pointer hover:shadow-lg  gap-1 items-center border shadow-md rounded-lg p-2",
                    isRepurposing != null && "opacity-50 cursor-default"
                  )}
                >
                  {item == isRepurposing && (
                    <BorderTrail
                      className={cn(
                        "bg-gradient-to-l  from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
                        "opacity-100"
                      )}
                      size={40}
                      transition={{
                        ease: [0, 0.5, 0.8, 0.5],
                        duration: 4,
                        repeat: 20,
                      }}
                    />
                  )}
                  <span className={cn("px-2 rounded-lg")}>{item}</span>
                </div>
              );
            })}
          </div>
          <button
            disabled={isPending}
            onClick={async () => {
              await mutateAsync();
            }}
            className="flex px-1 relative justify-center  w-full  mx-auto py-2 mt-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
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
            <span className=" font-mono">Regenerate ideas</span>
          </button>
        </div>
      )}
    </div>
  );
}
