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
  Heading,
  List,
  ListOrdered,
  Quote,
  Redo,
  Ruler,
  Sparkles,
  Undo,
  X,
} from "lucide-react";
import { Separator } from "../separator";

export function ActionButtons({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);

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
        className="w-full text-sm cursor-pointer text-white rounded-sm hover:bg-gray-700 p-2"
      >
        {label}
      </div>
    );
  }

  if (showAi) {
    return (
      <div className="  max-w-fit items-center justify-center">
        <div className="flex items-center rounded-lg mb-2 justify-center border-white border  ">
          <Button
            onClick={() => setShowAi(false)}
            className="  text-white hover:text-slate-200 border-none border-r-1 border-r-white"
          >
            <X size={18} color="white" />
          </Button>

          <Button className=" items-center gap-2 flex text-white hover:text-slate-200 border-none border-r-1 border-r-white">
            <Sparkles size={14} /> <p>Generate</p>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="  sticky pb-2 pt-2 mx-auto  bottom-0 max-w-fit items-center justify-center">
      <div className="flex rounded-lg mb-2 justify-center border-slate-900 border  bg-slate-800 ">
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
              <Heading size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-2 w-48 p-2 bg-slate-800">
            <Item
              action={() => editor.chain().toggleHeading({ level: 1 }).run()}
              label="H1"
            />
            <Item
              action={() => editor.chain().toggleHeading({ level: 2 }).run()}
              label="H2"
            />
                <Item
              action={() => editor.chain().toggleHeading({ level: 3 }).run()}
              label="H3"
            />
            <Item
              action={() => editor.chain().focus().setParagraph().run()}
              label="Paragraph"
            />
          </PopoverContent>
        </Popover>

        <ToggleGroup type="multiple">
          <div className="h-full py-2">
            <Separator orientation="vertical" className=" bg-slate-500" />
          </div>
          <ToggleGroupItem
            value="bulletList"
            className="hover:bg-slate-900 data-[state=on]:bg-slate-800"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={18} color="white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="orderedList "
            className="hover:bg-slate-900 data-[state=on]:bg-slate-800"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={18} color="white" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="blockQuote"
            className="hover:bg-slate-900 data-[state=on]:bg-slate-800"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={18} color="white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="hover:bg-slate-900 data-[state=on]:bg-slate-800"
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
            className="hover:bg-slate-900 data-[state=on]:bg-slate-800"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            data-state={"off"}
          >
            <Undo size={18} color="white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="redo"
            className="hover:bg-slate-900 data-[state=on]:bg-slate-800"
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
