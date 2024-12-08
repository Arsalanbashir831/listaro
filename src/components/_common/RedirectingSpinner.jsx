import React from "react";
import { Spin, Typography } from "antd";

const RedirectingSpinner = () => {
  const { Title, Text } = Typography;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Spin
          size="large"
          style={{
            marginBottom: "20px",
            color: "#6b46c1", // Purple spinner
          }}
        />
        <Title level={3} style={{ color: "#6b46c1", fontWeight: "bold" }}>
          Verifying
        </Title>
        <Text style={{ color: "#595959", fontSize: "16px", textAlign: "center" }}>
          Please hold on we are verifying your credentials
        </Text>
      </div>
    </>
  );
};

export default RedirectingSpinner;
