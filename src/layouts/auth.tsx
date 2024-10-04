import { getUser } from "@/api/functions/users";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PostHogPageView from "./pageview";
import { usePostHog } from "posthog-js/react";
import { Crisp } from "crisp-sdk-web";

export default function AuthLayout() {
  const { userId, isLoaded } = useAuth();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const posthog = usePostHog();
 
  const { data, isLoading } = useQuery({
    queryKey: ["get", "user"],
    queryFn: async () => {
      const res = await getUser();
      return res;
    },
    enabled: userId != null,
  });

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, navigate, userId, data]);

  React.useEffect(() => {
    if (isLoading) return;

    if (data) {
      setUser(data?.data);
      try {
        Crisp.user.setEmail(data?.data?.email);
        Crisp.user.setNickname(data?.data?.username);
      
      } catch (e) {
        //console.error("CRISP ERROR", e);
      }

      posthog.identify(
        data?.data?.email, //'distinct_id' with your user's unique identifier
        { name: data?.data?.username } // optional: set additional person properties
      );
    }
  }, [data, isLoading, posthog, setUser]);

  if (!isLoaded || isLoading)
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner size="large" />
      </div>
    );

  return (
    <>
      <PostHogPageView />
      <Outlet />
    </>
  );
}
