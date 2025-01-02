import React, { useState } from "react";
import { Menu, Layout, Button, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const navigation = useNavigate();

  const navItems = [
    { key: "home", label: "Home", path: "/" },
    { key: "pricing", label: "Pricing", path: "/pricing" },
    { key: "contact", label: "Contact Us", path: "/contact" },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Header
      style={{
        zIndex: 1,
        width: "100%",
        background: "#f9fafb",
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
        <img src="/listaro_logo.svg" width={250} alt="Logo" />
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
    justifyContent: "center",
    width: "100%",
  }}
>
  {navItems.map((item) => (
    <Menu.Item
      key={item.key}
      style={{
        padding: "0 15px",
        fontSize: "16px",
        fontWeight: "500",
      }}
    >
      <Link to={item.path} style={{ color: "black", textDecoration: "none" }}>
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
          display: "block", // Default for mobile
        }}
        onClick={toggleDrawer}
      />

      {/* Drawer for Mobile Menu */}
      <Drawer
        placement="left"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        bodyStyle={{ padding: "0", background: "#f5f5f5" }}
      >
        <Menu
          mode="vertical"
          selectable={false}
          style={{
            borderRight: "none",
            padding: "20px 0",
          }}
        >
          {navItems.map((item) => (
            <Menu.Item
              key={item.key}
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <Link
                to={item.path}
                onClick={toggleDrawer}
                style={{ color: "black" }}
              >
                {item.label}
              </Link>
            </Menu.Item>
          ))}
          <Menu.Divider />
          <div style={{ padding: "20px" }}>
            <Button
              className="bg-purple-700 text-white px-5 w-full"
              onClick={() => {
                toggleDrawer();
                navigation("/auth");
              }}
            >
              Get Started
            </Button>
          </div>
        </Menu>
      </Drawer>

      {/* Desktop CTA Button */}
      <div
        className="desktop-menu"
        style={{
          display: "none", // Default hidden for mobile
        }}
      >
        <Button
          type="primary"
          onClick={() => navigation("/auth")}
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
          .desktop-menu a:hover {
            color: #722ed1 !important; /* Purple hover for links */
          }
         
        `}
      </style>
    </Header>
  );
};

export default Navbar;
