import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { promptsGenerateWithTemplate } from "@/api/functions/prompts";
import { Spinner } from "./spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "./use-toast";

const DynamicForm = ({ formFields, name, templateId, onBack }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { projectId } = useParams();
  const [documentName, setDocumentName] = useState("");
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create", "document"],
    mutationFn: promptsGenerateWithTemplate,
  });
  // Handle form input change
  const handleChange = (e, title) => {
    setFormData({
      ...formData,
      [title]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({
    //   formData,
    //   templateId,
    //   projectId,
    //   documentName,
    // });
    toast({
      title: "Novo is creating your document, give us a second...",
    });
    mutateAsync({
      fields: formData,
      templateId,
      projectId,
      title: documentName,
    })
      .then((res) => {
        toast({
          title: "Document created!",
        });
        if (res.documentId) {
          navigate(`/document/editor/${projectId}/${res.documentId}`);
        }
      })
      .catch((e) => {
        toast({
          title: "An error occurred",
          description: e?.message,
          variant: "destructive",
        });
      });

    // Add validation or submit logic here
  };
  //   console.log(isPending);
  if (isPending) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div
        onClick={() => onBack()}
        className="flex items-center cursor-pointer gap hover:bg-slate-100 max-w-fit pr-2 py-1 rounded-lg "
      >
        <ChevronLeft />
        <p className=" text-sm ">Select other template</p>
      </div>
      <div className="pb-4">
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          {name}
        </h1>
        <p className="text-slate-500">
          The more information you provide, the better the AI can assist you—but
          only complete the fields you feel are necessary.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 pt-2 overflow-scroll px-2  h-[60vh]">
          <div className="form-group space-y-2">
            <label className=" font-sans font-medium ">
              Name of the document*
            </label>
            <Input
              type="text"
              placeholder={"Launch plan of the new product"}
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              required={true}
              maxLength={120}
              className="form-control"
            />
          </div>
          {formFields.map((field, index) => (
            <div key={index} className="form-group space-y-2">
              <label className=" font-sans font-medium ">
                {field.title}
                {index == 0 && "*"}
              </label>
              <Input
                type="text"
                maxLength={320}
                placeholder={field.placeholder}
                value={formData[field.title] || ""}
                onChange={(e) => handleChange(e, field.title)}
                required={index === 0} // Make the first field required
                className="form-control"
              />
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
