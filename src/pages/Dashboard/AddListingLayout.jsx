import React, { useState } from "react";
import { Layout, Input, Typography, Button, Select, message, Form } from "antd";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Platform-specific configurations
const platformConfig = {
  Shopify: {
    fields: [
      { name: "title", label: "Product Title", type: "text", placeholder: "Enter product title" },
      { name: "brand", label: "Brand", type: "text", placeholder: "Enter product brand" },
      { name: "price", label: "Price (USD)", type: "number", placeholder: "Enter price in USD" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description" },
    ],
  },
  Amazon: {
    fields: [
      { name: "title", label: "Product Title", type: "text", placeholder: "Enter product title" },
      { name: "brand", label: "Brand", type: "text", placeholder: "Enter product brand" },
      { name: "price", label: "Price (USD)", type: "number", placeholder: "Enter price in USD" },
      { name: "category", label: "Category", type: "text", placeholder: "Enter product category" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description" },
    ],
  },
  eBay: {
    fields: [
      { name: "title", label: "Product Title", type: "text", placeholder: "Enter product title" },
      { name: "price", label: "Price (USD)", type: "number", placeholder: "Enter price in USD" },
      { name: "condition", label: "Condition", type: "text", placeholder: "Enter product condition" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description" },
    ],
  },
  Etsy: {
    fields: [
      { name: "title", label: "Product Title", type: "text", placeholder: "Enter product title" },
      { name: "price", label: "Price (USD)", type: "number", placeholder: "Enter price in USD" },
      { name: "tags", label: "Tags", type: "text", placeholder: "Enter product tags (comma-separated)" },
      { name: "material", label: "Material", type: "text", placeholder: "Enter material used" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description" },
    ],
  },
  Wix: {
    fields: [
      { name: "title", label: "Product Title", type: "text", placeholder: "Enter product title" },
      { name: "price", label: "Price (USD)", type: "number", placeholder: "Enter price in USD" },
      { name: "inventory", label: "Inventory Count", type: "number", placeholder: "Enter inventory count" },
      { name: "tags", label: "Tags", type: "text", placeholder: "Enter product tags (comma-separated)" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description" },
    ],
  },
  Squarespace: {
    fields: [
      { name: "title", label: "Product Title", type: "text", placeholder: "Enter product title" },
      { name: "price", label: "Price (USD)", type: "number", placeholder: "Enter price in USD" },
      { name: "inventory", label: "Inventory Count", type: "number", placeholder: "Enter inventory count" },
      { name: "tags", label: "Tags", type: "text", placeholder: "Enter product tags (comma-separated)" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description" },
    ],
  },
  Walmart: {
    fields: [
      { name: "title", label: "Product Title", type: "text", placeholder: "Enter product title" },
      { name: "brand", label: "Brand", type: "text", placeholder: "Enter product brand" },
      { name: "price", label: "Price (USD)", type: "number", placeholder: "Enter price in USD" },
      { name: "upc", label: "UPC Code", type: "text", placeholder: "Enter UPC code" },
      { name: "inventory", label: "Inventory Count", type: "number", placeholder: "Enter inventory count" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description" },
    ],
  },
};


const AddListingLayout = () => {
  const [platform, setPlatform] = useState("Shopify"); // Default platform
  const [form] = Form.useForm();
  const { makeApiRequest, loading } = useApiRequest();

  const handleGenerateListing = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        attributes: { ...values },
        platform,
      };

      const token = localStorage.getItem("accessToken");

      const response = await makeApiRequest("/products/", "POST", payload, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      if (response.success) {
        message.success("Product created successfully!");
        form.resetFields();
      } else {
        message.error(`Error: ${response.error}`);
      }
    } catch (error) {
      message.error("Please fill in all required fields.");
    }
  };

  const currentPlatformConfig = platformConfig[platform];

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

        <Form form={form} layout="vertical">
          {/* Dynamic Fields */}
          {currentPlatformConfig.fields.map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={[{ required: true, message: `Please enter ${field.label.toLowerCase()}` }]}
            >
              {field.type === "textarea" ? (
                <Input.TextArea placeholder={field.placeholder} rows={4} />
              ) : (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #d1c4e9",
                  }}
                />
              )}
            </Form.Item>
          ))}

          {/* Platform Selection */}
          <Form.Item label="Platform">
            <Select
              value={platform}
              onChange={(value) => setPlatform(value)}
              style={{ width: "100%", borderRadius: "8px" }}
            >
              {Object.keys(platformConfig).map((key) => (
                <Option key={key} value={key}>
                  {key}
                </Option>
              ))}
            </Select>
          </Form.Item>

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
        </Form>
      </Content>
    </Layout>
  );
};

export default AddListingLayout;
