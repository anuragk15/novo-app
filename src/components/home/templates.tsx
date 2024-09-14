import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TemplateCard from "../ui/templateCard";
import SourceSearch from "./ui/sourceSearch";
import DynamicForm from "../ui/formTemplate";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateNewDocumentPopup } from "../ui/createNewDocumentPopup";
export default function TemplatesScreen({ data }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    if (selectedTemplate) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [selectedTemplate]);

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-[768px]">
          <DynamicForm
            templateId={selectedTemplate?.id}
            formFields={selectedTemplate?.fields?.data || []}
            name={selectedTemplate?.name}
            onBack={() => {
              setSelectedTemplate(null);
            }}
          />
        </DialogContent>
      </Dialog>
      <div className=" flex-col w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
        <SourceSearch />
        <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[91vh] bg-white">
          <div className="flex justify-between w-full items-center">
            <div>
              <h2 className="text-2xl">Templates</h2>
              <p className="text-slate-500">
                Your favourite templates to help you get started.
              </p>
            </div>
            <CreateNewDocumentPopup
              trigger={
                <Button className="font-mono">Use other templates</Button>
              }
            />
          </div>

          {data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3">
              {data.map((item, i) => (
                <TemplateCard
                  key={item.id}
                  index={i + 1}
                  name={item.name}
                  description={item.description}
                  tags={item.tags}
                  id={item.id}
                  fields={item.fields}
                  bookmarkId={item.bookmarkId}
                  setSelectedTemplate={setSelectedTemplate}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[70vh] w-full flex-col  justify-center items-center ">
              <img
                src={"/EmptyState.svg"}
                style={{
                  width: "15rem",
                  height: "15rem",
                }}
              />
              <p className=" text-center font-sans text-2xl">
                No templates found
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
