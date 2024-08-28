import {
  FloatingMenu,
  BubbleMenu,
  useEditor,
  EditorContent,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Editor.css";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  StrikethroughIcon,
  Underline,
  Undo,
  Wand,
} from "lucide-react";
import UnderlineExt from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { FloatingButtons } from "./EditorElements/FloatingButtons";
// define your extension array
const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }
  const getSelectedText = () => {
    if (!editor) {
      return "";
    }

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");
    console.log(selectedText);
    // Insert the text "Hello" at the selected position
    editor
      .chain()
      .focus() // Ensure the editor is focused
      .insertContent("Hello", {
        updateSelection: true,
      })
      .run();

    return selectedText;
  };
  return (
    <div className="control-group">
      <ToggleGroup type="multiple" className="button-group">
        <ToggleGroupItem
          value="wand"
          onClick={getSelectedText}
          className="border bg-white"
          data-state={"off"}
          aria-label="Toggle bold"
        >
          <Wand className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bold"
          className="border bg-white"
          data-state={editor.isActive("bold") ? "on" : "off"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="border bg-white"
          data-state={editor.isActive("italic") ? "on" : "off"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          value="italic"
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="border bg-white"
          data-state={editor.isActive("underline") ? "on" : "off"}
          value="underline"
          aria-label="Toggle underline"
        >
          <Underline
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="h-4 w-4"
          />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="border bg-white"
          value="strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          data-state={editor.isActive("strike") ? "on" : "off"}
        >
          <StrikethroughIcon size={18} />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="border bg-white"
          value="code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          data-state={editor.isActive("code") ? "on" : "off"}
        >
          <Code size={18} />
        </ToggleGroupItem>
        {/* <ToggleGroupItem
          value="bold"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bold"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </ToggleGroupItem> */}
        <ToggleGroupItem
          value="bulletList"
          className="border bg-white"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-state={editor.isActive("bulletList") ? "on" : "off"}
        >
          <List size={18} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="orderedList"
          className="border bg-white"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-state={editor.isActive("orderedList") ? "on" : "off"}
        >
          <ListOrdered size={18} />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="blockQuote"
          className="border bg-white"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-state={editor.isActive("blockquote") ? "on" : "off"}
        >
          <Quote size={18} />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="undo"
          className="border bg-white"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          data-state={"off"}
        >
          <Undo size={18} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="redo"
          className="border bg-white"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          data-state={"off"}
        >
          <Redo size={18} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default function EditorFn() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExt,
      Color.configure({ types: [TextStyle.name] }),
      TextStyle.configure(),
    ],
    content: `
          <p>
            This is an example of a Medium-like editor. Enter a new line and some ToggleGroupItems will appear.
          </p>
          <p></p>
        `,
  });

  return (
    <div className=" ">
      <EditorContent editor={editor} />
      <FloatingMenu className="flex gap-2" editor={editor}>
        <FloatingButtons editor={editor} />
      </FloatingMenu>
      <BubbleMenu className=" p-2 gap-2 flex" editor={editor}>
        <MenuBar editor={editor} />
        <ToggleGroup className="bg-white" type="multiple"></ToggleGroup>
      </BubbleMenu>
    </div>
  );
}
