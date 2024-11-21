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
import Footer from "./components/_common/Footer";
import ImportCSV from "./pages/Dashboard/ImportCSV";
import AdminLayout from "./pages/Layouts/AdminLayout";
import AdminLogin from "./components/Authentication/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Subscriptions from "./pages/Admin/Subscriptions";
import ContactUs from "./pages/ContactUs";

const AppWithNavbar = ({ children }) => {
  const location = useLocation();
  const excludedRoutes = ["/auth", "/addListing", "/admin-auth", "/admin",'/dashboard'];
  const isExcluded = excludedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!isExcluded && <Navbar />}
      {children}
      {!isExcluded && <Footer />} 
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWithNavbar>
        <Routes>
          <Route path="/auth" element={<Authentication />} />
          <Route path="/admin-auth" element={<AdminLogin />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/" element={<LandingPageLayout />} />
          <Route path="/pricing" element={<PricingLayout />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Home />} />
            <Route path="keyword-optimization" element={<KeywordOptimization />} />
            <Route path="image-optimization" element={<ImageOptimization />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="user-subscription" element={<UserSubscription />} />
            <Route path="import-products" element={<ImportCSV />} />
          </Route>
          <Route path="/addListing" element={<AddListingLayout />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppWithNavbar>
    </Router>
  );
};

export default App;
