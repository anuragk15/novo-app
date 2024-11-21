import { connectNotion } from "@/api/functions/notion";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ConnectNotionSreen() {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const queryClient = useQueryClient();
  const [showError, setShowError] = useState(false);
  const { mutateAsync } = useMutation({
    mutationKey: ["connect-notion"],
    mutationFn: connectNotion,
    onSuccess: () => {
      setShowError(false);
      queryClient
        .invalidateQueries({
          queryKey: ["get", "projects", state],
        })
        .then(() => {
          window.close();
        });
    },
    onError: () => {
      setShowError(true);
    },
  });
  useEffect(() => {
    if (code) {
      mutateAsync({ code, projectId: state });
    }
  }, [code, state, queryClient, mutateAsync]);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center gap-4">
        {showError ? (
          <>
            <div>Failed to connect to Notion</div>
            <div
              className="text-blue-500 cursor-pointer"
              onClick={() => window.close()}
            >
              Close this page
            </div>
          </>
        ) : (
          <>
            <Spinner />
            <div>Connecting to Notion...</div>
          </>
        )}
      </div>
    </div>
  );
}
