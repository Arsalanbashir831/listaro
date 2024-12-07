import React from "react";
import { Layout, Menu, Dropdown, Button, Avatar, Typography, Modal } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaFileImport, FaKeycdn } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { RiMoneyEuroCircleFill } from "react-icons/ri";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { confirm } = Modal;

const DashboardLayout = () => {
  const navigate = useNavigate();

  // Logout confirmation
  const showLogoutConfirmation = () => {
    confirm({
      title: "Are you sure you want to logout?",
      content: "Your session will end, and you will need to login again to continue.",
      okText: "Logout",
      cancelText: "Cancel",
      onOk() {
        navigate("/auth");
      },
      onCancel() {
        console.log("Logout canceled.");
      },
    });
  };

  // Define menu items dynamically
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "2",
      icon: <FaKeycdn />,
      label: "Keyword Optimization",
      path: "/dashboard/keyword-optimization",
    },
    {
      key: "3",
      icon: <IoSettingsSharp />,
      label: "Settings",
      path: "/dashboard/profile-settings",
    },
    {
      key: "5",
      icon: <FaFileImport />,
      label: "Import Products",
      path: "/dashboard/import-products",
    },
    {
      key: "4",
      icon: <RiMoneyEuroCircleFill />,
      label: "Subscription",
      path: "/dashboard/user-subscription",
    },
    
    {
      key: "7",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: showLogoutConfirmation,
    },
  ];

  // Dropdown menu for user profile
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/dashboard/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/dashboard/profile-settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={showLogoutConfirmation}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider width={"18%"} className="bg-white">
        <div className="h-16 flex items-center justify-center">
          <img
            src="/listaro_logo.svg"
            alt="Logo"
            className="w-36 h-36 rounded-full"
          />
        </div>

        {/* Render Menu items dynamically */}
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={item.onClick}
            >
              {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header className="bg-white flex justify-between items-center px-6 space-x-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-5">
              <Text
                strong
                className="block text-sm font-semibold text-gray-700"
              >
                Prepaid Plan
              </Text>
              <Text type="secondary" className="text-xs text-gray-500">
                0 credits
              </Text>
            </div>
            <Button onClick={() => navigate("/pricing")}
              type="primary"
              className="bg-purple-700 border-purple-700 hover:bg-purple-800"
            >
              Upgrade
            </Button>
          </div>

          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer space-x-2">
              <Avatar className="bg-green-500">A</Avatar>
              <Text className="text-sm text-gray-700">
                arsalanbashir831@gmail.com
              </Text>
              <DownOutlined />
            </div>
          </Dropdown>
        </Header>

        {/* Content Area */}
        <Content className="m-4 p-6 bg-white min-h-screen shadow-md rounded-lg">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
