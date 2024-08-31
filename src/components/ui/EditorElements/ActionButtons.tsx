import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/core";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import {
  List,
  ListOrdered,
  Quote,
  Redo,
  Ruler,
  Sparkles,
  Undo,
  Wand,
  X,
} from "lucide-react";
import { Textarea } from "../textarea";
import { Label } from "../label";
import { Separator } from "../separator";

export function ActionButtons({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showAi, setShowAi] = useState(false);

  function Item({ action, label }: { action: () => void; label: string }) {
    return (
      <div
        onClick={() => {
          setIsOpen(false);
          setTimeout(() => {
            action();
          }, 400);
        }}
        className="w-full cursor-pointer rounded-sm hover:bg-gray-100 p-2"
      >
        {label}
      </div>
    );
  }

  if (showAi) {
    return (
      <div className="  sticky pb-2 pt-2 mx-auto  bottom-0 max-w-fit items-center justify-center">
        <div className="flex items-center rounded-lg mb-2 justify-center border-slate-900 border  bg-slate-800 ">
          <Button
            onClick={() => setShowAi(false)}
            className="bg-slate-800  text-white hover:text-slate-200 border-none border-r-1 border-r-white"
          >
            <X size={18} color="white" />
          </Button>

          <Button className="bg-slate-800  items-center gap-2 flex text-white hover:text-slate-200 border-none border-r-1 border-r-white">
            <Sparkles size={14} /> <p>Generate</p>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="  sticky pb-2 pt-2 mx-auto  bottom-0 max-w-fit items-center justify-center">
      <div className="flex rounded-lg mb-2 justify-center border-slate-900 border  bg-slate-800 ">
        <Button
          onClick={() => setShowAi(true)}
          className="bg-slate-800  text-white hover:text-slate-200 border-none border-r-1 border-r-white"
        >
          <Wand size={18} color="white" />
        </Button>
        <Popover
          open={isOpen1}
          onOpenChange={(e) => {
            setIsOpen1(e);
          }}
        >
          <PopoverTrigger asChild>
            <Button className="bg-slate-800  text-white hover:text-slate-200 border-none border-r-1 border-r-white">
              <Wand size={18} color="white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-2 w-[80vw] md:w-[50vw]  p-2 border">
            <div className="flex items-center gap-2 py-2">
              <Sparkles size={14} className="text-slate-600" />
              <Label className="text-slate-600">Generate</Label>
            </div>
            <Textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="border focus:border-none focus:ring-offset-0 "
              spellCheck={true}
              maxLength={180}
            />

            <p className=" text-right italic text-xs pt-2">
              {prompt.length}/180
            </p>

            <div className="flex justify-end">
              <Button className=" font-mono rounded-xl my-2">Generate</Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover
          open={isOpen}
          onOpenChange={(e) => {
            setIsOpen(e);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-800 border-none  hover:text-white text-white hover:bg-slate-900"
            >
              Headings
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-2 w-48 p-2">
            <Item
              action={() => editor.chain().toggleHeading({ level: 1 }).run()}
              label="Title"
            />
            <Item
              action={() => editor.chain().toggleHeading({ level: 2 }).run()}
              label="Subtitle"
            />
            <Item
              action={() => editor.chain().toggleHeading({ level: 3 }).run()}
              label="Notes"
            />
          </PopoverContent>
        </Popover>

        <ToggleGroup type="multiple">
          <div className="h-full py-2">
            <Separator orientation="vertical" className=" bg-slate-500" />
          </div>
          <ToggleGroupItem
            value="bulletList"
            className="hover:bg-slate-900"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-state={editor.isActive("bulletList") ? "on" : "off"}
          >
            <List size={18} color="white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="orderedList"
            className="hover:bg-slate-900"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-state={editor.isActive("orderedList") ? "on" : "off"}
          >
            <ListOrdered size={18} color="white" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="blockQuote"
            className="hover:bg-slate-900"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            data-state={editor.isActive("blockquote") ? "on" : "off"}
          >
            <Quote size={18} color="white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="hover:bg-slate-900"
            value="horizotalRule"
            data-state="off"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Ruler size={18} color="white" />
          </ToggleGroupItem>
          <div className="h-full py-2">
            <Separator orientation="vertical" className=" bg-slate-500" />
          </div>

          <ToggleGroupItem
            value="undo"
            className="hover:bg-slate-900"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            data-state={"off"}
          >
            <Undo size={18} color="white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="redo"
            className="hover:bg-slate-900"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            data-state={"off"}
          >
            <Redo size={18} color="white" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
