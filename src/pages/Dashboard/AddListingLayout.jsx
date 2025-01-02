import React, { useState } from "react";
import { Layout, Input, Typography, Button, Select, message, Form, Alert, Flex } from "antd";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddListingLayout = () => {
  const [form] = Form.useForm();
  const { makeApiRequest, loading } = useApiRequest();
  const navigation = useNavigate()


  const handleGenerateListing = async () => {
    try {
      const values = await form.validateFields();
  
      // Transform the platforms array
      const platforms = values.platforms.map((platform) => ({ name: platform }));
  
      // Create the payload in the required format
      const payload = {
        attributes: {
          productName: values.productName,
          brandName: values.brandName,
          price: values.price,
          category: values.category,
          description: values.description,
        },
        platforms,
      };
  
      const token = localStorage.getItem("accessToken");

  
      const response = await makeApiRequest("/products/", "POST", payload, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
  
      if (response.success) {
        message.success("Product created successfully!");
        console.log(response.data);
         navigation(`/dashboard/product-optimization/${response.data.id}`)
        form.resetFields();
      } else {
        message.error(`Error: ${response.error}`);
      }
    } catch (error) {
      message.error("Please fill in all required fields.");
    }
  };
  

  return (
    <Layout
      style={{
        padding: "20px",
        minHeight: "80vh",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "10px",
          padding: "20px",
          border: "1px solid #e8e8e8",
        }}
      >
        <Title level={4} style={{ color: "#6a0dad", textAlign: "center", marginBottom: "16px" }}>
          Add Product
        </Title>

        <Form
          form={form}
          layout="vertical"
          style={{
            gap: "12px",
          }}
        >
          {/* Product Name */}
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true, message: "Please enter the product name" }]}
          >
            <Input
              placeholder="Enter product name"
              style={{
                borderRadius: "8px",
                border: "1px solid #d1c4e9",
              }}
            />
          </Form.Item>

          {/* Brand Name */}
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter the brand name" }]}
          >
            <Input
              placeholder="Enter brand name"
              style={{
                borderRadius: "8px",
                border: "1px solid #d1c4e9",
              }}
            />
          </Form.Item>

          {/* Price USD */}
          <Form.Item
            name="price"
            label="Price (USD)"
            rules={[{ required: true, message: "Please enter the price in USD" }]}
          >
            <Input
              type="number"
              placeholder="Enter price in USD"
              style={{
                borderRadius: "8px",
                border: "1px solid #d1c4e9",
              }}
            />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input
              placeholder="Enter product category"
              style={{
                borderRadius: "8px",
                border: "1px solid #d1c4e9",
              }}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea
              placeholder="Enter product description"
              rows={3}
              style={{
                borderRadius: "8px",
                border: "1px solid #d1c4e9",
              }}
            />
          </Form.Item>

          {/* Platforms */}
          <Form.Item
            name="platforms"
            label="Platforms"
            rules={[{ required: true, message: "Please select a platform" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select platforms"
              tagRender={(props) => {
                const { label, closable, onClose } = props;

                return (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      backgroundColor: "#e9d6ff", // Light purple background
                      color: "#7e22ce", // Purple text
                      borderRadius: "4px",
                      padding: "4px 8px",
                      marginRight: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {label}
                    {closable && (
                      <span
                        onClick={onClose}
                        style={{
                          marginLeft: "8px",
                          cursor: "pointer",
                          color: "#7e22ce", // Close icon matches text color
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>
                );
              }}
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            >
              {["Shopify", "Amazon", "eBay", "Etsy", "Wix", "Squarespace", "Walmart", "WooCommerce"].map(
                (platform) => (
                  <Option key={platform} value={platform}>
                    {platform}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>

          {/* Information Box */}
          <Alert
            message="Your listing will be generated for all selected platforms with optimized titles and descriptions for each platform."
            type="info"
            showIcon
            style={{
              marginBottom: "20px",
              background: "#f5f9ff",
              borderRadius: "8px",
              color:'#3c75ca',
              border: "1px solid #cce4ff",
            }}
          />

          {/* Submit Button */}
          <Flex justify="end">

          <Button
            type="primary"
            block
            onClick={handleGenerateListing}
            loading={loading}
            style={{
              background: "linear-gradient(135deg, #9c27b0, #6a0dad)",
              border: "none",
              borderRadius: "8px",
              height: "35px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#ffffff",
              width:'30%'
            }}
          >
            {loading ? "Adding..." : "Generate Listing"}
          </Button>
          </Flex>
        </Form>
      </Content>
    </Layout>
  );
};

export default AddListingLayout;
