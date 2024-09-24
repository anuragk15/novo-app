import { getUser } from "@/api/functions/users";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PostHogPageView from "./pageview";

export default function AuthLayout() {
  const { userId, isLoaded } = useAuth();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  ////console.log('test', userId)

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
    // console.log(data);
    if (data) {
      setUser(data?.data);
    }
  }, [data, isLoading, setUser]);

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
