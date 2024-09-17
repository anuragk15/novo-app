/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "../../button";
import { Check, WandSparkles, X } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Spinner } from "../../spinner";
import { useEffect, useState } from "react";
import { runPrompts } from "@/api/functions/prompts";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useToast } from "../../use-toast";

export default function Component(props) {
  const [newText, setNewText] = useState(props.node.attrs.newText || "");
  const { projectId } = useParams();
  const { toast } = useToast();
  const { mutateAsync, isError, error } = useMutation({
    mutationFn: async () => {
      if (!projectId) return;
      if (!props.node.attrs.previousText) {
        return {
          content: "No content to generate from",
        };
      }
      const result = await runPrompts({
        type: props.node.attrs.type,
        projectId: projectId,
        tone: props.node.attrs.tone,
        content: props.node.attrs.previousText,
        customUserPrompt: props.node.attrs.prompt,
      });
      return result;
    },
  });
  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error",
        // @ts-ignore
        description: error?.response?.data?.message || "An error occurred",
      });
      //  console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    // console.log("Component mounted");
    // console.log(newText);
    if (newText == "") generateNewText();
  }, []);

  async function generateNewText() {
    // console.log(props.node.attrs);
    // console.log("Generating new text");
    const result = await mutateAsync();
    // const result = {
    //   content:"new text"
    // }
    props.updateAttributes({
      newText: result?.content,
    });
    setNewText(result?.content);
  }

  function acceptSuggestion(accepted: boolean) {
    // console.log(props.getPos());
    if (accepted) {
      // this replaces the current node with the new text
      props.editor.commands.insertContentAt(props.getPos(), newText);
      //props.editor.commands.insertContent(newText);
    } else {
      // this replaces the current node with the new text
      props.editor.commands.insertContentAt(
        props.getPos(),
        props.node.attrs.previousText
      );
    }
    props.deleteNode();
  }

  return (
    <NodeViewWrapper className="">
      <div className="content space-y-2">
        {props.node.attrs.previousText && (
          <div className="bg-red-50 px-2 text-black rounded-lg border border-red-200">
            <MarkdownPreview
              source={props.node.attrs.previousText}
              style={{ padding: 16, background: "transparent", color: "black" }}
            />
          </div>
        )}
        {newText == "" ? (
          <div className="bg-green-50 px-2 text-center py-5 text-black rounded-lg border border-green-200">
            <Spinner size="small" />
          </div>
        ) : (
          <div className="bg-green-50 px-2 text-black rounded-lg border border-green-200">
            <MarkdownPreview
              source={newText}
              style={{ padding: 16, background: "transparent", color: "black" }}
            />
          </div>
        )}
        <div className="flex w-full gap-2  justify-end">
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
      </div>
    </NodeViewWrapper>
  );
}
