/* eslint-disable @typescript-eslint/no-unused-vars */
import { runPrompts } from "@/api/functions/prompts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NodeViewWrapper } from "@tiptap/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Check, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../spinner";
import { useToast } from "../../use-toast";

export default function Component(props) {
  const [newText, setNewText] = useState(
    props.node.attrs.insertedContent || ""
  );

  const { projectId } = useParams();
  const { data, isError, refetch, isRefetching, error, isLoading } = useQuery({
    queryKey: ["get", "document", props.node.attrs.topic, projectId],
    queryFn: async () => {
      if (!projectId) return;

      const result = await runPrompts({
        type: "write-next",
        projectId: projectId,
        content: props.node.attrs.content,
        customUserPrompt: props.node.attrs.topic,
      });
      setNewText(result?.content);
      return result;
    },
    retry: 0,
    retryDelay: 1000,
  });
  useEffect(() => {
    if (isError && error) {
      console.error(error);
      props?.deleteNode();
    }
  }, [isError, error, props]);

  function acceptSuggestion(accepted: boolean) {
    // //console.log(props.getPos());
    if (accepted) {
      // this replaces the current node with the new text
      props.editor.commands.insertContentAt(props.getPos(), newText);
      props.deleteNode();
      //props.editor.commands.insertContent(newText);
    } else {
      // this replaces the current node with the new text
      // props.editor.commands.insertContentAt(
      //   props.getPos(),
      //   props.node.attrs.previousText
      // );
      props.deleteNode();
    }
  }

  return (
    <NodeViewWrapper className="">
      {isLoading || isRefetching ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="content space-y-2">
          {data ? (
            <div className="bg-green-50 px-2 text-black rounded-lg border border-green-200">
              <MarkdownPreview
                source={data?.content}
                style={{
                  padding: 16,
                  background: "transparent",
                  color: "black",
                }}
              />
            </div>
          ) : null}
          {!isLoading && !isRefetching ? (
            <div className="flex w-full gap-2  justify-end">
              <div
                onClick={() => refetch()}
                className="flex p-2 items-center  hover:cursor-pointer rounded-xl"
              >
                <RefreshCcw size={16} className="text-black" />
              </div>
              <div
                onClick={() => acceptSuggestion(false)}
                className="flex p-2 items-center bg-red-400 hover:bg-red-600 hover:cursor-pointer rounded-xl"
              >
                <X size={16} className="text-white" />
              </div>
              <div
                onClick={() => acceptSuggestion(true)}
                className=" flex items-center p-2 bg-green-400 hover:bg-green-600 hover:cursor-pointer rounded-xl"
              >
                <Check size={16} className="text-white" />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </NodeViewWrapper>
  );
}
