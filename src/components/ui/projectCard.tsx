import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateColorsFromInitial } from "@/lib/utils";
import { EllipsisVertical, FolderClosed } from "lucide-react";

export default function ProjectCard({
  name,
  id,
  createdOn,
}: {
  name: string;
  id: string;
  createdOn: Date;
}) {
  const { background, text } = generateColorsFromInitial(name);
  return (
    <a
      href={"/project/" + id}
      className="group hover:shadow-sm  py-4 px-4 bg-white flex flex-col gap-4 rounded-lg hover:bg-slate-50 cursor-pointer border min-w-[20vw]"
    >
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
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Team</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 cursor-pointer focus:bg-red-200 focus:text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-xl font-sans">{name}</p>
      <div className="flex gap-2 border-t pt-2 justify-between items-center">
        <div className=" ">
          <div className="text-xs text-gray-500">Role</div>

          <div className="text-xs font-sans">Admin</div>
        </div>

        <div className=" ">
          <div className="text-xs text-gray-500 text-right">Created on</div>

          <div className="text-xs font-sans">{createdOn.toDateString()}</div>
        </div>
      </div>
    </a>
  );
}
