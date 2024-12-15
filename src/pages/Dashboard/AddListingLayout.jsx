import React, { useState } from "react";
import { Layout, Input, Typography, Row, Col, Button, Divider, Select, message } from "antd";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const AddListingLayout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("Shopify"); // Default platform
  const { makeApiRequest, loading } = useApiRequest();

  const handleGenerateListing = async () => {
    if (!title || !description || !price || !platform) {
      message.error("Please fill in all fields.");
      return;
    }

    const payload = {
      attributes: {
        title,
        description,
        price: parseFloat(price),
      },
      platform,
    };

    const token = localStorage.getItem("accessToken");

    const response = await makeApiRequest("/products/", "POST", payload, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    if (response.success) {
      message.success("Product created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setPlatform("Shopify");
    } else {
      message.error(`Error: ${response.error}`);
    }
  };

  return (
    <Layout
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f9f9fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ color: "#6a0dad", textAlign: "center" }}>
          Add Product
        </Title>

        {/* Product Title */}
        <div style={{ marginBottom: "16px" }}>
          <Text strong style={{ color: "#6a0dad" }}>
            Product Title
          </Text>
          <Input
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #d1c4e9",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "16px" }}>
          <Text strong style={{ color: "#6a0dad" }}>
            Description
          </Text>
          <TextArea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #d1c4e9",
            }}
          />
        </div>

        {/* Price */}
        <div style={{ marginBottom: "16px" }}>
          <Text strong style={{ color: "#6a0dad" }}>
            Price (USD)
          </Text>
          <Input
            type="number"
            placeholder="Enter price in USD"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #d1c4e9",
            }}
          />
        </div>

        {/* Platform Selection */}
        <div style={{ marginBottom: "16px" }}>
          <Text strong style={{ color: "#6a0dad" }}>
            Platform
          </Text>
          <Select
            value={platform}
            onChange={(value) => setPlatform(value)}
            style={{
              marginTop: "8px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <Option value="Shopify">Shopify</Option>
            <Option value="Amazon">Amazon</Option>
            <Option value="eBay">eBay</Option>
            <Option value="Squarespace">Squarespace</Option>
            <Option value="Wix">Wix</Option>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          block
          onClick={handleGenerateListing}
          loading={loading}
          style={{
            background: "linear-gradient(135deg, #9c27b0, #6a0dad)",
            border: "none",
            borderRadius: "8px",
            height: "50px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </Content>
    </Layout>
  );
};

export default AddListingLayout;