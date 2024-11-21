import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import PricingLayout from "./pages/Layouts/PricingLayout";
import LandingPageLayout from "./pages/Layouts/LandingPageLayout";
import Navbar from "./components/_common/Navbar";
import { Flex } from "antd";
import Footer from "./components/_common/Footer";
import ImportCSV from "./pages/Dashboard/ImportCSV";


const AppWithNavbar = ({ children }) => {
  const location = useLocation();

  // Define routes where Navbar should not appear
  const excludedRoutes = ["/dashboard", "/auth", "/addListing"];

  // Check if the current route is excluded
  const isExcluded = excludedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!isExcluded && <Navbar />} {/* Render Navbar conditionally */}
      {children}
      {!isExcluded && <Footer/>}
    </>
  );
};

const App = () => {
  return (
    <Router>
    
  
      <AppWithNavbar>
    
   
        <Routes>
          <Route path="/auth" element={<Authentication />} />
          <Route path="/addListing" element={<AddListingLayout />} />
          <Route path="/pricing" element={<PricingLayout />} />
          <Route path="/" element={<LandingPageLayout />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/keyword-optimization" element={<KeywordOptimization />} />
            <Route path="/dashboard/image-optimization" element={<ImageOptimization />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/profile-settings" element={<ProfileSettings />} />
            <Route path="/dashboard/user-subscription" element={<UserSubscription />} />
            <Route path="/dashboard/import-products" element={<ImportCSV />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppWithNavbar>
       
    </Router>
  );
};

export default App;
