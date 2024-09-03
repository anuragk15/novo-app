import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import TemplateCard from "./templateCard";
import { cn } from "@/lib/utils";
import SearchBar from "../home/search";
import { Input } from "./input";

export function CreateNewDocumentPopup() {
  const [option, setOption] = useState<null | "TEMPLATE" | "BLANK">(null);

  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          setOption(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className=" font-mono">Start typing...</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[80vw] flex flex-col justify-between min-h-[80vh]">
        <div className="flex flex-col gap-2 flex-1">
          <DialogHeader>
            <DialogTitle>Create new document</DialogTitle>
            <DialogDescription>
              Choose from a variety of document templates or start from scratch.
            </DialogDescription>
          </DialogHeader>
          {option == "BLANK" ? (
            <CreateFromScratch setOption={setOption} />
          ) : option == "TEMPLATE" ? (
            <SelectTemplate setOption={setOption} />
          ) : (
            <ChooseOption setOption={setOption} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ChooseOption = ({ setOption }) => {
  const [selected, setSelected] = useState<"BLANK" | "TEMPLATE" | null>(null);
  return (
    <div className="flex gap-4 flex-col flex-1 items-center w-full h-full justify-center">
      <div className="flex  md:flex-row  flex-col gap-4 flex-1 items-center w-full h-full justify-center">
        <div
          className={cn(
            "group cursor-pointer hover:border-slate-700 hover:border-solid  md:min-h-80 md:w-[25vw] p-2 md:p-10 rounded-xl border-dashed border-2 flex gap-4 flex-col justify-center ",
            selected == "BLANK" && "border-slate-800 border-solid"
          )}
          onClick={() => setSelected("BLANK")}
        >
          <p className="flex justify-center">
            <Plus
              size={34}
              className={cn(
                "text-center group-hover:text-slate-950 text-slate-500",
                selected == "BLANK" && "text-slate-800"
              )}
            />
          </p>
          <p className=" text-center text-xl font-light">Create from scratch</p>
          <p className=" text-center text-md text-gray-500 ">
            Unleash your creativity on a blank canvas.
          </p>
        </div>
        <div
          className={cn(
            "group cursor-pointer hover:border-slate-700 hover:border-solid  md:min-h-80 md:w-[25vw] p-2 md:p-10 rounded-xl border-dashed border-2 flex gap-4 flex-col justify-center ",
            selected == "TEMPLATE" && "border-slate-800 border-solid"
          )}
          onClick={() => setSelected("TEMPLATE")}
        >
          <p
            className={cn(
              "text-4xl text-center group-hover:text-slate-950 text-slate-500",
              selected == "TEMPLATE" && "text-slate-800"
            )}
          >
            #
          </p>
          <p className=" text-center text-xl font-light">Use template</p>
          <p className=" text-center text-md  text-gray-500">
            From concept to content—quickly and effortlessly.
          </p>
        </div>
      </div>
      <Button
        disabled={selected == null}
        onClick={() => {
          setOption(selected);
        }}
      >
        Continue
      </Button>
    </div>
  );
};
const CreateFromScratch = ({ setOption }) => {
  return (
    <div>
      <div className=" font-mono"># Blank document</div>
      <div className=" font-sans"></div>
    </div>
  );
};

const SelectTemplate = ({ setOption }) => {
  return (
    <div>
      <div className="flex justify-between gap-2 py-2 pr-2 items-center">
        <div className="flex border shadow-sm w-full items-center bg-white px-2 rounded-lg">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-90" />
          <Input
            placeholder="Search templates..."
            className={cn(
              "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
            )}
          />
        </div>
        
      </div>
      <div className="grid gap-y-2 grid-cols-2 md:grid-cols-3 py-4 overflow-scroll h-[65vh]">
        <TemplateCard index={1} />
        <TemplateCard index={2} />
        <TemplateCard index={3} />
        <TemplateCard index={4} />
        <TemplateCard index={5} />
        <TemplateCard index={6} />
        <TemplateCard index={4} />
        <TemplateCard index={5} />
        <TemplateCard index={6} />
        <TemplateCard index={4} />
        <TemplateCard index={5} />
        <TemplateCard index={6} />
      </div>
    </div>
  );
};
