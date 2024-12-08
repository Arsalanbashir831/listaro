// Authentication.js

import { Layout, Row, Col, Typography } from "antd";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import { useState } from "react";

const { Content } = Layout;
const { Title, Text } = Typography;

const Authentication = () => {
  const [isComponent, setComponent] = useState("login");

  return (
    <Layout
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row style={{ height: "100%" }}>
        {/* Left Side: Welcome Section */}
        <Col className="bg-purple-700"
          xs={0}
          md={12}
          style={{
           
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <Title level={2} style={{ color: "white" }}>
              Come join Listaro !
            </Title>
            <Text style={{ fontSize: "16px", color: "white" }}>
              We are so excited to have you here! If you havent already, create
              an account to get access to exclusive offers, rewards, and
              discounts.
            </Text>
            <br />
            {isComponent === "login" ? (
              <>
                <Text
                  style={{
                    fontSize: "14px",
                    color: "white",
                    marginTop: "16px",
                  }}
                >
                  Dont have account?{" "}
                  <a
                    onClick={() => setComponent("signup")}
                    style={{ textDecoration: "underline", color: "white" }}
                  >
                    Register
                  </a>
                  .
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: "14px",
                    color: "white",
                    marginTop: "16px",
                  }}
                >
                  Already have an account?{" "}
                  <a
                    onClick={() => setComponent("login")}
                    style={{ textDecoration: "underline", color: "white" }}
                  >
                    Sign in
                  </a>
                  .
                </Text>
              </>
            )}
          </div>
        </Col>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Content
            style={{
           
              width: "100%",
              padding: "40px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            {isComponent === "login" ? <Login /> : <Signup />}
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default Authentication;
