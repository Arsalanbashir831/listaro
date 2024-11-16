import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Dashboard/Home";
import NotFound from "./pages/NotFound";
import KeywordOptimization from "./pages/Dashboard/KeywordOptimization";
import ImageOptimization from "./pages/Dashboard/ImageOptimization";
import DashboardLayout from "./pages/Layouts/DashboardLayout";
import AddListingLayout from "./pages/Layouts/AddListingLayout";
import Profile from "./pages/Dashboard/Profile";
import ProfileSettings from "./pages/Dashboard/ProfileSettings";
import UserSubscription from "./pages/Dashboard/UserSubscription";

const App = () => {
  const router = createBrowserRouter([
    { path: "/auth", element: <Authentication /> },
    { path: "/addListing", element: <AddListingLayout /> },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/dashboard", element: <Home /> },
        {path:'/dashboard/keyword-optimization', element: <KeywordOptimization/>},
        {path:'/dashboard/image-optimization', element: <ImageOptimization/>},
        {path:'/dashboard/profile', element: <Profile/>},
        {path:'/dashboard/profile-settings', element: <ProfileSettings/>},
        {path:'/dashboard/user-subscription', element: <UserSubscription/>},
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
