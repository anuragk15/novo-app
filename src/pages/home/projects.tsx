import ProjectCard from "@/components/ui/projectCard";
import { LogOut, Plus, Search, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ProjectsScreen() {
  return (
    <div className="bg-slate-50 min-h-screen ">
      <div className=" space-y-10">
        <div className="bg-white shadow-sm py-2 border-b">
          <div className=" max-w-[1280px] mx-auto">
            <Navbar />
          </div>
        </div>

        <div className="space-y-4 max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-sans">Your projects</h2>
          <div className="flex gap-4 ">
            <ProjectCard name="Project 1" id="1" createdOn={new Date()} />
            <ProjectCard name="Anurag" id="2" createdOn={new Date()} />
            <div className="group  py-4 px-4 bg-white flex flex-col justify-center items-center gap-4 rounded-lg hover:bg-slate-100 cursor-pointer border min-w-[20vw]">
              <div className=" p-4 border group-hover:border-black rounded-full border-dashed">
                <Plus className=" text-slate-500 group-hover:text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
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
          <Search color="gray"/>
          <Input
            placeholder="Search projects..."
            className={cn(
              "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
            )}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src="https://ui.shadcn.com/avatars/01.png"
              className="w-12  rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" mr-2">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <Settings size={14} />
              <p>Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <LogOut size={14} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
