import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function SearchBar() {
  return (
    <div className="flex justify-between gap-2 py-2 pr-2 items-center">
      <div className="flex border shadow-sm w-full items-center bg-white px-2 rounded-lg">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-90" />
        <Input
          placeholder="Search documents..."
          className={cn(
            "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
          )}
        />
      </div>
      <Button className=" font-mono">Start typing...</Button>
    </div>
  );
}
