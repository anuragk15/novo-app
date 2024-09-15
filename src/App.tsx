import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "non.geist";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DashboardHome from "./pages/home/dashboard";

// For Geist Mono
import "non.geist/mono";
import AuthLayout from "./layouts/auth";
import CreateAccountScreen from "./pages/auth/createAccount";
import SignIn from "./pages/auth/signIn";
import SignUpPage from "./pages/auth/signUp";
import DocumentEditorScreen from "./pages/editor/document";
import ProjectsScreen from "./pages/home/projects";
import SettingsOverviewScreen from "./pages/home/settings/overview";
import SourceHome from "./pages/home/source";
import TeamsScreen from "./pages/home/teams";
import TemplatesHome from "./pages/home/template";
import ErrorScreen from "./pages/misc/Error";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: <ProjectsScreen />,
      },
      {
        path: "/create-account",
        element: <CreateAccountScreen />,
      },

      {
        path: "/project/:projectId",
        element: (
          <div>
            <DashboardHome />
          </div>
        ),
      },

      {
        path: "/project/:projectId/sources",
        element: (
          <div>
            <SourceHome />
          </div>
        ),
      },
      {
        path: "/project/:projectId/templates",
        element: (
          <div>
            <TemplatesHome />
          </div>
        ),
      },
      {
        path: "/project/:projectId/team",
        element: (
          <div>
            <TeamsScreen />
          </div>
        ),
      },
      {
        path: "/project/:projectId/settings",
        element: (
          <div>
            <SettingsOverviewScreen />
          </div>
        ),
      },

      {
        path: "/document/editor/:projectId/:id",
        element: (
          <div>
            <DocumentEditorScreen />
          </div>
        ),
      },
    ],
  },

  {
    path: "/sign-in",
    element: (
      <div>
        <SignIn />
      </div>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <div>
        <SignUpPage />
      </div>
    ),
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
