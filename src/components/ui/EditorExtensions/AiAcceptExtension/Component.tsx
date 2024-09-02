/* eslint-disable @typescript-eslint/no-unused-vars */
import { NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { Button } from "../../button";
import { WandSparkles } from "lucide-react";
export default function Component(props) {
  function acceptSuggestion(accepted: boolean) {
    if (accepted) {
      // this replaces the current node with the new text
      props.editor.commands.insertContent(props.node.attrs.newText);
    } else {
      // this replaces the current node with the new text
      props.editor.commands.insertContent(props.node.attrs.previousText);
    }
  }

  return (
    <NodeViewWrapper className="">
      <div className="content space-y-2">
        {props.node.attrs.previousText && (
          <p className="bg-red-100 px-2 rounded-lg border border-red-200">
            {props.node.attrs.previousText}
          </p>
        )}

        {props.node.attrs.newText && (
          <p className="bg-green-100 px-2 rounded-lg border border-green-200">
            {props.node.attrs.newText}
          </p>
        )}

        <div className="flex w-full  justify-end">
          <Button variant="ghost" onClick={() => acceptSuggestion(false)}>
            Reject
          </Button>
          <Button className="flex gap-2" onClick={() => acceptSuggestion(true)}>
            <WandSparkles size={14} />
            <p>Accept</p>
          </Button>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
