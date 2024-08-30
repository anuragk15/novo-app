import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Folder } from "lucide-react";
import React from "react";

export default function NewFolderItem() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="font-sans flex gap-3">
          <Folder size={14} />
          New folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new folder</DialogTitle>
          <DialogDescription className="space-y-2 flex flex-col justify-between min-h-[10vw] pt-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                className=" focus-visible:ring-1 focus-visible:ring-offset-1"
                placeholder="Tour blogs"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={()=>{
                setOpen(false)
              }}>Create</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
