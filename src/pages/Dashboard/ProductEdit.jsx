import React, { useEffect, useState } from "react";
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
  Tabs,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Title } = Typography;
const { TabPane } = Tabs;

const ProductEdit = () => {
  const { productId } = useParams(); // Get productId from params
  const navigate = useNavigate();
  const { makeApiRequest } = useApiRequest();

  const [productData, setProductData] = useState(null);
  const [attributes, setAttributes] = useState({});
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await makeApiRequest(`/products/${productId}/`, "GET", {}, {
          Authorization: `Bearer ${token}`,
        });
        if (response.success) {
          setProductData(response.data);
          setAttributes(response.data.attributes);
          setPlatforms(response.data.platforms);
        } else {
          message.error("Failed to fetch product data.");
        }
      } catch (error) {
        message.error("An error occurred while fetching product data.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSave = async () => {
    const updatedProduct = {
      attributes,
      platforms: platforms.map((platform) => ({
        ...platform,
        generated_attributes: platform.generated_attributes,
      })),
    };

    try {
      const response = await makeApiRequest(
        `/products/${productId}/`,
        "PUT",
        updatedProduct,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      );

      if (response.success) {
        message.success("Product updated successfully!");
        navigate(`/dashboard/product-preview/${productId}`);
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

  const handleGeneratedAttributeChange = (platformIndex, key, value) => {
    const updatedPlatforms = [...platforms];
    updatedPlatforms[platformIndex].generated_attributes[key] = value;
    setPlatforms(updatedPlatforms);
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

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

      {/* Platforms */}
      <Card
        title="Platforms"
        bordered
        style={{ borderRadius: "8px", marginBottom: "20px" }}
      >
        <Tabs>
          {platforms.map((platform, index) => (
            <TabPane tab={platform.name} key={platform.id}>
              <Divider>Generated Attributes</Divider>
              {Object.keys(platform.generated_attributes || {}).length > 0 ? (
                <List
                  dataSource={Object.entries(platform.generated_attributes)}
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
                            value={
                              Array.isArray(value) ? value.join(", ") : value
                            }
                            onChange={(e) =>
                              handleGeneratedAttributeChange(
                                index,
                                key,
                                Array.isArray(value)
                                  ? e.target.value.split(", ")
                                  : e.target.value
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              ) : (
                <p>No generated attributes available for this platform.</p>
              )}
            </TabPane>
          ))}
        </Tabs>
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
