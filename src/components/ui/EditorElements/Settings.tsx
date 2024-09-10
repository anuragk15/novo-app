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
import { Label } from "@/components/ui/label";
import { ClipboardCopy, Settings } from "lucide-react";
import { useToast } from "../use-toast";

export function SettingsPopup() {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings size={20} />
      </DialogTrigger>
      <DialogContent className="md:max-w-[50vw] flex flex-col justify-between min-h-[70vh]">
        <div className="space-y-2">
          <DialogHeader>
            <DialogTitle>Edit document</DialogTitle>
            <DialogDescription>
              Make changes to your document here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name" className="text-right">
              Document name
            </Label>
            <Input
              id="name"
              placeholder="Tap to Pay Documentation"
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="Tap to Pay Documentation"
              className="col-span-3"
            />
          </div>
          <div className="flex gap-2 justify-between  items-center">
            <Label htmlFor="share-url" className="text-right">
              Share URL
            </Label>
            <Button
              onClick={() => {
                navigator.clipboard.writeText("https://tap-to-pay.vercel.app/");
                toast({
                  title: "Copied to clipboard",
                  description:
                    "The share URL has been copied to your clipboard",
                });
              }}
              variant="outline"
              className=" flex gap-2"
            >
              Copy
              <ClipboardCopy size={18} />
            </Button>
          </div>
        </div>
        <div className=" flex justify-between ">
          <Button variant='ghost' className="hover:bg-red-100 hover:text-red-500 text-red-600" >Delete</Button>
          <Button type="submit">Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
