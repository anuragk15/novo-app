import { capitalizeFirstCharacter, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function SettingsBilling({ data }) {
  return (
    <div className="flex justify-center flex-col w-[85vw]  pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[98vh]  bg-white">
        <div className="flex justify-between w-full items-center">
          <div className=" flex w-full items-center gap-2 justify-between">
            <h2 className="text-2xl">Billing info</h2>
            <div
              className={cn(
                "p-2 bg-red-100 rounded-xl",
                data?.project?.billing?.state == "active" && "bg-green-100"
              )}
            >
              <p
                className={cn(
                  "text-red-700",
                  data?.project?.billing?.state == "active" && "text-green-700"
                )}
              >
                {capitalizeFirstCharacter(data?.project?.billing?.state)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full space-y-4">
          <p className="text-lg">
            <b>Plan:</b> {data?.project?.billing?.display}
          </p>
      
          {data?.project?.billing?.nextDisplayEmailEnhancementsWithTime && (
            <p>
              <b>Renews at:</b>{" "}
              {new Date(data?.project?.billing?.nextDisplayEmailEnhancementsWithTime).toLocaleString()}
            </p>
          )}
          <Separator />
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
      </div>
    </div>
  );
}
