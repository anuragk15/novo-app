import { addDocumentTag, getDocumentTags } from "@/api/functions/documents";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Tags } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TagsDropdown from "./tags";
import { ConfirmDelete } from "@/components/ui/confirmDelete";

export function FilesTable({ files }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const { projectId } = useParams();
  const { data: tags, isLoading } = useQuery({
    queryKey: ["get", "tags"],
    queryFn: async () => {
      const res = await getDocumentTags({ projectId });
      return res?.data;
    },
  });
  const { mutateAsync: createNewTagFn } = useMutation({
    mutationKey: ["add", "tag"],
    mutationFn: async (tag: string) => {
      const res = await addDocumentTag({ projectId, tag });
      return res?.data;
    },
  });

  return (
    <>
      <ConfirmDelete
        setOpen={setShowDelete}
        open={showDelete}
        message={
          "This action cannot be undone. This will delete the document permanently."
        }
        onConfirm={() => {}}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add new tag</DialogTitle>
            <DialogDescription className="space-y-2">
              <Label title="Tag name" />
              <Input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="text-black"
                placeholder="Marketing"
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
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
                queryClient.invalidateQueries({ queryKey: ["get", "tags"] });
                setIsOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader className="">
          <TableRow className="">
            <TableHead className="">Name</TableHead>
            <TableHead className="flex gap-2 items-center">
              Tags <Tags size={16} />{" "}
            </TableHead>
            <TableHead className="text-right">Last edited</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files && files?.length> 0 && files?.map((singleDocument, index) => {
            return (
              <TableRow
                className=" cursor-pointer border-b border-slate-200  hover:bg-slate-100"
                key={index}
              >
                <TableCell
                  onClick={() => {
                    navigate(
                      "/document/editor/" + projectId + "/" + singleDocument.id
                    );
                  }}
                >
                  {singleDocument.title}
                </TableCell>
                <TableCell className="font-normal">
                  {isLoading ? (
                    <div>Loading tags...</div>
                  ) : (
                    <TagsDropdown
                      projectId={projectId}
                      addNewTag={setIsOpen}
                      tags={tags}
                      appliedTags={singleDocument.tags}
                      documentId={singleDocument.id}
                    />
                  )}
                </TableCell>
                <TableCell className="font-light text-right">
                  {formatDate(new Date(singleDocument.updatedAt))}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2">
                      <EllipsisVertical size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/document/editor/${projectId}/${singleDocument.id}`
                          );
                          toast({
                            title: "✨  Link copied!",
                            description:
                              "You’ve got the magic link—now go inspire some readers!",
                          });
                        }}
                      >
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setShowDelete(true);
                        }}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
