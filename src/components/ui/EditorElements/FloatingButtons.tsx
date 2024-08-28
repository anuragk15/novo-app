import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/core";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { List, ListOrdered, Quote, Ruler, Sparkles, Wand } from "lucide-react";
import { Textarea } from "../textarea";
import { Label } from "../label";

export function FloatingButtons({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
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
  return (
    <>
      <Popover
        open={isOpen1}
        onOpenChange={(e) => {
          setIsOpen1(e);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Wand size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="ml-2 w-[80vw] md:w-[50vw]  p-2">
          <div className="flex items-center gap-2 py-2">
            <Sparkles size={14} />
            <Label>Ask AI to write</Label>
          </div>
          <Textarea spellCheck={true} maxLength={120} />
        </PopoverContent>
      </Popover>
      <Popover
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline">Headings</Button>
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
          className="border bg-white"
          value="horizotalRule"
          data-state="off"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Ruler size={18} />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
