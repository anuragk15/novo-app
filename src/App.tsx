import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardHome from "./pages/home/Dashboard";
import "non.geist";
import { Toaster } from "@/components/ui/toaster";

// For Geist Mono
import "non.geist/mono";
import SourceHome from "./pages/home/Source";
import TemplatesHome from "./pages/home/Templates";

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
    path: "about",
    element: <div>About</div>,
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
