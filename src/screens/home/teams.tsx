import {
  getProjectById,
  getProjectCollaborators,
  inviteCollaborator,
  removeCollaborator,
  removeInvite,
} from "@/api/functions/projects";
import MobileSideBar from "@/components/home/mobileSidebar";
import Sidebar from "@/components/home/sidebar";
import { Button } from "@/components/ui/button";
import { ConfirmDelete } from "@/components/ui/confirmDelete";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn, formatAccessLevel } from "@/lib/utils";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TeamsScreen() {
  const [email, setEmail] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<
    null | "admin" | "manager" | "write" | "read"
  >(null);
  const { toast } = useToast();
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "collaborators", "project", projectId],
    queryFn: async () => {
      const res = await getProjectCollaborators({ projectId });
      return res?.data;
    },
    staleTime: Infinity,
  });
  const { data: currentProject, isLoading: isProjectLoading } = useQuery({
    queryKey: ["get", "project", projectId],
    queryFn: async () => {
      const res = await getProjectById({ projectId });
      return res?.data;
    },
    staleTime: Infinity,
  });
  //console.log(data);
  const queryClient = useQueryClient();
  const { mutateAsync: inviteCollaboratorFn } = useMutation({
    mutationKey: ["invite", "collaborator", email, projectId],
    mutationFn: async ({
      email,
      accessLevel,
      projectId,
    }: {
      email: string;
      accessLevel: "admin" | "manager" | "write" | "read";
      projectId;
    }) => {
      const res = await inviteCollaborator({ email, accessLevel, projectId });
      queryClient.invalidateQueries({
        queryKey: ["get", "collaborators", "project", projectId],
      });
      return res?.data;
    },
  });

  const handleSubmit = async () => {
    if (selectedAccessLevel == null) {
      toast({
        title: "Select access level",
        description: "Please select an access level for the collaborator",
      });
      return;
    } else if (email == "") {
      toast({
        title: "Enter email",
        description: "Please enter an email address for the collaborator",
      });
      return;
    }
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }
    if (data?.find((item) => item.email == email)) {
      toast({
        title: "Already invited",
        description: "This user has already been invited",
      });
      return;
    }
    try {
      await inviteCollaboratorFn({
        email,
        accessLevel: selectedAccessLevel,
        projectId,
      });
      toast({
        title: "✅ Invite created",
        description: `Ask them to sign up on Novo and accept the invite`,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e?.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="flex  bg-slate-100">
      <div className="hidden md:block">
        <Sidebar projectId={projectId} />
      </div>
      {isLoading || isProjectLoading ? (
        <div className="flex flex-col w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <div>
          <MobileSideBar projectId={projectId} />
          <div className="flex flex-col w-full md:w-[85vw]  gap-10 p-8 overflow-scroll h-screen bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className=" text-2xl">Manage collaborators</h1>
                <p className="text-slate-500 hidden md:block">
                  Invite your team members and manage access.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className=" gap-2 md:flex hidden">
                    <Plus size={16} />
                    <p>Invite</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-xl font-medium">
                      Invite your team member
                    </h1>
                    <div className="flex flex-col gap-1">
                      <Label className="font-medium text-sm">Email</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="focus-visible:ring-1 focus-visible:ring-offset-0"
                        placeholder="peter@parker.com"
                      />
                    </div>
                    <div>
                      <p>Access level:</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            className="min-w-[120px] mt-2"
                            variant="outline"
                          >
                            {selectedAccessLevel
                              ? formatAccessLevel(selectedAccessLevel)
                              : "Select"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {currentProject?.project?.accessLevel == "admin" && (
                            <DropdownMenuItem
                              onClick={() => setSelectedAccessLevel("admin")}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>Admin</TooltipTrigger>
                                  <TooltipContent
                                    align="end"
                                    className="bg-white p-2 border rounded-xl"
                                  >
                                    Admins can manage all aspects of the project
                                    including billing, team management, and
                                    deletion of project.
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => setSelectedAccessLevel("manager")}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>Manager</TooltipTrigger>
                                <TooltipContent
                                  align="end"
                                  className="bg-white p-2 border rounded-xl"
                                >
                                  Managers can read, write, and delete
                                  documents. They can also invite and remove
                                  team members.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSelectedAccessLevel("write")}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>Editor</TooltipTrigger>
                                <TooltipContent
                                  align="end"
                                  className="bg-white p-2 border rounded-xl"
                                >
                                  Editors can create and edit documents.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSelectedAccessLevel("read")}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>Viewer</TooltipTrigger>
                                <TooltipContent
                                  align="end"
                                  className="bg-white p-2 border rounded-xl"
                                >
                                  Viewer just have read access.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <DialogFooter className="flex">
                    <DialogClose>
                      <Button variant="ghost">Close</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit}>Send invite</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Table className="hidden md:block">
              <TableHeader className=" overflow-x-scroll">
                <TableRow className=" overflow-x-scroll ">
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className=" overflow-x-scroll">
                {data.map((item, i) => (
                  <TableRow key={i} className="overflow-x-scroll">
                    <TableCell className="font-medium text-slate-600">
                      {i + 1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <p
                        className={cn(
                          " p-2 text-xs  max-w-fit text-center rounded-xl",
                          item?.accepted == true
                            ? "text-green-700 bg-green-100"
                            : "text-yellow-700 bg-yellow-100"
                        )}
                      >
                        {item?.accepted == true ? "Accepted" : "Pending"}
                      </p>
                    </TableCell>
                    <TableCell>
                      {item?.accessLevel == "admin"
                        ? "Admin"
                        : item?.accessLevel == "manager"
                        ? "Manager"
                        : item?.accessLevel == "write"
                        ? "Editor"
                        : item?.accessLevel == "read"
                        ? "Viewer"
                        : null}
                    </TableCell>
                    <TableCell className="text-right flex gap-4 justify-end">
                      {/* {item?.type == "collaborator" && (
                      <div className=" flex gap-2 group cursor-pointer items-center">
                        <KeyRound size={18} color="orange" />
                      </div>
                    )} */}
                      <DeleteCollaboratorUI
                        projectId={projectId}
                        item={item}
                        data={data}
                        currentProject={currentProject}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="md:hidden text-center h-full flex-1 items-center my-auto">
              Log in on desktop or a bigger screen to manage team.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const DeleteCollaboratorUI = ({ item, projectId, data, currentProject }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  function checkNumberOfAdmins() {
    let adminCount = 0;
    data.forEach((item) => {
      if (item.accessLevel == "admin" && item.type == "collaborator") {
        adminCount++;
      }
    });
    return adminCount;
  }
  return (
    <div>
      <ConfirmDelete
        onConfirm={async () => {
          if (item?.type == "collaborator") {
            //only admin can remove other admin
            if (
              item?.accessLevel == "admin" &&
              currentProject?.project?.accessLevel != "admin"
            ) {
              toast({
                title: "Error",
                variant: "destructive",
                description: "Cannot remove an admin",
              });
              return;
            } else if (
              item?.accessLevel == "admin" &&
              checkNumberOfAdmins() == 1
            ) {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Cannot remove the only admin",
              });
              return;
            } else {
              await removeCollaborator({
                projectId,
                collaboratorId: item.collaboratorId,
              })
                .then(() => {
                  queryClient.invalidateQueries({
                    queryKey: ["get", "collaborators", "project", projectId],
                  });
                  toast({
                    title: "Removed",
                    description: "Collaborator has been successfully removed!",
                  });
                })
                .catch(() => {
                  toast({
                    variant: "destructive",
                    title: "Failed",
                    description: "An error occurred",
                  });
                });
            }
            // add remove collaborator function
          } else {
            removeInvite({
              inviteId: item.inviteId,
              projectId,
            });
            queryClient.invalidateQueries({
              queryKey: ["get", "collaborators", "project", projectId],
            });
            toast({
              title: "Removed",
              description: "Invite has been successfully removed!",
            });
          }
        }}
        open={showDialog}
        setOpen={setShowDialog}
        message={
          "Are you sure you want to remove this collaborator? This cannot be undone."
        }
      />
      <div
        onClick={() => setShowDialog(true)}
        className="p-2 cursor-pointer hover:bg-slate-200 rounded-xl"
      >
        <Trash size={18} color="red" />
      </div>
    </div>
  );
};
