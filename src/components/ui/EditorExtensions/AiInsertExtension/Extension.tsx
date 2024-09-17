import { Editor, mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.tsx";
declare module "@tiptap/core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Commands<ReturnType> {
    insertSuggestion: {
      /**
       * Toggle a paragraph
       * @example editor.commands.toggleParagraph()
       */
      insertAISuggestion: (attributes: {
        previousContent: string;
        nextContent: string;
        prompt: string;
        projectId: string;
      }) => void;
    };
  }
}
export const AiAcceptExtension = Node.create({
  name: "insertSuggestion",

  group: "block",

  atom: true,
  isolating: true,
  addAttributes() {
    return {
      projectId: {
        default: "",
      },
      prompt: {
        default: "",
      },
      previousContent: {
        default: "",
      },
      nextContent: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "insert-suggestion",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["insert-suggestion", mergeAttributes(HTMLAttributes)];
  },
  addCommands() {
    return {
      insertAISuggestion:
        (attributes) =>
        ({ editor }: { editor: Editor }) => {
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
