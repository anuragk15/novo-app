import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.tsx";
declare module "@tiptap/core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    acceptSuggestion: {
      /**
       * Toggle a paragraph
       * @example editor.commands.toggleParagraph()
       */
      setAISuggestion: (attributes: {
        previousText: string;
        newText: string;
      }) => void;
    };
  }
}
export const AiAcceptExtension = Node.create({
  name: "acceptSuggestion",

  group: "block",
  addOptions() {
    return {
      previousText: {},
    };
  },
  atom: true,
  isolating: true,
  addAttributes() {
    return {
      previousText: {
        default: "Old text",
      },
      newText: {
        default: "New text",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "accept-suggestion",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["accept-suggestion", mergeAttributes(HTMLAttributes)];
  },
  addCommands() {
    return {
      setAISuggestion:
        (attributes) =>
        ({ editor }: { editor: Editor }) => {
          editor.chain().focus().deleteCurrentNode().run();
          editor
            .chain()
            .focus()
            .deleteSelection()
            .insertContent({ type: "acceptSuggestion", attrs: attributes }) // Specify the node type here
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
