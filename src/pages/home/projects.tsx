import { getProjects } from "@/api/functions/projects";
import AcceptInviteUI from "@/components/home/ui/acceptInvite";
import CreateProjectPopup from "@/components/home/ui/createProject";
import { OnboardingOverviewContent } from "@/components/onboarding/overview";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingState from "@/components/ui/loadingState";
import ProjectCard from "@/components/ui/projectCard";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import OnboardingWrapper from "@/wrappers/onboarding";
import { useClerk } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb, LogOut, Plus, Search, User, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProjectsScreen() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["get", "projects"],
    queryFn: async () => {
      const res = await getProjects();
      // const res = await getProjects();
      return res?.data;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.length > 0) {
      if (name == "") {
        setProjects(data);
        return;
      } else {
        const filtered = data.filter((project) => {
          return project.projects.name
            .toLowerCase()
            .includes(name.toLowerCase());
        });
        setProjects(filtered);
      }
    }
  }, [name, data]);
  useEffect(() => {
    if (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  }, [error, projects, isLoading]);
  //console.log(projects);
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <OnboardingWrapper
      component={<OnboardingOverviewContent />}
      showCloseButton={false}
    >
      <div className="bg-slate-50 min-h-screen ">
        <div className=" space-y-10">
          <div className="bg-white shadow-sm py-2 border-b">
            <div className=" max-w-[1280px] mx-auto">
              <Navbar name={name} setName={setName} />
            </div>
          </div>
          <div className=" px-5 md:px-10 space-y-4 max-w-[1280px] mx-auto">
            <AcceptInviteUI />
          </div>
          <div className=" px-5 md:px-10 space-y-4 max-w-[1280px] mx-auto">
            <div className=" flex sm:flex-row flex-col-reverse  items-center justify-between">
              <h2 className="text-2xl font-sans">Your projects</h2>
              {projects?.length != 0 && (
                <CreateProjectPopup
                  projects={projects}
                  trigger={
                    <Button className="flex gap-1">
                      <Plus size={18} />
                      <p>New project</p>
                    </Button>
                  }
                />
              )}
            </div>
            <div className="flex justify-center md:justify-start flex-wrap gap-4 w-full">
              {projects &&
                projects?.length > 0 &&
                projects.map((project) => (
                  <ProjectCard
                    key={project?.projects?.id}
                    role={
                      project?.collaborators?.accessLevel == "admin"
                        ? "Admin"
                        : project?.collaborators?.accessLevel == "manager"
                        ? "Manager"
                        : project?.collaborators?.accessLevel == "read"
                        ? "Viewer"
                        : "Editor"
                    }
                    name={project?.projects?.name}
                    id={project?.projects?.id}
                    createdOn={new Date(project?.projects?.createdAt)}
                  />
                ))}
              {/* <ProjectCard name="Project 1" id="1" createdOn={new Date()} />
              <ProjectCard name="Anurag" id="2" createdOn={new Date()} /> */}
              {/* <div className="group  py-4 px-4 bg-white flex flex-col justify-center items-center gap-4 rounded-lg hover:bg-slate-100 cursor-pointer border min-w-[20vw]">
                <div className=" p-4 border group-hover:border-black rounded-full border-dashed">
                  <Plus className=" text-slate-500 group-hover:text-black" />
                </div>
              </div> */}
            </div>
            {projects?.length == 0 && (
              <div className="flex h-full  min-h-[60vh] justify-center items-center ">
                <CreateProjectPopup
                  projects={projects}
                  trigger={
                    <div className=" space-y-4 border cursor-pointer p-20 group justify-center flex flex-col items-center hover:border-black rounded-xl border-dashed">
                      <Plus
                        size={64}
                        className=" text-slate-700 group-hover:text-black"
                      />
                      <h1 className=" text-2xl font-sans">
                        Create your first project
                      </h1>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </OnboardingWrapper>
  );
}

const Navbar = ({ name, setName }) => {
  const { signOut } = useClerk();
  const { user } = useUserStore();
  const [showDialog, setShowDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <div>
            <div className="flex justify-between">
              <div className="space-y-4">
                <h1 className="text-2xl">Profile</h1>
                <div>
                  <Label className="text-md text-slate-500">User name</Label>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(user.username);
                      toast({
                        title: "Username copied",
                        description: "Username copied to clipboard",
                      });
                    }}
                    className=" border p-2 rounded-lg bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    {user.username}
                  </div>
                </div>
                <div>
                  <Label className="text-md text-slate-500">Email</Label>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(user.email);
                      toast({
                        title: "Email copied",
                        description: "Email copied to clipboard",
                      });
                    }}
                    className=" cursor-pointer  border p-2 rounded-lg bg-slate-100 text-slate-700"
                  >
                    {user.email}
                  </div>
                </div>
              </div>
              <div>
                <img className="rounded-full" src={user.photo} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="py-2 px-2 flex justify-between items-center">
        <h1
          className="text-3xl"
          style={{
            fontFamily: "Pacifico",
          }}
        >
          Novo
        </h1>
        <div className="flex gap-5 items-center">
          <div className=" flex gap-2 px-2 items-center bg-slate-100 rounded-xl">
            <Search color="gray" />
            <Input
              name={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search projects..."
              className={cn(
                "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
              )}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user?.photo ? (
                <img
                  src={user?.photo}
                  className="w-10 rounded-full"
                  alt="User profile"
                />
              ) : (
                <User size={20} />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" mr-2">
              <DropdownMenuItem
                onClick={() => {
                  setSearchParams({ onboarding: "true" });
                }}
                className="cursor-pointer flex items-center gap-2"
              >
                <Lightbulb size={14} />
                <p>Quick intro</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDialog(true)}
                className="cursor-pointer flex items-center gap-2"
              >
                <User2 size={14} />
                <p>Profile</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut({ redirectUrl: "/sign-in" })}
                className="cursor-pointer flex items-center gap-2"
              >
                <LogOut size={14} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
