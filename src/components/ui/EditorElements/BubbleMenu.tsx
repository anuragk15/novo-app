import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Highlighter,
  Italic,
  Laugh,
  Link,
  Link2,
  Microscope,
  Scissors,
  Sparkles,
  SpellCheck,
  Underline,
  Wand,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { useEffect, useState } from "react";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Editor } from "@tiptap/core";
import { PromptType } from "@/api/functions/prompts";

// define your extension array
export const MenuBar = ({
  editor,
  projectId,
}: {
  editor: Editor;
  projectId: string;
}) => {
  const [showAi, setShowAi] = useState(false);
  const [showTones, setShowTones] = useState(false);
  const [link, setLink] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [showLink, setShowLink] = useState(false);
  useEffect(() => {
    setShowAi(false);
    return () => {
      setShowAi(false);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  async function runCustomPrompt({
    type,
    prompt,
    tone,
  }: {
    type: PromptType;
    prompt?: string;
    tone?: string;
  }) {
    const { from, to } = editor.state.selection;

    const { state, dispatch } = editor.view;

    //const selectedText = state.doc.textBetween(from, to, " ");
    const paragraphNode = state.doc.nodeAt(from);

    if (paragraphNode) {
      // Find the start and end of the paragraph
      const paragraphStart = state.selection.$anchor.start();
      const paragraphEnd = state.selection.$anchor.end();
      //  console.log(paragraphStart, paragraphEnd);

      // Use a transaction to delete the paragraph

      const selectedText = state.doc.textBetween(from, to, " ");

      const content =
        selectedText?.length > paragraphNode.text?.length
          ? selectedText
          : paragraphNode.text;
      editor.chain().focus().setAISuggestion({
        projectId: projectId,
        prompt: prompt,
        type: type,
        tone: tone,
        previousText: content,
      });
      setCustomPrompt("");
      if (selectedText?.length > paragraphNode.text?.length) {
        // Delete the selected text
      } else {
        dispatch(state.tr.delete(paragraphStart - 1, paragraphEnd + 1));
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 ">
      {!showAi ? (
        <div className="flex px-2  border shadow-lg items-center rounded-lg justify-center bg-white ">
          <Sparkles size={18} className="text-slate-800" />
          <Input
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                runCustomPrompt({
                  type: "custom-prompt",
                  prompt: customPrompt,
                });
              }
            }}
            multiple
            placeholder="Mention tap to pay feature here..."
            className=" shadow-none border-none   bg-transparent focus-visible:ring-none focus-visible:ring-offset-0 focus-visible:ring-transparent text-black "
          />
          <div
            onClick={() => {
              if (customPrompt != "") {
                runCustomPrompt({
                  type: "custom-prompt",
                  prompt: customPrompt,
                });
              }
            }}
            className="bg-slate-900 cursor-pointer opacity-40 rounded-full p-1"
          >
            <ArrowUp size={18} color="white" />
          </div>
        </div>
      ) : null}
      <div className="control-group border bg-white shadow-xl border-slate-200 rounded-lg flex flex-wrap  ">
        <ToggleGroup type="multiple" className="button-group flex flex-wrap">
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
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "change-tone",
                          tone: "engaging",
                        });
                      }}
                    >
                      <ChartNoAxesGantt size={14} />
                      <p>Engaging</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "change-tone",
                          tone: "friendly",
                        });
                      }}
                    >
                      <Handshake size={14} />
                      <p>Friendly</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "change-tone",
                          tone: "professional",
                        });
                      }}
                    >
                      <BriefcaseBusiness size={14} />
                      <p>Professional</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "change-tone",
                          tone: "sarcastic",
                        });
                      }}
                    >
                      <Annoyed size={14} />
                      <p>Sarcastic</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "change-tone",
                          tone: "mystical",
                        });
                      }}
                    >
                      <Microscope size={14} />
                      <p>Mystical</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "change-tone",
                          tone: "funny",
                        });
                      }}
                    >
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
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "fix-grammar",
                        });
                      }}
                    >
                      <SpellCheck size={14} />
                      <p>Fix grammar & spelling</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "simplify",
                        });
                      }}
                    >
                      <CaseSensitive size={14} />
                      <p>Simplify text</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "summarise",
                        });
                      }}
                    >
                      <Scissors size={14} />
                      <p>Summarise</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        runCustomPrompt({
                          type: "expand",
                        });
                      }}
                    >
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

          <Dialog
            onOpenChange={(e) => {
              if (e == false) {
                if (link === null) {
                  return;
                }

                // empty
                if (link === "") {
                  editor
                    .chain()
                    .focus()

                    .unsetLink()
                    .run();
                } else {
                  editor
                    .chain()
                    .focus()

                    .setLink({ href: link })
                    .run();
                }
              }
              setShowLink(e);
            }}
            open={showLink}
          >
            <DialogTrigger asChild>
              <ToggleGroupItem
                data-state={editor.isActive("link") ? "on" : "off"}
                value="underline"
                onClick={() => {
                  const previousUrl = editor.getAttributes("link").href;
                  setLink(previousUrl || "");
                  setShowLink(true);
                }}
                aria-label="Toggle underline"
              >
                <Link className="h-4 w-4" color="black" />
              </ToggleGroupItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add link</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 items-center border px-2 rounded-xl">
                <Link2 />
                <Input
                  id="link"
                  className={cn(
                    "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
                  )}
                  type="url"
                  onKeyDown={(e) => {
                    if (e.code == "Enter") {
                      if (link === null) {
                        return;
                      }

                      // empty
                      if (link === "") {
                        editor.chain().focus().unsetLink().run();
                      } else {
                        editor.chain().focus().setLink({ href: link }).run();
                      }
                      setShowLink(false);
                    }
                  }}
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  placeholder="https://google.com/search?...."
                />
              </div>
            </DialogContent>
          </Dialog>
          <ToggleGroupItem
            value="code"
            onClick={() => editor.chain().focus().toggleCode().run()}
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
