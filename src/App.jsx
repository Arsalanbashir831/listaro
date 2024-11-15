import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./pages/Authentication";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Home from "./pages/Dashboard/Home";
import NotFound from "./pages/NotFound";
import KeywordOptimization from "./pages/Dashboard/KeywordOptimization";
import ImageOptimization from "./pages/Dashboard/ImageOptimization";

const App = () => {
  const router = createBrowserRouter([
    { path: "/auth", element: <Authentication /> },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/dashboard", element: <Home /> },
        {path:'/dashboard/keyword-optimization', element: <KeywordOptimization/>},
        {path:'/dashboard/image-optimization', element: <ImageOptimization/>},
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
