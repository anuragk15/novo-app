import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.tsx";
declare module "@tiptap/core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    writeNext: {
      /**
       * Toggle a paragraph
       * @example editor.commands.toggleParagraph()
       */
      writeNextWithAI: (attributes: {
        topic: string;
        content: string;
        projectId: string;
      }) => void;
    };
  }
}
export const AiWriteNext = Node.create({
  name: "writeNext",

  group: "block",

  atom: true,
  isolating: true,
  addAttributes() {
    return {
      projectId: {
        default: "",
      },
      topic: {
        default: "",
      },
      content: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "write-next-suggestion",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["insert-next-suggestion", mergeAttributes(HTMLAttributes)];
  },
  addCommands() {
    return {
      writeNextWithAI:
        (attributes) =>
        ({ editor }: { editor: Editor }) => {
          editor
            .chain()
            .focus()
            .deleteSelection()
            .insertContent({ type: "writeNext", attrs: attributes }) // Specify the node type here
            .run();
          return;
          //return commands.toggleNode(this.name, "acceptSuggestion", attributes);
        },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
