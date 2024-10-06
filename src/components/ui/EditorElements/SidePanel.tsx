import { Editor } from "@tiptap/core";
import { ChevronLeft, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SidePanelContents } from "./SidePanelUI/Contents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AlternativeTitlesSidePanel from "./SidePanelUI/AlternativeTitles";
import SEOAnalysis from "./SidePanelUI/SEOAnalysis";
import WriteNext from "./SidePanelUI/WriteNext";

export default function SidePanel({
  editor,
  saving,
  name,
}: {
  editor: Editor;
  name: string;
  saving: boolean;
}) {
  const { projectId, id } = useParams();
  const [hidePanel, setHidePanel] = useState(false);
  const navigate = useNavigate();
  if (hidePanel) {
    return (
      <div className="absolute flex max-h-fit  md:m-5 gap-5">
        <div
          onClick={() => navigate("/project/" + projectId)}
          className="flex items-center max-h-fit cursor-pointer hover:bg-slate-200 p-2  rounded-xl justify-center gap-1 max-w-fit"
        >
          <ChevronLeft
            className=" text-slate-600   group:hover:text-slate-800"
            size={18}
          />
          <p>Back</p>
        </div>

        <div
          onClick={() => {
            setHidePanel(false);
          }}
          className="hidden md:block p-3 group rounded-xl  max-h-fit hover:bg-slate-200 cursor-pointer"
        >
          <PanelLeftOpen
            className=" text-slate-600   group:hover:text-slate-800"
            size={18}
          />
        </div>
      </div>
    );
  }
  return (
    <div className=" bg-slate-50 md:w-[15vw] py-2 px-2 pr-4 flex flex-col h-screen sticky top-0 border-r border-slate-200 overflow-scroll ">
      <div className="flex justify-between items-center">
        <div
          onClick={() => navigate("/project/" + projectId)}
          className="flex items-center cursor-pointer hover:bg-slate-200 p-2  rounded-xl justify-center gap-1 max-w-fit"
        >
          <ChevronLeft
            className=" text-slate-600   group:hover:text-slate-800"
            size={18}
          />
        </div>
        <div
          onClick={() => {
            setHidePanel(true);
          }}
          className="p-2 group rounded-xl hover:bg-slate-200 cursor-pointer"
        >
          <PanelLeftClose
            className=" text-slate-600   group:hover:text-slate-800"
            size={18}
          />
        </div>
      </div>
      <div>
        <Accordion
          type="multiple"
          defaultValue={["item-1"]}
          className="w-full px-2"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent asChild>
              <SidePanelContents editor={editor} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Alternative Titles</AccordionTrigger>
            <AccordionContent asChild>
              <AlternativeTitlesSidePanel />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Optimisation Review</AccordionTrigger>
            <AccordionContent asChild>
              <SEOAnalysis />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What to write next?</AccordionTrigger>
            <AccordionContent asChild>
              <WriteNext editor={editor} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
