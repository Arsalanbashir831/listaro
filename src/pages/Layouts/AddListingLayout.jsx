import React, { useState } from "react";
import { Layout, Input, Typography, Row, Col, Button, Divider } from "antd";
import DragDropImageContainer from "../../components/_common/DragDropImageContainer";
import GeneratedContent from "../../components/_common/GeneratedContent";

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const AddListingLayout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);

  const handleGenerateListing = () => {
    setUploadedImages(tempImages);
  };

  return (
    <Layout
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9f9fb, #f0f2f5)",
      }}
    >
      <Content>
        <Row gutter={[24, 24]}>
          {/* Left Section - Input Form */}
          <Col xs={24} md={8} lg={6}>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4} style={{ color: "#3d3d3d" }}>
                Add Product Details
              </Title>

              {/* Product Title */}
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#595959" }}>
                  Product Title
                </Text>
                <Input
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    marginTop: "8px",
                    borderRadius: "5px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#595959" }}>
                  Description
                </Text>
                <TextArea
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  style={{
                    marginTop: "8px",
                    borderRadius: "5px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </div>

              {/* Price */}
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#595959" }}>
                  Price (USD)
                </Text>
                <Input
                  type="number"
                  placeholder="Enter price in USD"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{
                    marginTop: "8px",
                    borderRadius: "5px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </div>

              {/* Image Upload */}
              <Divider />
              <DragDropImageContainer setTempImages={setTempImages} />
              <Divider />
              <Button
                className="bg-purple-700"
                type="primary"
                block
                onClick={handleGenerateListing}
                style={{
                  background: "linear-gradient(to right, #7f5af0, #6247aa)",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Generate Listing
              </Button>
            </div>
          </Col>

          {/* Right Section - Generated Listing */}
          <Col xs={24} md={16} lg={18}>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <GeneratedContent
                title={title}
                description={description}
                price={price}
                images={uploadedImages}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AddListingLayout;
