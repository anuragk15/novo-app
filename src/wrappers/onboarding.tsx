import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const OnboardingWrapper = ({
  children,
  component,
  showCloseButton = true,
}: {
  children: React.ReactNode;
  component: JSX.Element;
  showCloseButton?: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [showOnboarding, setShowOnboarding] = useState(false);
  // Get specific query parameters

  const param1 = searchParams.get("onboarding");

  useEffect(() => {
    // Do something when the query params change
    if (param1 === "true") {
      setShowOnboarding(true);
    }

    // You can also trigger actions like API calls or updates based on params here
  }, [param1]);

  // Update query params (for example, via a button click)

  function closeDialog() {
    setSearchParams({ onboarding: "false" });
    setShowOnboarding(false);
  }

  return (
    <div>
      <Dialog
        open={showOnboarding}
        onOpenChange={(e) => {
          if (!e) {
            closeDialog();
          }
        }}
      >
        <DialogContent className="sm:max-w-[525px] p-0 m-0">
          {component}
          <DialogFooter>
            {showCloseButton ? (
              <DialogClose asChild>
                <Button
                  onClick={closeDialog}
                  type="button"
                  className="m-2"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </div>
  );
};

export default OnboardingWrapper;
