import React, { useState } from "react";
import {
  Card,
  Typography,
  Divider,
  Input,
  Row,
  Col,
  List,
  Button,
  message,
  Tag,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Title } = Typography;

const ProductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { makeApiRequest } = useApiRequest();

  const productData = location.state.product;

  const [attributes, setAttributes] = useState(productData.attributes);
  const [platform, setPlatform] = useState(productData.platform);

  // Save Product Changes
  const handleSave = async () => {
    const updatedProduct = {
      attributes,
      platform,
    };

    try {
      const response = await makeApiRequest(
        `/products/${productData.id}/`,
        "PUT",
        updatedProduct,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      );

      if (response.success) {
        message.success("Product updated successfully!");
        navigate(`/dashboard/product-preview`, {
          state: { product: response.data },
        });
      } else {
        message.error("Failed to update product.");
      }
    } catch (error) {
      message.error("An error occurred while updating the product.");
    }
  };

  const handleAttributeChange = (key, value) => {
    setAttributes({ ...attributes, [key]: value });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
        background: "#f9f9fb",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={4}>Edit Product</Title>
      <Divider />

      {/* Product Attributes */}
      <Card
        title="Attributes"
        bordered
        style={{ borderRadius: "8px", marginBottom: "20px" }}
      >
        <List
          dataSource={Object.entries(attributes)}
          renderItem={([key, value]) => (
            <List.Item>
              <Row style={{ width: "100%" }} gutter={16}>
                <Col span={6}>
                  <Title level={5} style={{ margin: 0 }}>
                    {key}
                  </Title>
                </Col>
                <Col span={18}>
                  <Input
                    value={value}
                    onChange={(e) => handleAttributeChange(key, e.target.value)}
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>

      {/* Platform */}
      <Card
        title="Platform"
        bordered
        style={{ borderRadius: "8px", marginBottom: "20px" }}
      >
        <Tag color="blue">{platform}</Tag>
      </Card>

      {/* Save Button */}
      <Button
        type="primary"
        style={{
          marginTop: "20px",
          backgroundColor: "#6a0dad",
          borderColor: "#6a0dad",
        }}
        icon={<SaveOutlined />}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default ProductEdit;