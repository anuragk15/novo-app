import { getProjectById } from "@/api/functions/projects";
import { useQuery } from "@tanstack/react-query";
import { Clock, FileText, Zap } from "lucide-react";
import { useParams } from "react-router-dom";

export function UsageCard() {
  const { projectId } = useParams();
  const { data } = useQuery({
    queryKey: ["get", "project", projectId],
    queryFn: async () => {
      const res = await getProjectById({ projectId });
      return res?.data;
    },
  });

  // Convert minutes to hours and minutes format
  const hours = Math.floor((data?.usage?.timeSavedMinutes || 0) / 60);
  const minutes = (data?.usage?.timeSavedMinutes || 0) % 60;
  const timeDisplay = `${hours}h ${minutes}m`;

  return (
    <div className="rounded-xl w-full p-3 transition-all">
      <div className="mb-6">
        <h3 className="text-xl font-semibold tracking-tight">
          Usage Statistics
        </h3>
        <p className="text-sm text-muted-foreground">
          Track your project metrics
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <div className="group rounded-lg bg-background/50 p-4 transition-all hover:bg-background border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-500/10 p-2.5 transition-all group-hover:bg-blue-500/20">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <p className="font-medium text-muted-foreground">Time Saved</p>
            </div>
            <h3 className="text-xl font-bold tracking-tigh">{timeDisplay}</h3>
          </div>
        </div>

        <div className="group rounded-lg bg-background/50 p-4 transition-all hover:bg-background border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-green-500/10 p-2.5 transition-all group-hover:bg-green-500/20">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
              <p className="font-medium text-muted-foreground">
                Content Generated
              </p>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              {data?.usage?.contentGenerated + data?.usage?.contentAccepted ||
                "0"}
            </h3>
          </div>
        </div>

        <div className="group rounded-lg bg-background/50 p-4 transition-all hover:bg-background border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-purple-500/10 p-2.5 transition-all group-hover:bg-purple-500/20">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
              <p className="font-medium text-muted-foreground">AI Usage</p>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              {data?.usage?.apiCalls?.toLocaleString() || "0"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
