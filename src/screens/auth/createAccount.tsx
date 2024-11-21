import { createUser } from "@/api/functions/users";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccountScreen() {
  const { user, setUser } = useUserStore();
  const navigation = useNavigate();
  const { mutateAsync } = useMutation({
    mutationKey: ["create", "account"],
    async mutationFn() {
      const user = await createUser();
      return user;
    },
  });

  const posthog = usePostHog();
  useEffect(() => {
    if (user) {
      navigation("/projects?onboarding=true");
      return;
    } else {
      mutateAsync().then((user) => {
        posthog.capture("user_signed_up");
        setUser(user?.data);
        navigation(`/project/${user?.projectId}/onboarding`);
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Spinner size="large" />
      <h1 className=" text-2xl text-center">Creating your account...</h1>
    </div>
  );
}
