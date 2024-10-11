/* eslint-disable @typescript-eslint/no-explicit-any */
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
import AnimatedBackground from "../animated-background";
import { cn } from "@/lib/utils";

export default function SidePanel({
  editor,
  document,
}: {
  editor: Editor;
  document: any;
}) {
  const { projectId } = useParams();
  const [hidePanel, setHidePanel] = useState(true);
  const navigate = useNavigate();
  const TABS = ["Content", "AI Copilot"];
  const [currentTab, setCurrentTab] = useState("Content");
  if (hidePanel) {
    return (
      <div className="absolute md:fixed flex max-h-fit  md:m-5 gap-5">
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
          className=" md:block p-3 group rounded-xl  max-h-fit hover:bg-slate-200 cursor-pointer"
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
    <div className=" bg-slate-50    lg:w-[20vw]  py-2 px-2 pr-4 fixed z-[2000] w-full lg:flex flex-col h-screen  lg:sticky top-0 border-r border-slate-200 overflow-scroll  ">
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
      <div className="flex flex-row border-b py-2 gap-2">
        <AnimatedBackground
          defaultValue={TABS[0]}
          className="rounded-lg flex  bg-slate-300 dark:bg-zinc-800"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          {TABS.map((tab, index) => (
            <button
              onClick={() => setCurrentTab(tab)}
              key={index}
              data-id={tab}
              type="button"
              className={cn(
                "px-2  flex-1 flex justify-center py-1 text-sm rounded-lg text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
                currentTab === tab &&
                  "border border-slate-300 shadow-sm bg-slate-200 dark:bg-zinc-800"
              )}
            >
              {tab}
            </button>
          ))}
        </AnimatedBackground>
      </div>
      <div className={cn("pt-2", currentTab == "AI Copilot" && "hidden")}>
        <SidePanelContents editor={editor} />
      </div>
      <div>
        <Accordion
          type="single"
          collapsible
          defaultValue={"item-2"}
          className={cn("w-full px-2", currentTab == "Content" && "hidden")}
        >
          <AccordionItem value="item-2">
            <AccordionTrigger>Alternative Titles</AccordionTrigger>
            <AccordionContent asChild>
              <AlternativeTitlesSidePanel
                titles={document?.content?.copilot?.alternativeTitles || []}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Optimisation Review</AccordionTrigger>
            <AccordionContent asChild>
              <SEOAnalysis
                copilot={document?.content?.copilot?.analysis || null}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What to write next?</AccordionTrigger>
            <AccordionContent asChild>
              <WriteNext
                editor={editor}
                topics={document?.content?.copilot?.nextTopics || []}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
