/* eslint-disable @typescript-eslint/ban-ts-comment */
import { addSource, addSourceFile } from "@/api/functions/sources";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { CloudUpload, Info } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../ui/use-toast";
export default function AddSource({
  projectId,
  children,
}: {
  projectId: string;
  children?: React.ReactNode;
}) {
  const { toast } = useToast();
  const [file, setFile] = useState<null | File>(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const ref = useRef();
  const MAX_FILE_SIZE = 1 * 1024 * 1024; //1mb file size limit
  const onSubmitFn = async () => {
    if (name == "") {
      toast({
        title: "Please enter a name",
      });
      return;
    }
    if (url == "" && file == null) {
      toast({
        title: "Please enter a URL or upload a file",
        description: "You need to provide a document to upload.",
        variant: "destructive",
      });
      return;
    }
    if (file && file.size > MAX_FILE_SIZE) {
      toast({
        title: "File size too large",
        description: "Please upload a file less than 1MB",
        variant: "destructive",
      });
      return;
    }
    if (file) {
      //upload file
      toast({
        title: "Uploading file",
        description: "Please wait while we upload your file.",
      });
      const res = await addSourceFile({ file, name: name, projectId });
      // //console.log(res);
      if (res) {
        toast({
          title: "File uploaded successfully",
          description: "Your file has been uploaded successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["get", "sources"] });
        setFile(null);
      } else {
        toast({
          title: "Failed to upload file",
          description: "There was an error uploading the file.",
          variant: "destructive",
        });
      }
    } else {
      //upload url
      toast({
        title: "Uploading URL",
        description: "Please wait while we upload your URL.",
      });
      const res = await addSource({ url, name: name, projectId });
      // //console.log(res);
      if (res) {
        toast({
          title: "URL uploaded successfully",
          description: "Your URL has been uploaded successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["get", "sources"] });

        setUrl("");
      } else {
        toast({
          title: "Failed to upload URL",
          description: "There was an error uploading the URL.",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="font-mono">Add source</Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <div className=" space-y-4">
          <div>
            <h2 className="text-lg font-medium">Add source</h2>
            <p className="text-slate-500 text-sm">
              Novo will use these websites/documents to give accurate
              suggestions.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Souce name</Label>
            <Input
              maxLength={90}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="PRD of Tap to pay feature"
            />
          </div>
          <div className="space-y-2">
            <Label>Add website link</Label>
            <Input
              disabled={file != null}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyz.com/docs/feature-1"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label>Or upload a file</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>We support .docx, .txt, .json and .md files.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div
            onClick={() => {
              if (url != "") {
                toast({
                  title: "You can either upload a file or a URL",
                  description: "Remove the URL to upload a file.",
                });
                return;
              }
              //@ts-ignore
              if (ref.current) ref?.current?.click();
            }}
            className={cn(
              "w-full flex flex-col gap-4 items-center cursor-pointer justify-center p-10 border border-dashed rounded-xl border-slate-300 hover:bg-slate-50 hover:border-slate-600",
              file?.name && "bg-slate-100"
            )}
          >
            <CloudUpload />
            {file ? (
              <div className=" flex flex-col justify-center items-center">
                <p className="text-center">File: {file.name}</p>
                <p className=" text-center">
                  Size: {Math.round(file?.size / 1024)}kb
                </p>
              </div>
            ) : (
              <div className="text-slate-500">Drag and drop file here</div>
            )}
            <input
              disabled={url != ""}
              onChange={(event) => setFile(event.target.files[0])}
              ref={ref}
              type="file"
              className="hidden"
              accept=".md, .json, .txt, .docx"
            />
          </div>
          <div className=" flex justify-end">
            <Button onClick={() => onSubmitFn()}>Upload</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
