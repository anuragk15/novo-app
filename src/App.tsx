import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardHome from "./pages/home/Dashboard";
import "non.geist";
import { Toaster } from "@/components/ui/toaster";

// For Geist Mono
import "non.geist/mono";
import SourceHome from "./pages/home/Source";
import TemplatesHome from "./pages/home/Templates";
import DocumentEditorScreen from "./pages/editor/document";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <DashboardHome />
      </div>
    ),
  },
  {
    path: "/project/:id/home",
    element: (
      <div>
        <DashboardHome />
      </div>
    ),
  },
  {
    path: "/project/:id/sources",
    element: (
      <div>
        <SourceHome />
      </div>
    ),
  },
  {
    path: "/project/:id/templates",
    element: (
      <div>
        <TemplatesHome />
      </div>
    ),
  },
  {
    path: "/project/:id/team",
    element: (
      <div>
        <TemplatesHome />
      </div>
    ),
  },
  {
    path: "/document/editor/:id",
    element: (
      <div>
        <DocumentEditorScreen />
      </div>
    ),
  },
  
]);
function App() {
  return (
    <>
      <div>
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
