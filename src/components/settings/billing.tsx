import { cn } from "@/lib/utils";
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
                data?.project?.billing?.status == "active" && "bg-green-100"
              )}
            >
              <p
                className={cn(
                  "text-red-700",
                  data?.project?.billing?.status == "active" && "text-green-700"
                )}
              >
                {data?.project?.billing?.status_formatted}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full space-y-4">
          <p className="text-lg">
            <b>Plan:</b> {data?.project?.billing?.product_name}
          </p>
          {data?.project?.billing?.renews_at && (
            <p className="text-lg">
              <b>Renews at:</b>{" "}
              {new Date(data?.project?.billing?.renews_at).toLocaleString()}
            </p>
          )}
          {data?.project?.billing?.ends_at && (
            <p>
              <b>Renews at:</b>{" "}
              {new Date(data?.project?.billing?.ends_at).toLocaleString()}
            </p>
          )}
          <Separator />
          <div className=" text-2xl">Actions</div>
          <div className=" flex gap-4 flex-wrap">
            {data?.project?.billing?.urls && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      data?.project?.billing?.urls?.customer_portal,
                      "_blank"
                    );
                  }}
                >
                  Customer portal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      data?.project?.billing?.urls
                        ?.customer_portal_update_subscription,
                      "_blank"
                    );
                  }}
                >
                  Update subscription
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      data?.project?.billing?.urls?.update_payment_method,
                      "_blank"
                    );
                  }}
                >
                  Change payment method
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
