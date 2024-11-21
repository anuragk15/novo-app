/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { planLimits } from "@/lib/plan";
import { useUser } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateProjectPopup({
  trigger,
}: {
  trigger: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const postHog = usePostHog();
  useEffect(() => {
    if (isOpen) {
      postHog.capture("project_creation_popup_opened");
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="overflow-scroll h-[80vh] md:h-auto  md:min-w-[800px]">
        <CreateProjectUI closeDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export const CreateProjectUI = ({
  closeDialog,
}: {
  closeDialog?: () => void;
}) => {
  const queryClient = useQueryClient();
  const postHog = usePostHog();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const { user } = useUser();

  useEffect(() => {
    // Define the function globally

    //@ts-ignore
    window.dataPopupClosed = function () {
      queryClient.invalidateQueries({
        queryKey: ["get", "projects"],
      });
    };
  }, []);
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
    } else {
      postHog.capture("project_name_added");
    }

    const prjId = uuidv4();

    if (closeDialog) {
      closeDialog();
    }
    const eml = user.emailAddresses[0].emailAddress;
    //@ts-ignore
    fastspring.builder.recognize({
      email: eml,
    });
    //@ts-ignore
    fastspring.builder.tag({
      projectId: prjId,
      projectName: name,
    });

    //@ts-ignore
    fastspring.builder.add(planName);

    postHog.capture("payment_initiated");
    //@ts-ignore
    fastspring.builder.checkout();
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
        <div className=" flex-1 border p-5 flex flex-col justify-between  md:gap-8 rounded-lg shadow-lg border-slate-200">
          <div className="flex justify-between ">
            <div>
              <p className="text-3xl font-sans">Hobby</p>
              <p className="text-slate-500 font-medium">
                Great for professionals.
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
                  {planLimits.hobby.contentGeneration} content generation
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
                  {planLimits.hobby.sourcesCreated} training documents
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
        <div className=" flex-1 border p-5 flex flex-col justify-between md:gap-8 rounded-lg shadow-lg border-slate-200">
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
