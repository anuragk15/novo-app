/* eslint-disable @typescript-eslint/ban-ts-comment */
import { capitalizeFirstCharacter, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Check } from "lucide-react";
import { planLimits } from "@/lib/plan";
import { useUser } from "@clerk/clerk-react";
import { usePostHog } from "posthog-js/react";

export default function SettingsBilling({ data, projectId }) {
  const { user } = useUser();
  const postHog = usePostHog();

  const handleProjectCreation = ({
    planName,
  }: {
    planName: "hobby" | "pro";
  }) => {
    const eml = user.emailAddresses[0].emailAddress;
    //@ts-ignore
    fastspring.builder.recognize({
      email: eml,
    });
    //@ts-ignore
    fastspring.builder.tag({
      projectId: projectId,
      projectName: data?.project?.name,
    });

    //@ts-ignore
    fastspring.builder.add(planName);

    postHog.capture("payment_initiated", { existingPlan: "FREE" });
    //@ts-ignore
    fastspring.builder.checkout();
  };
  return (
    <div className="flex justify-center flex-col w-[85vw]  pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[98vh]  bg-white">
        <div className="flex justify-between w-full items-center">
          <div className=" flex w-full items-center gap-2 justify-between">
            <h2 className="text-2xl">Billing info for {data?.project?.name}</h2>
            {data?.project?.billing?.state ? (
              <div
                className={cn(
                  "p-2 bg-red-100 rounded-xl",
                  data?.project?.billing?.state == "active" && "bg-green-100"
                )}
              >
                <p
                  className={cn(
                    "text-red-700",
                    data?.project?.billing?.state == "active" &&
                      "text-green-700"
                  )}
                >
                  {capitalizeFirstCharacter(data?.project?.billing?.state)}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full space-y-4">
          <p className="text-lg">
            <b>Plan:</b> {data?.project?.billing?.display || "FREE"}
          </p>

          {data?.project?.billing?.nextDisplayEmailEnhancementsWithTime && (
            <p>
              <b>Renews at:</b>{" "}
              {new Date(
                data?.project?.billing?.nextDisplayEmailEnhancementsWithTime
              ).toLocaleString()}
            </p>
          )}
          <Separator />
          {data?.portalLink ? (
            <div>
              <div className=" text-2xl">Actions</div>
              <div className=" flex gap-4 flex-wrap">
                {data?.portalLink && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.open(data?.portalLink, "_blank");
                      }}
                    >
                      Customer portal
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full ">
              <div className=" text-2xl">Upgrade plan</div>
              <div className="  flex  my-10 justify-between max-w-5xl mx-auto md:flex-row flex-col gap-2 ">
                <div className=" border p-5 flex-1 flex flex-col justify-between  md:gap-8 rounded-lg shadow-lg border-slate-200">
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
                      <div className="flex gap-2 items-center">
                        <div className="p-1 bg-slate-900 rounded-full">
                          <Check size={16} className="text-white" />
                        </div>
                        <p className=" font-medium font-sans">
                          100+ content ideas
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="p-1 bg-slate-900 rounded-full">
                          <Check size={16} className="text-white" />
                        </div>
                        <p className=" font-regular font-sans">
                          {planLimits.hobby.contentGeneration} content
                          generation
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
                <div className=" border p-5 flex-1 flex flex-col justify-between md:gap-8 rounded-lg shadow-lg border-slate-200">
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
                        <p className=" font-medium text-4xl">
                          {planLimits.pro.price}
                        </p>
                      </div>
                      <p className="text-slate-500 text-lg">/mo</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl">Features</p>
                    <div className="space-y-2 py-5">
                      <div className="flex gap-2 items-center">
                        <div className="p-1 bg-slate-900 rounded-full">
                          <Check size={16} className="text-white" />
                        </div>
                        <p className=" font-medium font-sans">
                          100+ content ideas
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="p-1 bg-slate-900 rounded-full">
                          <Check size={16} className="text-white" />
                        </div>
                        <p className=" font-medium font-sans">
                          {planLimits.pro.contentGeneration} content generation
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
                          {planLimits.pro.sourcesCreated} training documents
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
                  <Button
                    onClick={() => handleProjectCreation({ planName: "pro" })}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
