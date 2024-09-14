import { getProjectCollaborators } from "@/api/functions/projects";
import Sidebar from "@/components/home/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { KeyRound, Trash } from "lucide-react";
import { useParams } from "react-router-dom";

export default function TeamsScreen() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "sources"],
    queryFn: async () => {
      const res = await getProjectCollaborators({ projectId });
      return res?.data;
    },
  });


  return (
    <div className="flex  bg-slate-100">
      <Sidebar projectId={projectId} />
      {isLoading ? (
        <div className="flex flex-col w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col w-[85vw]  gap-10 p-8 overflow-scroll h-screen bg-white">
          <div className="">
            <h1 className=" text-2xl">Manage collaborators</h1>
            <p className="text-slate-500">
              Invite your team members and manage access.
            </p>
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
                        <Button className="m-0" variant="ghost">Edit</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mr-2">
                        <DropdownMenuItem className=" flex gap-2 group cursor-pointer items-center">
                          <KeyRound size={16} color="orange" />
                          <span>Change access level</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className=" flex gap-2 group cursor-pointer items-center">
                          <Trash size={16} color="red" />
                          <span className="group-hover:text-red-500 ">
                            Remove access
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
