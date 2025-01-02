import React, { useContext } from "react";
import { Layout, Menu, Dropdown, Button, Avatar, Typography, Modal, Divider, Badge } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  DownOutlined,
  HomeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { BiBox, BiCard, BiHistory } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { RiUser2Fill } from "react-icons/ri";
import { UserContext } from "../../context/UserContext";
import { SubscriptionContext } from "../../context/SubscriptionContext";
import { AuthContext } from "../../context/AuthContext";
import { FaPlusCircle } from "react-icons/fa";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;
const { confirm } = Modal;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { subscription } = useContext(SubscriptionContext);
  const { logout } = useContext(AuthContext);

  const showLogoutConfirmation = () => {
    confirm({
      title: (
        <div className="text-lg font-semibold text-gray-800">
          Are you sure you want to logout?
        </div>
      ),
      icon: <LogoutOutlined  className="text-red-500 text-xl" />,
      content: (
        <div className="text-gray-600">
          Your session will end, and you will need to log in again to continue.
        </div>
      ),
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: {
        className: "bg-red-600 border-red-600 hover:bg-red-700 text-white",
      },
      cancelButtonProps: {
        className: "hover:text-gray-700",
      },
      className: "custom-logout-modal", // Add a custom class for additional styling
      onOk() {
        logout();
        navigate("/auth");
      },
      onCancel() {
        console.log("Logout canceled.");
      },
    });
  };
  


  const menuItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Home",
      path: "/dashboard",
    },
    {
      key: "/dashboard/import-products",
      icon: <BiBox />,
      label: "Bulk Importing",
      path: "/dashboard/import-products",
    },
    {
      key: "/dashboard/history-products",
      icon: <BiHistory />,
      label: "Bulk Listing",
      path: "/dashboard/history-products",
    },
    {
      key: "/dashboard/profile-settings",
      icon: <IoSettingsSharp />,
      label: "Settings",
      path: "/dashboard/profile-settings",
    },
    {
      key: "/dashboard/profile",
      icon: <RiUser2Fill />,
      label: "User Profile",
      path: "/dashboard/profile",
    },
   
  ];

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        width={240}
        className="bg-gray-50 border-r border-gray-200"
        style={{ height: "100vh", position: "sticky", top: 0 , backgroundColor:'#F9FAFB' }}
      >
        <div className="h-16 flex items-center justify-center  border-gray-200">
          <img
            src="/listaro_logo.svg"
            alt="Logo"
            className="w-[150px] h-[150px] rounded-full"
          />
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          className="py-4 "
          style={{backgroundColor:'#F9FAFB'}}
          
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className={`hover:bg-purple-50 ${
                location.pathname === item.key ? 'menu-item-active': ""
              }`}
            >
              {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
            </Menu.Item>
          ))}
        </Menu>

        <Divider className="my-4" />

        {/* Subscription Section */}
        <div className="px-6">
          <h1  className="text-gray-500">
            Subscription
          </h1>
          <div className="flex items-center space-x-3 mt-2">
            <BiCard className="text-xl text-gray-700" />
            <Badge
              color="green"
              text={subscription?.plan || "Free Plan"}
              className="text-gray-800 font-semibold"
            />
          </div>
          <div className="flex items-center space-x-4 mt-5 cursor-pointer">
           <div  onClick={() => navigate("/pricing")} className=" bg-purple-200 text-purple-700 flex w-full p-2 rounded-md justify-between ">
           <div
             
            
             
            >
              Upgrade
            </div>
            <div>
              <ArrowRightOutlined/>
            </div>
           </div>
           
          </div>
          
        </div>
        <div className="absolute bottom-0 w-full p-4 bg-[#F9FAFB] border-t border-gray-200">
    <div className="flex items-center">
      <Avatar size={40} className="bg-purple-100 text-purple-700">
        {user?.email?.charAt(0).toUpperCase()}
      </Avatar>
      <div className="ml-3">
       
        <Text className="block text-gray-500 text-sm">{user?.email || "johndoe@example.com"}</Text>
      </div>
    </div>
    <div
      className="mt-3 flex items-center text-red-600 cursor-pointer hover:text-red-800"
      onClick={showLogoutConfirmation}
    >
      <LogoutOutlined className="mr-2" />
      <Text className="text-sm font-medium">Logout</Text>
    </div>
  </div>
      </Sider>

      {/* Main Layout */}
      <Layout>
        

        {/* Content Area */}
        <Content className="m-4 p-6 bg-white min-h-screen  rounded-lg">
        <header className="flex justify-end px-5 mt-2">
        <Button
              onClick={() => navigate("/dashboard/addListing")}
              type="primary"
              icon={<FaPlusCircle />}
              className="bg-purple-700 border-purple-700 hover:bg-purple-800"
            >
              Create Listing
            </Button>
        </header>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
