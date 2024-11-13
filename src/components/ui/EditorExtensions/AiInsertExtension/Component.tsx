/* eslint-disable @typescript-eslint/no-unused-vars */
import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "../../button";
import {
  ArrowUp,
  Check,
  RefreshCcw,
  Sparkle,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Spinner } from "../../spinner";
import { useEffect, useRef, useState } from "react";
import { runPrompts } from "@/api/functions/prompts";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Input } from "../../input";
import { cn } from "@/lib/utils";
import { useToast } from "../../use-toast";
import { useClickOutside } from "@/hooks/useClickOutside";
import { BorderTrail } from "../../border-trail";

export default function Component(props) {
  const [newText, setNewText] = useState(
    props.node.attrs.insertedContent || ""
  );
  const [showInput, setShowInput] = useState(
    props.node.attrs.insertedContent == ""
  );
  const containerRef = useRef();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState(props.node.attrs.prompt || "");
  const { projectId } = useParams();
  const { mutateAsync, isError, error, isPending } = useMutation({
    mutationFn: async () => {
      if (!projectId) return;

      const result = await runPrompts({
        type: "insert-content",
        projectId: projectId,
        textAfter: props.node.attrs.nextContent,
        textBefore: props.node.attrs.previousContent,
        customUserPrompt: prompt,
      });
      return result;
    },
  });
  useEffect(() => {
    if (isError && error) {
      //console.log(error);
    }
  }, [isError, error]);

  async function generateNewText() {
    // //console.log(props.node.attrs);
    // //console.log("Generating new text");
    const result = await mutateAsync();
    // const result = {
    //   content:"new text"
    // }
    props.updateAttributes({
      insertedContent: result?.content,
      prompt: prompt,
    });

    setShowInput(false);
    setNewText(result?.content);
  }

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
  useClickOutside(containerRef, () => {
    if (showInput && newText != "") return;
    if (isPending || !showInput) return;
    props.deleteNode();
    return;
  });
  return (
    <NodeViewWrapper className="">
      <div className="content space-y-2" ref={containerRef}>
        {showInput ? (
          <div className=" flex relative gap-2 items-center p-1 px-4 border rounded-xl">
            <BorderTrail
              className={cn(
                "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-white-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
                isPending && "opacity-100"
              )}
              size={80}
              transition={{
                ease: [0, 0.5, 0.8, 0.5],
                duration: 4,
                repeat: 20,
              }}
            />
            <Sparkles size={18} />
            <Input
              disabled={isPending}
              autoFocus={true}
              onKeyDown={(e) => {
                if (e.code === "Escape") {
                  props.deleteNode();
                  return;
                }
                if (e.code == "Backspace" && prompt == "") {
                  props.deleteNode();
                  return;
                }

                if (e.code === "Enter") {
                  if (prompt != "") {
                    generateNewText();
                  } else {
                    toast({
                      title: "✨ Please enter a prompt",
                      description:
                        "You need to enter a prompt to generate text",
                    });
                  }
                }
              }}
              placeholder="Ask Novo to write for you..."
              value={prompt}
              className={cn(
                "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
              )}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <div
              onClick={() => {
                if (prompt != "") {
                  generateNewText();
                } else {
                  toast({
                    title: "✨ Please enter a prompt",
                    description: "You need to enter a prompt to generate text",
                  });
                }
              }}
              className="bg-slate-900 cursor-pointer opacity-40 hover:opacity-100 rounded-full p-1"
            >
              <ArrowUp size={18} color="white" />
            </div>
          </div>
        ) : newText != "" ? (
          <div className="bg-green-50 px-2 text-black rounded-lg border border-green-200">
            <MarkdownPreview
              source={newText}
              style={{
                padding: 16,
                background: "transparent",
                color: "black",
              }}
            />
          </div>
        ) : null}
        {!showInput ? (
          <div className="flex w-full gap-2  justify-end">
            <div
              onClick={() => setShowInput(true)}
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
    </NodeViewWrapper>
  );
}
