import { getProjectById } from "@/api/functions/projects";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { disconnectNotion } from "@/api/functions/notion";
import SettingsSidebar from "@/components/settings/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { URLs } from "@/api/URLs";

export default function IntegrationsScreen() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [integrationToDelete, setIntegrationToDelete] = useState<string | null>(
    null
  );
  // Mock integration status - replace with actual API call
  const { data, isLoading } = useQuery({
    queryKey: ["get", "project", projectId],
    queryFn: async () => await getProjectById({ projectId }),
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: disconnectNotion,
    onSuccess: () => {
      toast({
        title: "Integration removed",
        description: `Notion has been disconnected`,
      });
      queryClient.invalidateQueries({
        queryKey: ["get", "project", projectId],
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to disconnect integration",
        variant: "destructive",
      });
    },
  });

  const handleConnect = async (integration: string) => {
    try {
      if (integration === "Notion") {
        if (import.meta.env.PROD) {
          window.open(
            `${URLs.NOTION_PROD_AUTH_URL}&state=${projectId}`,
            "_blank"
          );
        } else {
          window.open(`${URLs.NOTION_DEV_AUTH_URL}&state=${projectId}`, "_blank");
        }
        toast({
          title: "Connecting to " + integration,
          description: "Please wait while we connect your account...",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to connect integration",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (integration: string) => {
    setIntegrationToDelete(integration);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!integrationToDelete) return;

    await mutateAsync({ projectId });
    setIsDeleteDialogOpen(false);
    setIntegrationToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-slate-100">
        <SettingsSidebar projectId={projectId} />

        <div className="flex flex-col gap-8 p-8 bg-white w-full md:w-[85vw] m-2 border rounded-lg shadow-md">
          <div>
            <h1 className="text-2xl font-semibold">Integrations</h1>
            <p className="text-slate-500">Connect your favorite tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Notion Integration */}
            <div className="flex flex-col items-center p-6 border rounded-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                alt="Notion"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-medium text-lg mb-2">Notion</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                {data?.data?.project?.notion
                  ? "Connected"
                  : "Import your Notion pages"}
              </p>
              <div className="mt-auto">
                {data?.data?.project?.notion ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick("Notion")}
                    disabled={isPending}
                    className="hover:bg-red-500 hover:text-white"
                  >
                    {isPending ? <Spinner /> : <Trash2 className="w-4 h-4" />}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnect("Notion")}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>

            {/* Google Docs Integration */}
            <div className="flex flex-col items-center p-6 border rounded-lg bg-slate-50">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg"
                alt="Google Docs"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-medium text-lg mb-2">Google Docs</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                Connect to Google Docs
              </p>
              <div className="mt-auto">
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>

            {/* WordPress Integration */}
            <div className="flex flex-col items-center p-6 border rounded-lg bg-slate-50">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg"
                alt="WordPress"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-medium text-lg mb-2">WordPress</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                Connect to WordPress
              </p>
              <div className="mt-auto">
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
            {/* Ghost CMS Integration */}
            <div className="flex flex-col items-center p-6 border rounded-lg bg-slate-50">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Ghost-Logo.svg/1024px-Ghost-Logo.svg.png"
                alt="Ghost CMS"
                className="w-40 h-16 mb-4"
              />
              <h3 className="font-medium text-lg mb-2">Ghost CMS</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                Connect to Ghost CMS
              </p>
              <div className="mt-auto">
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>

            {/* Confluence Integration */}
            <div className="flex flex-col items-center p-6 border rounded-lg bg-slate-50">
              <svg
                fill="none"
                height="32"
                viewBox="0 0 32 32"
                focusable="false"
                aria-hidden="true"
                className="w-16 h-16 mb-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#357DE8"
                  d="M27.545 24.378 16.96 3.208c-.208-.458-.417-.541-.667-.541-.208 0-.458.083-.708.5-1.5 2.375-2.167 5.125-2.167 8 0 4.001 2.042 7.752 5.042 13.795.334.666.584.791 1.167.791h7.335c.541 0 .833-.208.833-.625 0-.208-.042-.333-.25-.75M12.168 14.377c-.834-1.25-1.084-1.334-1.292-1.334s-.333.083-.708.834L4.875 24.46c-.167.334-.208.459-.208.625 0 .334.291.667.916.667h7.46c.5 0 .875-.416 1.083-1.208.25-1 .334-1.876.334-2.917 0-2.917-1.292-5.751-2.292-7.251"
                ></path>
              </svg>
              <h3 className="font-medium text-lg mb-2">Confluence</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                Connect to Confluence
              </p>
              <div className="mt-auto">
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Integration</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disconnect {integrationToDelete}? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button className="border-none" variant="ghost">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="hover:bg-red-500 border border-red-500 hover:text-white bg-white text-red-500"
            >
              {isPending ? <Spinner className="w-4 h-4" /> : "Disconnect"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
