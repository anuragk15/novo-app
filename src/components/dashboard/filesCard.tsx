import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TagsDropdown from "../home/ui/tags";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDocumentTag, getDocumentTags } from "@/api/functions/documents";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
export default function FilesCard({ files }) {
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
            {isLoading ? <div></div> : (
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
    <div className="  flex flex-col gap-4 items-start border  h-full w-full rounded-lg p-4 bg-white">
      <div className="flex w-full items-center gap-2 justify-start">
        <div className="bg-slate-100 rounded-full p-2 ">
          <Clock size={24} className="text-slate-600" />
        </div>
        <p className="text-xl font-sans font-medium">Recent Changes</p>
      </div>
      <div className="grid  grid-cols-1 h-full  md:grid-cols-2 gap-2">
        {files.slice(0, 4).map((item) => (
          <RecentFileItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
