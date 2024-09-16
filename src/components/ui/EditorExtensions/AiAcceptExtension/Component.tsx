/* eslint-disable @typescript-eslint/no-unused-vars */
import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "../../button";
import { WandSparkles } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Spinner } from "../../spinner";

export default function Component(props) {
  function acceptSuggestion(accepted: boolean) {
    if (accepted) {
      // this replaces the current node with the new text
      props.editor.commands.insertContentAt(
        props.getPos(),
        props.node.attrs.newText
      );
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
          <p className="bg-red-50 px-2 text-black rounded-lg border border-red-200">
            <MarkdownPreview
              source={props.node.attrs.previousText}
              style={{ padding: 16, background: "transparent", color: "black" }}
            />
          </p>
        )}
        {props.node.attrs.newText && props.node.attrs?.newText == "Loading" ? (
          <p className="bg-green-50 px-2 text-center text-black rounded-lg border border-green-200">
            <Spinner size="small" />
          </p>
        ) : (
          <p className="bg-green-50 px-2 text-black rounded-lg border border-green-200">
            <MarkdownPreview
              source={props.node.attrs.newText}
              style={{ padding: 16, background: "transparent", color: "black" }}
            />
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
