import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init("phc_IYG4cqZDkCi7RlkfoHtKULI0NbZZs9GIrLTggqjdlW2", {
    api_host: import.meta.env.REACT_APP_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
  });
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
