import { Layout, Row, Col, Typography } from "antd";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; // React Router DOM for navigation
import { BASE_URL } from "../utils/Constants";
const { Content } = Layout;
const { Title, Text } = Typography;

const Authentication = () => {
  const [isComponent, setComponent] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const handleGoogleLoginSuccess = async (response) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/google-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login Successful:", data);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        navigate("/dashboard"); // Navigate to the dashboard
      } else {
        console.error("Backend Error:", data.error);
        throw new Error(data.error || "Google Login failed");
      }
    } catch (err) {
      console.error("Error:", err.message || "Google Login failed");
      setError(err.message || "Google Login failed");
    } finally {
      setLoading(false);
    }
  };

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
        <Col
          className="bg-purple-700"
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
              Come join Listaro!
            </Title>
            <Text style={{ fontSize: "16px", color: "white" }}>
              We are so excited to have you here! If you haven't already, create
              an account to get access to exclusive offers, rewards, and
              discounts.
            </Text>
            <br />
            {isComponent === "login" ? (
              <Text
                style={{
                  fontSize: "14px",
                  color: "white",
                  marginTop: "16px",
                }}
              >
                Don't have an account?{" "}
                <a
                  onClick={() => setComponent("signup")}
                  style={{ textDecoration: "underline", color: "white" }}
                >
                  Register
                </a>
                .
              </Text>
            ) : (
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
            )}
          </div>
        </Col>

        {/* Right Side: Login/Signup Section */}
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
            <div style={{ marginTop: "20px" }}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
            {error && (
              <Text style={{ color: "red", marginTop: "20px" }}>{error}</Text>
            )}
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default Authentication;
