// app/pageview.js
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PostHogPageView() {
  const location = useLocation();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
      });
    }
  }, [location, posthog]);

  return null;
}
