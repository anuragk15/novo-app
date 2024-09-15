/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { formatDate, isFileNameOrUrl } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { deleteSource } from "@/api/functions/sources";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
interface Source {
  id: string;
  title: string;
  url: string;
  createdAt: string;
  projectId: string;
}
export function SourcesTable({ sources }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showDetails, setShowDetails] = useState<Source | null>(null);
  return (
    <>
      <Dialog
        open={showDetails != null}
        onOpenChange={() => setShowDetails(null)}
      >
        <DialogContent>
          <div className="space-y-4">
            <p>Name: {showDetails?.title}</p>
            <p>Source: {showDetails?.url}</p>
            <p>Created at: {new Date(showDetails?.createdAt).toLocaleString()}</p>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="">Name</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="text-right">Last edited</TableHead>
            <TableHead className="text-right"> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sources.map((item, i) => (
            <TableRow className=" cursor-pointer" key={i}>
              <TableCell>{item.title}</TableCell>
              <TableCell className="font-normal">
                {isFileNameOrUrl(item.url) == "URL" ? "URL" : "File"}
              </TableCell>
              <TableCell className="font-light text-right">
                {formatDate(new Date(item.createdAt))}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2">
                    <EllipsisVertical size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowDetails(item)}>
                      Show detail
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await deleteSource({
                          sourceId: item.id,
                          projectId: item.projectId,
                        });
                        toast({
                          title: "Source deleted",
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["get", "sources"],
                        });
                      }}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
