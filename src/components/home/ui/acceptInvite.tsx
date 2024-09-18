import { getInvites, respondInvite } from "@/api/functions/projects";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MailPlus, PartyPopper } from "lucide-react";

export default function AcceptInviteUI() {
  const { toast } = useToast();
  const { data: invites, isLoading } = useQuery({
    queryKey: ["get", "invites"],
    queryFn: async () => {
      const res = await getInvites();
      // const res = await getProjects();
      return res?.data;
    },
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();
  const { mutateAsync: respondToInvite } = useMutation({
    mutationKey: ["respond", "invite"],
    mutationFn: async ({
      inviteId,
      accepted,
    }: {
      inviteId: string;
      accepted: boolean;
    }) => await respondInvite({ inviteId, accepted }),
  });
  async function handleResponse(inviteId: string, response: boolean) {
    await respondToInvite({ inviteId, accepted: response });
    if (response) {
      toast({
        title: "🥳 Congrats!",
        description: "You have joined the project",
      });
    } else {
      toast({
        title: "Declined",
        description: "You have declined the invitation",
      });
    }
    queryClient.invalidateQueries({ queryKey: ["get", "invites"] });
    queryClient.invalidateQueries({ queryKey: ["get", "projects"] });
  }

  if (!isLoading) {
    return invites && invites.length > 0 ? (
      <div>
        {invites.map((invite) => (
          <div className="bg-slate-50 border p-5 rounded-xl">
            <div className=" flex gap-2 items-center">
              <MailPlus size={22} />
              <p className="text-xl">
                <span className=" font-semibold">{invite.username}</span> has
                invited you to join the project:
                <span className=" font-semibold">
                  {" " + invite.projectName}
                </span>
              </p>
            </div>
            <div className=" flex gap-2 justify-end">
              <Button
                onClick={() => {
                  handleResponse(invite.inviteId, false);
                }}
                variant="ghost"
              >
                Decline
              </Button>
              <Button
                onClick={() => {
                  handleResponse(invite.inviteId, true);
                }}
                className="flex items-center gap-2"
              >
                <p>Join team</p> <PartyPopper />
              </Button>
            </div>
          </div>
        ))}
      </div>
    ) : null;
  } else {
    return null;
  }
}
