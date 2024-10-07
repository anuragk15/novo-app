import { Button } from "@/components/ui/button";

import { uploadImageToServer } from "@/api/functions/assets";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Editor } from "@tiptap/core";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Heading,
  Image,
  List,
  ListOrdered,
  Quote,
  Redo,
  Ruler,
  Undo
} from "lucide-react";
import { useRef, useState } from "react";
import { Separator } from "../separator";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { useToast } from "../use-toast";
import DocNavbar from "./Navbar";

export function FloatingButtons({
  editor,
  projectId,
  saving,
  name
}: {
  editor: Editor;
  saving: boolean;
  name: string;
  projectId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  function Item({ action, label }: { action: () => void; label: string }) {
    return (
      <div
        onClick={() => {
          setIsOpen(false);
          setTimeout(() => {
            action();
          }, 400);
        }}
        className="w-full text-sm cursor-pointer text-black hover:bg-slate-200 rounded-sm  p-2"
      >
        {label}
      </div>
    );
  }

  return (
    <div className="  sticky  top-0 z-[2] ml-2 mt-10 md:mt-0 p-1 flex flex-wrap   border rounded-md items-center justify-end md:justify-between bg-slate-50">
      <div className="flex rounded-lg flex-wrap">
        {/* <div
          className="hover:bg-slate-900 my-auto items-center p-2 cursor-pointer data-[state=on]:bg-slate-800"
          data-state="off"
          onClick={() => setIsAiOpen(true)}
        >
          <Sparkles size={18} color="white" />
        </div> */}
        <Popover
          open={isOpen}
          onOpenChange={(e) => {
            setIsOpen(e);
          }}
          
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-50 hidden md:block my-auto border-none hover:bg-slate-200 text-slate-600"
            >
              <Heading size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-2 w-48 p-2 bg-slate-50">
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

        <ToggleGroup type="multiple" className="flex flex-wrap justify-start">
          <div className="h-full hidden md:block py-2">
            <Separator orientation="vertical" className=" bg-slate-300" />
          </div>
          <ToggleGroupItem
            value="bulletList"
            className="hover:bg-slate-300 "
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={18} className="text-slate-700" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="orderedList "
            className="hover:bg-slate-300 "
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={18} className="text-slate-700" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="blockQuote"
            className="hover:bg-slate-300 "
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={18} className="text-slate-700" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="image"
            className="hover:bg-slate-300 "
            onClick={() => {
              imageInputRef.current?.click();
            }}
          >
            <Image size={18} className="text-slate-700" />
            <input
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 1024 * 1024 * 10) {
                  toast({
                    title: "Image too large",
                    description: "Please upload an image less than 10mb",
                    variant: "destructive",
                  });
                  return;
                }
                const reader = new FileReader();
                reader.onload = async (e) => {
                  const url = e.target?.result;
                  // get position of the editor here
                  // const { state } = editor;
                  // const { from } = state;
                  editor
                    .chain()
                    .focus()
                    .setImage({ src: url as string })
                    .run();

                  await uploadImageToServer({
                    projectId,
                    file: file,
                  }).then((r) => {
                    if (r?.data?.url) {
                      editor
                        .chain()
                        .focus()
                        .setImage({ src: r.data.url })
                        .run();
                    }
                  });
                };

                reader.readAsDataURL(file);
              }}
              ref={imageInputRef}
              className="hidden"
              type="file"
              accept="image/*"
            />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="hover:bg-slate-300 "
            value="horizotalRule"
            data-state="off"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Ruler size={18} className="text-slate-700" />
          </ToggleGroupItem>
          <div className="h-full hidden md:block py-2">
            <Separator orientation="vertical" className=" bg-slate-300" />
          </div>

          <ToggleGroupItem
            className="hover:bg-slate-300 "
            value="left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={18} className="text-slate-700" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="hover:bg-slate-300 "
            value="center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={18} className="text-slate-700" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="right"
            className="hover:bg-slate-300 "
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={18} className="text-slate-700" />
          </ToggleGroupItem>
          <div className="h-full hidden md:block py-2">
            <Separator orientation="vertical" className=" bg-slate-300" />
          </div>

          <ToggleGroupItem
            value="undo"
            className="hover:bg-slate-300 "
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            data-state={"off"}
          >
            <Undo size={18} className="text-slate-700" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="redo"
            className="hover:bg-slate-300 "
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            data-state={"off"}
          >
            <Redo size={18} className="text-slate-700" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex h-full pr-2 ">
        <DocNavbar editor={editor} saving={saving} name={name} />
      </div>
    </div>
  );
}
