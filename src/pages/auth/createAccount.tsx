import { createUser } from "@/api/functions/users";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccountScreen() {
  const { user, setUser } = useUserStore();
  const navigation = useNavigate();
  const { mutateAsync, error } = useMutation({
    mutationKey: ["create", "account"],
    async mutationFn() {
      const user = await createUser();
      return user.data;
    },
  });

  useEffect(() => {
    if (user) {
      navigation("/");
      return;
    } else {
      mutateAsync().then((user) => {
        setUser(user);
        navigation("/onboarding=true");
      });
    }
  }, [error]);

  if (error) {
    navigation("/load-account");
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <Spinner size="large" />
    </div>
  );
}
