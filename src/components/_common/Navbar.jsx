import React, { useState } from "react";
import { Menu, Layout, Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  // Navigation items
  const navItems = [
    { key: "home", label: "Home", path: "/" },
    { key: "pricing", label: "Pricing", path: "/pricing" },
    { key: "contact", label: "Contact Us", path: "/contact-us" },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        <img src="/listaro_logo.svg" width={120} alt="Logo" />
      </div>

      {/* Desktop Navigation */}
      <Menu
        mode="horizontal"
        selectable={false}
        className="desktop-menu"
        style={{
          display: "none",
          background: "transparent",
          borderBottom: "none",
        }}
      >
        {navItems.map((item) => (
          <Menu.Item key={item.key}>
            <Link to={item.path} style={{ color: "black" }}>
              {item.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>

      {/* Mobile Hamburger Menu */}
      <Button
        className="mobile-menu-button"
        icon={<MenuOutlined />}
        style={{
          background: "none",
          border: "none",
          fontSize: "18px",
          display: "block", // Hide by default for desktop
        }}
        onClick={toggleDrawer}
      />

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Listaro"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        bodyStyle={{ padding: "0" }}
      >
        <Menu
          mode="vertical"
          selectable={false}
          style={{
            borderRight: "none",
          }}
        >
          {navItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path} onClick={toggleDrawer}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
          <Menu.Divider />
          <div className="px-5 mt-5">
            <Button className="bg-purple-700 text-white px-5 w-full">
              Get Started
            </Button>
          </div>
        </Menu>
      </Drawer>

      {/* Desktop CTA Button */}
      <div
        className="desktop-menu"
        style={{
          display: "none", // Show only for desktop
        }}
      >
        <Button
          type="primary"
          className="bg-purple-700"
          style={{
            marginLeft: "20px",
            color: "white",
            border: "none",
          }}
        >
          Get Started
        </Button>
      </div>

      {/* Responsive CSS */}
      <style>
        {`
          @media (min-width: 768px) {
            .desktop-menu {
              display: flex !important;
            }
            .mobile-menu-button {
              display: none !important;
            }
          }
        `}
      </style>
    </Header>
  );
};

export default Navbar;
