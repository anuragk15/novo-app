/* eslint-disable @typescript-eslint/no-explicit-any */
import { BubbleMenu, Editor, EditorContent } from "@tiptap/react";
import "./Editor.css";

import { ActionButtons } from "./EditorElements/ActionButtons";

import { useParams } from "react-router-dom";
import { MenuBar } from "./EditorElements/BubbleMenu";

export default function EditorFn({ editor }: { editor: Editor }) {
  const { projectId } = useParams();
  return (
    <div className=" ">
      <EditorContent
        onSelectCapture={() => alert("seled")}
        className="rounded-lg bg-white border min-h-[90vh] md:min-w-[800px] max-w-[960px]  mx-auto "
        editor={editor}
      />

      <BubbleMenu
        shouldShow={({ state, from, to }) => {
          const { doc, selection } = state;

          const isEmpty =
            selection.empty || doc.textBetween(from, to).length === 0;
          if (isEmpty) return false;

          return true;
        }}
        tippyOptions={{
          onShown: () => {},
          onClickOutside: () => {
            // //console.log("clicked outside");
          },
          onHide: () => {
            // //console.log("hidden");
          },
        }}
        className=" p-2 gap-2 flex  relative flex-col"
        editor={editor}
      >
        <MenuBar editor={editor} projectId={projectId} />
      </BubbleMenu>
    
      <ActionButtons editor={editor} projectId={projectId} />
    </div>
  );
}
