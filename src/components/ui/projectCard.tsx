import { deleteProject } from "@/api/functions/projects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateColorsFromInitial } from "@/lib/utils";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, FolderClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from "./alert-dialog";
import { Button } from "./button";
import { useToast } from "./use-toast";

export default function ProjectCard({
  name,
  id,
  createdOn,
  role,
}: {
  name: string;
  id: string;
  role: string;
  createdOn: Date;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { background, text } = generateColorsFromInitial(name);
  return (
    <a
      href={"/project/" + id}
      className="group w-full md:w-fit hover:shadow-sm  py-4 px-4 bg-white flex flex-col gap-4 rounded-lg hover:bg-slate-50 cursor-pointer border min-w-[20vw]"
    >
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. We will cancel your subscription and
              remove all data related to this project from our server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant="ghost">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteProject({ projectId: id }).then(() => {
                  toast({
                    title: "Project deleted successfully",
                    variant: "destructive",
                  });
                  queryClient.invalidateQueries({
                    queryKey: ["get", "projects"],
                  });
                });
              }}
            >
              <Button className="bg-red-500 mx-2 hover:bg-red-700">
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex justify-between items-start">
        <div
          style={{ backgroundColor: background }}
          className="flex p-4 max-w-fit rounded-lg group-hover:rounded-xl"
        >
          <FolderClosed size={"2.5rem"} color={text} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                navigate(`/project/${id}/settings`);
              }}
              className="cursor-pointer"
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate(`/project/${id}/team`);
              }}
              className="cursor-pointer"
            >
              Team
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate(`/project/${id}/settings/billing`);
              }}
              className="cursor-pointer"
            >
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                setConfirmDelete(true);
              }}
              className="text-red-500 cursor-pointer focus:bg-red-200 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-xl font-sans">{name}</p>
      <div className="flex gap-2 border-t pt-2 justify-between items-center">
        <div className=" ">
          <div className="text-xs text-gray-500">Role</div>

          <div className="text-xs font-sans">{role}</div>
        </div>

        <div className=" ">
          <div className="text-xs text-gray-500 text-right">Created on</div>

          <div className="text-xs font-sans">{createdOn.toDateString()}</div>
        </div>
      </div>
    </a>
  );
}
