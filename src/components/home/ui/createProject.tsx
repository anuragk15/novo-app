/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
    HobbyWithoutTrial,
    HobbyWithTrial,
    planLimits,
    ProWithoutTrial,
    ProWithTrial,
} from "@/lib/plan";
import { useUser } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateProjectPopup({
  trigger,
  projects,
}: {
  trigger: JSX.Element;
  projects: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="overflow-scroll h-[80vh] md:h-auto  md:min-w-[800px]">
        <CreateProjectUI
          closeDialog={() => setIsOpen(false)}
          withTrial={projects?.length == 0}
        />
      </DialogContent>
    </Dialog>
  );
}

export const CreateProjectUI = ({
  withTrial = false,
  closeDialog,
}: {
  closeDialog?: () => void;
  withTrial: boolean;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const { user } = useUser();
  const handleProjectCreation = ({
    planName,
  }: {
    planName: "hobby" | "pro";
  }) => {
    // Create a new
    if (name.length < 3) {
      toast({
        title: "Enter a longer name",
      });
      return;
    }
    const prjId = uuidv4();
    // console.log(user.emailAddresses[0].emailAddress);
    let url = "";
    if (planName === "hobby") {
      url = withTrial ? HobbyWithTrial : HobbyWithoutTrial;
    } else {
      url = withTrial ? ProWithTrial : ProWithoutTrial;
    }
    if (url == "") {
      return;
    }
    const eml = user.emailAddresses[0].emailAddress;
    //if you do not close the dialog box, the checkout will malfunction
    if (closeDialog) {
      closeDialog();
    }
    //@ts-ignore
    LemonSqueezy.Setup({
      eventHandler: (event) => {
        if (event?.event == "Checkout.Success") {
          queryClient.invalidateQueries({
            queryKey: ["get", "projects"],
          });
        }
      },
    });
    const checkoutUrl = `${url}&checkout[email]=${eml}&checkout[email]=${eml}&checkout[custom][project_id]=${prjId}&checkout[custom][project_name]=${name}&logo=0`;
    //@ts-ignore
    LemonSqueezy.Url.Open(checkoutUrl);

    // console.log(checkoutUrl);
    // window.open(checkoutUrl);
  };

  return (
    <div className=" md:p-5 p-2">
      <div>
        <h1 className="text-3xl">Start a new project</h1>
      </div>
      <div className="py-5">
        <Label className="font-bold">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={90}
          placeholder="Project name..."
        />
      </div>
      <div className="  flex md:flex-row flex-col gap-2 ">
        <div className=" border p-5 flex flex-col justify-between  md:gap-8 rounded-lg shadow-lg border-slate-200">
          <div className="flex justify-between ">
            <div>
              <p className="text-3xl font-sans">Hobby</p>
              <p className="text-slate-500 font-medium">
                Great for individuals & small teams.
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex">
                <p className="text-slate-500 text-xl">$</p>
                <p className=" font-medium text-4xl">
                  {planLimits.hobby.price}
                </p>
              </div>
              <p className="text-slate-500 text-lg">/mo</p>
            </div>
          </div>
          <div>
            <p className="text-2xl">Features</p>
            <div className="space-y-2 py-5">
              {/* <div className="flex gap-2 items-center">
          <div className="p-1 bg-slate-900 rounded-full">
            <Check size={16} className="text-white" />
          </div>

          <p className=" font-medium font-sans">7 days free trial</p>
        </div> */}
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-regular font-sans">
                  {planLimits.hobby.apiCalls} AI-assisted operations
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-regular font-sans">
                  {planLimits.hobby.documentsCreated} documents
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-regular font-sans">
                  {planLimits.hobby.sourcesCreated} knowledge sources
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-regular font-sans">
                  {planLimits.hobby.invitesCreated} seats
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => handleProjectCreation({ planName: "hobby" })}
            variant="outline"
          >
            Continue
          </Button>
        </div>
        <div className=" border p-5 flex flex-col justify-between md:gap-8 rounded-lg shadow-lg border-slate-200">
          <div className="flex justify-between gap-10 ">
            <div>
              <p className="text-3xl font-sans">Pro</p>
              <p className="text-slate-500 font-medium">
                Ideal for growing teams & businesses.
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex">
                <p className="text-slate-500 text-xl">$</p>
                <p className=" font-medium text-4xl">{planLimits.pro.price}</p>
              </div>
              <p className="text-slate-500 text-lg">/mo</p>
            </div>
          </div>
          <div>
            <p className="text-2xl">Features</p>
            <div className="space-y-2 py-5">
              {/* <div className="flex gap-2 items-center">
          <div className="p-1 bg-slate-900 rounded-full">
            <Check size={16} className="text-white" />
          </div>

          <p className=" font-bold font-sans">14 days free trial</p>
        </div> */}
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-medium font-sans">
                  {planLimits.pro.apiCalls} AI-assisted operations
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-medium font-sans">
                  {planLimits.pro.documentsCreated} documents
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-medium font-sans">
                  {planLimits.pro.sourcesCreated} knowledge sources
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-slate-900 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
                <p className=" font-medium font-sans">
                  {planLimits.pro.invitesCreated} seats
                </p>
              </div>
            </div>
          </div>
          <Button onClick={() => handleProjectCreation({ planName: "pro" })}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};