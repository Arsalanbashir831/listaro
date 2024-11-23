import React from "react";
import { Card, Button, Typography, Divider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const PricePlanCard = ({ title, price, description, features, buttonLabel, popular }) => {
  const { Title, Text } = Typography;

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: popular
          ? "0 4px 15px rgba(106, 13, 173, 0.3)"
          : "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            backgroundColor: "#6a0dad",
            color: "white",
            borderRadius: "4px",
            padding: "2px 8px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Popular
        </div>
      )}

      <Title level={4} style={{ color: "#6a0dad", marginBottom: "8px" }}>
        {title}
      </Title>
      <Text
        type="secondary"
        style={{ display: "block", marginBottom: "16px", color: "#6a0dad" , maxHeight:'40px'}}
      >
        {description}
      </Text>
      <Title level={2} style={{ color: "#6a0dad", marginBottom: "16px", marginTop:'60px' }}>
        {price}
      </Title>
      <Button
        type="primary"
        block
        style={{
          backgroundColor: "#6a0dad",
          borderColor: "#6a0dad",
          marginBottom: "16px",
        }}
      >
        {buttonLabel}
      </Button>
      <Divider />
      <ul
        style={{
          textAlign: "left",
          paddingLeft: "20px",
          marginBottom: "16px",
          listStyle: "none",
        }}
      >
        {features.map((feature, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <CheckCircleOutlined style={{ color: "#6a0dad", marginRight: "8px" }} />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PricePlanCard;
