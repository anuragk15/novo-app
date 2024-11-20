import { daysBetweenDates } from "@/lib/utils";
import { Clipboard } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import { updateProject } from "@/api/functions/projects";

export default function SettingsOverview({ data }) {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState(data?.project?.name);
  const endDate = data?.usage?.endDate
    ? new Date(data?.usage?.endDate)
    : new Date();
  async function updateName() {
    if (projectName == data?.project?.name) return;
    if (projectName == "") {
      toast({
        title: "Project name cannot be empty",
        description: "Please enter a valid project name",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Updating project name",
      description: "Please wait while we update project name",
    });
    await updateProject({
      projectId: data.project.id,
      name: projectName,
    }).then((r) => {
      //console.log(r);
      if (r?.data) {
        toast({
          title: "Project name updated",
          description: "Project name updated successfully",
        });
      } else {
        toast({
          title: "Failed to update project name",
          description: "Failed to update project name",
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="flex justify-center flex-col w-[85vw]  pl-2 pb-2 overflow-scroll min-h-screen bg-slate-100">
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[98vh] h-full  bg-white">
        <div className="flex justify-between w-full items-center">
          <div className=" flex items-center gap-2">
            <h2 className="text-2xl">Project info</h2>
          </div>
        </div>
        {data?.project ? (
          <div className="w-full space-y-4 h-full">
            <div className="flex flex-col gap-4 max-w-fit ">
              <div className="flex flex-col gap-2">
                <label className="text-slate-500">Project name</label>
                <Input
                  placeholder="Internal docs"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="text-lg p-2 bg-slate-100  border rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-500">Project ID</label>
                <p className="text-md p-2 flex items-center text-slate-600 bg-slate-100 border rounded-lg">
                  {data.project.id}
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(data.project.id);
                      toast({
                        title: "Copied to clipboard",
                        description: "Project ID copied to clipboard",
                      });
                    }}
                    className="px-4 cursor-pointer"
                  >
                    <Clipboard className=" text-slate-600" size={16} />
                  </div>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-500 ">Created at</label>
                <p className="text-md p-2 bg-slate-100 text-slate-600 border rounded-lg">
                  {new Date(data.project.createdAt).toDateString()} at{" "}
                  {new Date(data.project.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="">
                <Button
                  onClick={updateName}
                  disabled={projectName == data?.project?.name}
                  variant="outline"
                >
                  Update
                </Button>
              </div>
            </div>
            <Separator />
            {data?.usage == null ? (
              <div>
                No plans seem to be active right now. Contact team admin to buy
                a plan!
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between ">
                  <h1 className="text-2xl">Usage</h1>
                  <h1 className=" font-medium text-sm border p-2 rounded-lg">
                    Plan ends in {daysBetweenDates(endDate, new Date())} day(s)
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500">Total AI usage</label>
                    <p>{data?.usage?.apiCalls}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500">
                      Total sources (
                      {(
                        (data?.usage?.sourcesCreated /
                          data?.usage?.maxSources) *
                        100
                      ).toFixed(1)}
                      %)
                    </label>
                    <p>
                      {data?.usage?.sourcesCreated}/{data?.usage?.maxSources}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500">
                      Content generation (
                      {(
                        ((data?.usage?.contentGenerated +
                          data?.usage?.contentAccepted) /
                          data?.usage?.maxContentGeneration) *
                        100
                      ).toFixed(1)}
                      %)
                    </label>
                    <p>
                      {data?.usage?.contentGenerated +
                        data?.usage?.contentAccepted}
                      /{data?.usage?.maxContentGeneration}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500">
                      Total documents (
                      {(
                        (data?.usage?.documentsCreated /
                          data?.usage?.maxDocuments) *
                        100
                      ).toFixed(1)}
                      %)
                    </label>
                    <p>
                      {data?.usage?.documentsCreated}/
                      {data?.usage?.maxDocuments}
                    </p>
                  </div>
                  <div>
                    <label className="text-slate-500">
                      Total collaborators (
                      {(
                        (data?.usage?.invitesCreated /
                          data?.usage?.maxInvites) *
                        100
                      ).toFixed(1)}
                      %)
                    </label>
                    <p>
                      {data?.usage?.invitesCreated}/{data?.usage?.maxInvites}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[70vh] w-full flex-col  justify-center items-center ">
            <img
              src={"/EmptyState.svg"}
              style={{
                width: "15rem",
                height: "15rem",
              }}
            />
            <p className=" text-center font-sans text-2xl">No project found</p>
          </div>
        )}
      </div>
    </div>
  );
}
