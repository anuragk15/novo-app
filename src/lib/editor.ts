/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import UnderlineExt from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { nanoid } from "nanoid";
import { Markdown } from "tiptap-markdown";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import Placeholder from "@tiptap/extension-placeholder";

import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
// import { useState } from "react";
import { AiAcceptExtension } from "@/components/ui/EditorExtensions/AiAcceptExtension/Extension";
import { AiInsertSuggestion } from "@/components/ui/EditorExtensions/AiInsertExtension/Extension";
import { AiWriteNext } from "@/components/ui/EditorExtensions/AiWriteNext/Extension";
import { ColorHighlighter } from "@/components/ui/EditorExtensions/ColorHighlighter";
import { SmilieReplacer } from "@/components/ui/EditorExtensions/SmilieReplacer";
import ImageResizer from "tiptap-extension-resize-image";

export const myExtensions = [
  StarterKit,
  UnderlineExt,
  SmilieReplacer,
  ColorHighlighter,
  Paragraph,
  AiAcceptExtension,
  ImageResizer,
  AiWriteNext,
  Document.extend({
    content: "heading block*",
  }),
  Placeholder.configure({
    placeholder: ({ pos, node }) => {
      if (pos == 0 && node.type.name === "heading") {
        return "What’s the title?";
      } else if (node.type.name === "paragraph") {
        return "Write here or type two backslash to prompt Novo...";
      }
    },
  }),
  AiInsertSuggestion,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  Highlight.configure({ multicolor: true }),
  Heading.configure({
    levels: [1, 2, 3], // Enable headings of level 1, 2, and 3
  }).extend({
    renderHTML({ node, HTMLAttributes }) {
      // Custom HTML rendering to add the floating 'h1' text
      const level = node.attrs.level;
      const id = nanoid();

      const classes = `heading-level heading-level-${level} id-${id}`;

      return [
        `h${level}`,
        {
          ...HTMLAttributes,
          id,
          class: (HTMLAttributes.class || "") + ` ${classes}`,
        },
        0,
      ];
    },
  }),
  Color.configure({ types: [TextStyle.name] }),
  TextStyle,
  Markdown.configure({
    html: true,
    transformCopiedText: true, // Allow to copy markdown text from the editor
    transformPastedText: true, // Allow to paste markdown text in the editor
  }),
];
