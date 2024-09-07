import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

export default function AuthLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  ////console.log('test', userId)

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  if (!isLoaded)
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner size="large" />
      </div>
    );

  return <Outlet />;
}
