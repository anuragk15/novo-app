import {
  addDocumentTag,
  getDocuments,
  getDocumentTags,
} from "@/api/functions/documents";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, formatDate } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, Rocket } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TagsDropdown from "../home/ui/tags";
import { AnimatedGroup } from "../ui/animated-group";
import { Button } from "../ui/button";
import { CreateNewDocumentPopup } from "../ui/createNewDocumentPopup";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import Loader from "../ui/loader";
import { BorderTrail } from "../ui/border-trail";
export default function FilesCard() {
  const { data: files, isLoading: filesLoading } = useQuery({
    queryKey: ["get", "documents"],
    queryFn: async () => {
      const res = await getDocuments({ projectId });
      return res?.data;
    },
  });
  const { projectId } = useParams();

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const { data: tags, isLoading } = useQuery({
    queryKey: ["get", "tags"],
    queryFn: async () => {
      const res = await getDocumentTags({ projectId });
      return res?.data;
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync: createNewTagFn } = useMutation({
    mutationKey: ["add", "tag"],
    mutationFn: async (tag: string) => {
      const res = await addDocumentTag({ projectId, tag });
      return res?.data;
    },
  });

  const RecentFileItem = ({ item }) => {
    return (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="space-y-4">
            <DialogHeader className="py">
              <DialogTitle>Add new tag</DialogTitle>
            </DialogHeader>
            <DialogDescription className="space-y-1">
              <Label title="Tag name" />
              <Input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="text-black"
                placeholder="Marketing"
              />
              <div className="flex gap-2 pt-5 justify-end">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  variant="ghost"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    createNewTagFn(tagName);
                    toast({
                      title: "✨ Tag added!",
                      description: "You’ve added a new tag to your project.",
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["get", "tags"],
                    });
                    setIsOpen(false);
                  }}
                >
                  Save
                </Button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Link
          to={"/document/editor/" + projectId + "/" + item.id}
          className="py-2 px-4  flex-col flex justify-between border rounded-lg w-full h-full bg-slate-50 hover:bg-slate-100 cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div className=" line-clamp-2 text-ellipsis font-semibold">
              {item.title}
            </div>
          </div>
          <div
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between"
          >
            {isLoading ? (
              <div></div>
            ) : (
              <TagsDropdown
                addNewTag={setIsOpen}
                appliedTags={item.tags}
                tags={tags}
                fileCard={true}
                projectId={projectId}
                documentId={item.id}
              />
            )}
            <div className="text-xs text-slate-500 font-semibold">
              {formatDate(new Date(item.updatedAt))}
            </div>
          </div>
        </Link>
      </>
    );
  };
  return (
    <div className=" relative flex flex-col gap-4 items-start border  h-full w-full rounded-lg p-4 bg-white">
      <BorderTrail
        className={cn(
          "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
          filesLoading && "opacity-100"
        )}
        size={200}
        transition={{
          ease: [0, 0.5, 0.8, 0.5],
          duration: 4,
          repeat: 20,
        }}
      />
      {files?.length == 0 ? null : (
        <div className="flex w-full items-center gap-2 justify-start">
          <div className="bg-slate-100 rounded-full p-2 ">
            <Clock size={24} className="text-slate-600" />
          </div>
          <p className="text-xl font-sans font-medium">Recent Changes</p>
        </div>
      )}
      {filesLoading ? (
        <div className="flex h-full w-full flex-col justify-center items-center">
          <Loader />
        </div>
      ) : files?.length > 0 ? (
        <AnimatedGroup className="grid  grid-cols-1 h-full  md:grid-cols-2 gap-2">
          {files.slice(0, 4).map((item) => (
            <RecentFileItem key={item.id} item={item} />
          ))}
        </AnimatedGroup>
      ) : (
        <div className="flex h-full w-full flex-col justify-center items-center">
          <p className="text-slate-500 text-center">
            Create your first file to get started
          </p>
          <CreateNewDocumentPopup
            defaultOption="TEMPLATE"
            trigger={
              <Button className="mt-4 flex items-center gap-2">
                <Rocket size={16} />
                Start with a template
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
