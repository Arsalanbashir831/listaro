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
  const [price, setPrice] = useState(""); // New price state
  const [uploadedImages, setUploadedImages] = useState([]);
  const [tempImages, setTempImages] = useState([]); // Temporary images state

  const handleGenerateListing = () => {
    setUploadedImages(tempImages); // Update images only on button click
  };

  return (
    <Layout style={{ padding: "20px", minHeight: "100vh", background: "#f0f2f5" }}>
      <Content>
        <Row gutter={24}>
          {/* Left Section - Input List */}
          <Col span={6}>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4}>Add Product Details</Title>

              {/* Product Title */}
              <div style={{ marginBottom: "16px" }}>
                <Text strong>Product Title</Text>
                <Input
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ marginTop: "8px" }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "16px" }}>
                <Text strong>Description</Text>
                <TextArea
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  style={{ marginTop: "8px" }}
                />
              </div>

              {/* Price */}
              <div style={{ marginBottom: "16px" }}>
                <Text strong>Price (USD)</Text>
                <Input
                  type="number"
                  placeholder="Enter price in USD"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ marginTop: "8px" }}
                />
              </div>

              {/* Image Upload */}
              <Divider />
              <DragDropImageContainer setTempImages={setTempImages} />
              <Divider />
              <Button className="bg-purple-700" type="primary" block onClick={handleGenerateListing}>
                Generate Listing
              </Button>
            </div>
          </Col>

          {/* Right Section - Generated Listing */}
          <Col span={18}>
            <GeneratedContent title={title} description={description} price={price} images={uploadedImages} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AddListingLayout;
