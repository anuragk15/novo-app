import {
  getProjectById,
  getProjectCollaborators,
  inviteCollaborator,
  removeInvite,
} from "@/api/functions/projects";
import Sidebar from "@/components/home/sidebar";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyRound, Plus, Trash } from "lucide-react";
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
  console.log(data);
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
  // const { mutateAsync: removeCollaboratorFn } = useMutation({
  //   mutationKey: ["remove", "collaborator", email, projectId],
  //   mutationFn: async ({
  //     email,
  //     accessLevel,
  //     projectId,
  //   }: {
  //     email: string;
  //     collaboratorId: string;
  //     projectId;
  //   }) => {
  //     const res = await inviteCollaborator({ email, accessLevel, projectId });
  //     queryClient.invalidateQueries({
  //       queryKey: ["get", "collaborators", "project", projectId],
  //     });
  //     return res?.data;
  //   },
  // });
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
        title: "✅ Invite sent",
        description: `An invite has been sent to ${email}`,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e?.response?.data?.message || "An error occurred",
      });
    }
  };
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
    <div className="flex  bg-slate-100">
      <Sidebar projectId={projectId} />
      {isLoading || isProjectLoading ? (
        <div className="flex flex-col w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col w-[85vw]  gap-10 p-8 overflow-scroll h-screen bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" text-2xl">Manage collaborators</h1>
              <p className="text-slate-500">
                Invite your team members and manage access.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex gap-2">
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
                                Managers can read, write, and delete documents.
                                They can also invite and remove team members.
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={i}>
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
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="m-0" variant="ghost">
                          Edit
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mr-2">
                        {item?.type == "collaborator" && (
                          <DropdownMenuItem className=" flex gap-2 group cursor-pointer items-center">
                            <KeyRound size={16} color="orange" />
                            <span>Change access level</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClickCapture={() => {
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
                              } else if (item?.accessLevel == "admin") {
                                const count = checkNumberOfAdmins();
                                if (count == 1) {
                                  toast({
                                    variant: "destructive",
                                    title: "Error",
                                    description: "Cannot remove the only admin",
                                  });
                                  return;
                                }
                              }
                              // add remove collaborator function
                            } else {
                              removeInvite({
                                inviteId: item.inviteId,
                                projectId,
                              });
                              queryClient.invalidateQueries({
                                queryKey: [
                                  "get",
                                  "collaborators",
                                  "project",
                                  projectId,
                                ],
                              });
                              toast({
                                title: "Removed",
                                description: "Invite has been successfully removed!",
                              });
                            }
                          }}
                          className=" flex gap-2 group cursor-pointer items-center"
                        >
                          <Trash size={16} color="red" />
                          <span className="group-hover:text-red-500 ">
                            Remove
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function formatAccessLevel(accessLevel: string) {
  if (accessLevel == "admin") {
    return "Admin";
  } else if (accessLevel == "manager") {
    return "Manager";
  } else if (accessLevel == "write") {
    return "Editor";
  } else if (accessLevel == "read") {
    return "Viewer";
  }
}
