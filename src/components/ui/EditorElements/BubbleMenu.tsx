import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import {
  Annoyed,
  ArrowLeft,
  ArrowUp,
  AudioLines,
  Bold,
  BriefcaseBusiness,
  CaseSensitive,
  ChartNoAxesGantt,
  ChevronRight,
  Code,
  Expand,
  Handshake,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Laugh,
  List,
  ListOrdered,
  Microscope,
  Quote,
  Redo,
  Scissors,
  Sparkles,
  SpellCheck,
  StrikethroughIcon,
  Underline,
  Undo,
  Wand,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Input } from "../input";

import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Editor } from "@tiptap/core";

// define your extension array
export const MenuBar = ({ editor }: { editor: Editor }) => {
  const [showAi, setShowAi] = useState(false);
  const [showTones, setShowTones] = useState(false);

  useEffect(() => {
    setShowAi(false);
    return () => {
      setShowAi(false);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  //   const getSelectedText = () => {
  //     if (!editor) {
  //       return "";
  //     }

  //     const { from, to } = editor.state.selection;
  //     const selectedText = editor.state.doc.textBetween(from, to, " ");
  //     console.log(selectedText);
  //     // Insert the text "Hello" at the selected position
  //     editor
  //       .chain()
  //       .focus() // Ensure the editor is focused
  //       .insertContent("Hello", {
  //         updateSelection: true,
  //       })
  //       .run();

  //     return selectedText;
  //   };
  return (
    <div className="flex flex-col gap-2">
      {!showAi ? (
        <div className="flex px-2 border shadow-lg items-center rounded-lg justify-center bg-white  ">
          <Sparkles size={18} className="text-slate-800" />
          <Input
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                const { from, to } = editor.state.selection;
                const selectedText = editor.state.doc.textBetween(
                  from,
                  to,
                  " "
                );
                editor.commands.setAISuggestion({
                  previousText: selectedText,
                  newText: "This is a summary",
                });
              }
            }}
            multiple
            placeholder="Highlight the pros & focus on the main points"
            className=" shadow-none border-none  bg-transparent focus-visible:ring-none focus-visible:ring-offset-0 focus-visible:ring-transparent text-black "
          />
          <div className="bg-slate-900 cursor-pointer opacity-40 rounded-full p-1">
            <ArrowUp size={18} color="white" />
          </div>
        </div>
      ) : null}
      <div className="control-group border bg-white shadow-xl border-slate-200 rounded-lg">
        <ToggleGroup type="multiple" className="button-group">
          <Popover>
            <PopoverTrigger
              onClick={() => {
                setShowAi((prev) => !prev);
                // getSelectedText()
              }}
              asChild
            >
              <ToggleGroupItem
                value="wand"
                data-state={"off"}
                aria-label="Toggle bold"
              >
                <Wand className="h-4 w-4" color="black" />
              </ToggleGroupItem>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-white rounded-xl border mt-2 p-2 mx-2">
              {showTones ? (
                <div className="flex flex-col gap-1">
                  <div className="space-x-2 border-b items-center flex ">
                    <div
                      className="p-2 cursor-pointer"
                      onClick={() => {
                        setShowTones(false);
                      }}
                    >
                      <ArrowLeft className=" text-slate-500" size={16} />
                    </div>
                    <p className="text-xs text-muted-foreground ">
                      CHANGE TONE
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <MenuItem onClick={() => {}}>
                      <ChartNoAxesGantt size={14} />
                      <p>Engaging</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Handshake size={14} />
                      <p>Friendly</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <BriefcaseBusiness size={14} />
                      <p>Professional</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Annoyed size={14} />
                      <p>Sarcastic</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Microscope size={14} />
                      <p>Mystical</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Laugh size={14} />
                      <p>Funnny</p>
                    </MenuItem>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground border-b pb-2">
                      EDIT SELECTION
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <MenuItem onClick={() => {}}>
                      <SpellCheck size={14} />
                      <p>Fix grammar & spelling</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <CaseSensitive size={14} />
                      <p>Simplify text</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Scissors size={14} />
                      <p>Summarise</p>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Expand size={14} />
                      <p>Expand</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setShowTones(true);
                      }}
                    >
                      <AudioLines size={14} />
                      <p className="flex items-center justify-between w-full">
                        Change tone
                        <ChevronRight size={14} className=" text-slate-500" />
                      </p>
                    </MenuItem>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger
              onClick={() => {
                setShowAi((prev) => !prev);
                // getSelectedText()
              }}
              asChild
            >
              <ToggleGroupItem
                value="wand"
                data-state={"off"}
                aria-label="Toggle bold"
              >
                <Heading className="h-4 w-4" color="black" />
              </ToggleGroupItem>
            </PopoverTrigger>
            <PopoverContent className="w-15 bg-white rounded-xl border mt-2 p-2 mx-2">
              <div className="flex flex-col  items-center gap-2">
                <MenuItem
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                  }}
                >
                  <Heading1 size={16} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                  }}
                >
                  <Heading2 size={16} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                  }}
                >
                  <Heading3 size={16} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                  }}
                >
                  P
                </MenuItem>
              </div>
            </PopoverContent>
          </Popover>

          <ToggleGroupItem
            value="bold"
            data-state={editor.isActive("bold") ? "on" : "off"}
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Toggle bold"
          >
            <Bold className="h-4 w-4" color="black" />
          </ToggleGroupItem>
          <ToggleGroupItem
            data-state={editor.isActive("italic") ? "on" : "off"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            value="italic"
            aria-label="Toggle italic"
          >
            <Italic className="h-4 w-4" color="black" />
          </ToggleGroupItem>
          <ToggleGroupItem
            data-state={editor.isActive("underline") ? "on" : "off"}
            value="underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            aria-label="Toggle underline"
          >
            <Underline className="h-4 w-4" color="black" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            data-state={editor.isActive("strike") ? "on" : "off"}
          >
            <StrikethroughIcon size={18} color="black" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            data-state={editor.isActive("code") ? "on" : "off"}
          >
            <Code size={18} color="black" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="highligher"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
            data-state={editor.isActive("code") ? "on" : "off"}
          >
            <Highlighter size={18} color="black" />
          </ToggleGroupItem>
          <div className="h-5 border w-[1px] bg-slate-50 z-40"></div>
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
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-state={editor.isActive("bulletList") ? "on" : "off"}
          >
            <List size={18} color="black" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="orderedList"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-state={editor.isActive("orderedList") ? "on" : "off"}
          >
            <ListOrdered size={18} color="black" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="blockQuote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            data-state={editor.isActive("blockquote") ? "on" : "off"}
          >
            <Quote size={18} color="black" />
          </ToggleGroupItem>
          <div className="h-5 border w-[1px] bg-slate-50 z-40"></div>
          <ToggleGroupItem
            value="undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            data-state={"off"}
          >
            <Undo size={18} color="black" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            data-state={"off"}
          >
            <Redo size={18} color="black" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

function MenuItem({ children, onClick }) {
  return (
    <Label
      onClick={onClick}
      className=" text-sm flex gap-2 items-center cursor-pointer hover:bg-slate-100 p-2 rounded-md"
    >
      {children}
    </Label>
  );
}
