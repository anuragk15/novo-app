import { getTemplates } from "@/api/functions/templates";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "./formTemplate";
import { Input } from "./input";
import { Spinner } from "./spinner";
import TemplateCard from "./templateCard";

export function CreateNewDocumentPopup({
  trigger,
  defaultOption,
}: {
  trigger?: JSX.Element;
  defaultOption?: "TEMPLATE" | "BLANK";
}) {
  const [option, setOption] = useState<null | "TEMPLATE" | "BLANK">(
    defaultOption
  );
  const [showTitle, setShowTitle] = useState(true);
  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          setOption(null);
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className=" font-mono">Start typing...</Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "md:max-w-[55vw] flex flex-col justify-between min-h-[60vh]",
          option == "TEMPLATE" && "md:max-w-[75vw]"
        )}
      >
        <div className="flex flex-col gap-2 flex-1">
          {showTitle && (
            <DialogHeader>
              <DialogTitle>Create new document</DialogTitle>
              <DialogDescription>
                Choose from a variety of document templates or start from
                scratch.
              </DialogDescription>
            </DialogHeader>
          )}
          {option == "BLANK" ? (
            <CreateFromScratch />
          ) : option == "TEMPLATE" ? (
            <SelectTemplate toggleHeader={(e: boolean) => setShowTitle(e)} />
          ) : (
            <ChooseOption setOption={setOption} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ChooseOption = ({ setOption }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  return (
    <div className="flex gap-4 flex-col flex-1 items-center w-full h-full justify-center">
      <div className="flex  md:flex-row   flex-col gap-4 flex-1 items-center w-full h-full justify-center">
        <div
          className={cn(
            "group cursor-pointer w-full hover:bg-slate-50 hover:border-solid h-full  flex-1  md:min-h-60 md:w-[20vw] p-2 md:p-10 rounded-xl border-dashed border-2 flex gap-4 flex-col justify-center "
          )}
          onClick={() => {
            navigate(`/document/editor/${projectId}/new`);
          }}
        >
          <p className="flex justify-center">
            <Plus
              size={34}
              className={cn(
                "text-center group-hover:text-slate-950 text-slate-500"
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
            "group cursor-pointer w-full hover:bg-slate-50  hover:border-solid h-full flex-1   md:min-h-60 md:w-[20vw] p-2 md:p-10 rounded-xl border-dashed border-2 flex gap-4 flex-col justify-center "
          )}
          onClick={() => setOption("TEMPLATE")}
        >
          <p
            className={cn(
              "text-4xl text-center group-hover:text-slate-950 text-slate-500"
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
    </div>
  );
};
const CreateFromScratch = () => {
  return (
    <div>
      <div className=" font-mono"># Blank document</div>
      <div className=" font-sans"></div>
    </div>
  );
};

const SelectTemplate = ({ toggleHeader }) => {
  const { projectId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedInputValue = useDebounce(searchQuery, 500); // 500ms debounce delay
  const { data, isLoading } = useQuery({
    queryKey: ["get", "templates"],
    queryFn: async () => {
      const res = await getTemplates({ projectId });
      return res?.data;
    },
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState(data);
  useEffect(() => {
    if (debouncedInputValue) {
      setTemplates(
        data?.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(debouncedInputValue.toLowerCase()) ||
            item.tags
              .join(" ")
              .toLowerCase()
              .includes(debouncedInputValue.toLowerCase())
        )
      );
    } else if (debouncedInputValue === "") {
      setTemplates(data);
    }
  }, [debouncedInputValue, data]);
  useEffect(() => {
    if (isLoading) return;
    if (data && data?.length > 0) {
      const t = [...data];
      t.sort((a, b) => {
        if (a.bookmarkId && !b.bookmarkId) {
          return -1;
        } else if (!a.bookmarkId && b.bookmarkId) {
          return 1;
        } else {
          return 0;
        }
      });

      setTemplates(t);
    }
  }, [data, isLoading]);

  if (selectedTemplate)
    return (
      <DynamicForm
        templateId={selectedTemplate?.id}
        formFields={selectedTemplate?.fields?.data || []}
        name={selectedTemplate?.name}
        onBack={() => {
          toggleHeader(true);
          setSelectedTemplate(null);
        }}
      />
    );
  return (
    <div>
      <div className="flex justify-between gap-2 py-2 pr-2 items-center">
        <div className="flex border shadow-sm w-full items-center bg-white px-2 rounded-lg">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-90" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className={cn(
              "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
            )}
          />
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid gap-y-2 grid-cols-2 md:grid-cols-3 py-4 overflow-scroll h-[65vh]">
          {data?.length > 0
            ? templates?.map((item, i) => {
                return (
                  <TemplateCard
                    key={i}
                    setSelectedTemplate={(d) => {
                      toggleHeader(false);
                      setSelectedTemplate(d);
                    }}
                    bookmarkId={item.bookmarkId}
                    index={i + 1}
                    id={item.id}
                    tags={item.tags}
                    fields={item.fields}
                    name={item.name}
                    description={item.description}
                  />
                );
              })
            : null}
        </div>
      )}
    </div>
  );
};
