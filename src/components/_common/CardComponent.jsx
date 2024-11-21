import React from "react";
import { Card } from "antd";
import { Typography } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const CardComponent = ({ icon, name, value, description, bgColor = "bg-purple-200" }) => {
  return (
    <Card
      className={`rounded-lg shadow-md p-4 ${bgColor}`}
      bordered={false}
      style={{
        backgroundColor: "#f3e8ff",
        borderRadius: "12px",
      }}
    >
      <div className="flex items-center mb-4">
        {/* Icon */}
        <div className="text-purple-700 text-lg mr-2">{icon}</div>
        {/* Name */}
        <Text className="text-purple-800 font-medium">{name}</Text>
      </div>

      {/* Value */}
      <Title level={3} className="text-purple-900">
        {value}
      </Title>

      {/* Description */}
      <Text type="secondary" className="text-sm">
        {description}
      </Text>
    </Card>
  );
};

export default CardComponent;
