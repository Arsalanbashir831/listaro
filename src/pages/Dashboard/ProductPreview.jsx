import React from "react";
import { Card, Typography, Divider, Tag, Row, Col, List, Button, message } from "antd";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";

const { Title, Text, Paragraph } = Typography;

const ProductPreview = () => {
  const location = useLocation();

  const {
    attributes = {},
    platform,
    generated_attributes = {},
    keywords = {},
  } = location.state.product;

  const productAttributes = Object.keys(generated_attributes).length > 0 ? generated_attributes : attributes;

  const handleDownloadCSV = () => {
    const csvData = Object.entries(productAttributes).map(([key, value]) => ({
      Attribute: key,
      Value: Array.isArray(value) ? value.join("; ") : value,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "product_details.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadKeywordsCSV = () => {
    if (!keywords.keywords || keywords.keywords.length === 0) {
      message.error("No keywords available to download.");
      return;
    }

    const csvData = keywords.keywords.map((keyword, index) => ({
      Keyword: keyword,
      "Relevance Score": keywords.relevancy_score[index],
      "SEO Score": keywords.seo_score[index],
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "keywords.csv";
    link.click();
    URL.revokeObjectURL(url);
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
      <Button
        type="primary"
        onClick={handleDownloadCSV}
        style={{
          background: "linear-gradient(135deg, #9c27b0, #6a0dad)",
          border: "none",
          borderRadius: "8px",
          color: "#ffffff",
          fontWeight: "bold",
          display: "block",
          marginBottom: 10,
        }}
      >
        Download Product Details
      </Button>

      {/* Product Header */}
      <Card
        style={{
          marginBottom: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Title level={3}>{productAttributes.title || attributes.ProductName}</Title>
            <Text strong>Platform: </Text>
            <Tag color="blue">{platform}</Tag>
            <Divider />
            <Title level={4}>
              Price: ${productAttributes.price || attributes.price}
            </Title>
            <Paragraph>
              {productAttributes.description || attributes.Description}
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* Product Details Section */}
      <Card
        title="Product Details"
        bordered
        style={{ borderRadius: "8px", marginBottom: "20px" }}
      >
        <List
          dataSource={Object.entries(productAttributes).filter(
            ([key]) => !["title", "description"].includes(key)
          )}
          renderItem={([key, value]) => (
            <List.Item>
              <Text strong>{key}:</Text>{" "}
              <Text>{Array.isArray(value) ? value.join(", ") : value}</Text>
            </List.Item>
          )}
        />
      </Card>

      {/* Keywords Section */}
      {keywords.keywords && keywords.keywords.length > 0 && (
        <Card
          title="Keywords"
          bordered
          style={{ borderRadius: "8px", marginBottom: "20px" }}
        >
          <List
            dataSource={keywords.keywords.map((keyword, index) => ({
              keyword,
              relevance: keywords.relevancy_score[index],
              seo: keywords.seo_score[index],
            }))}
            renderItem={({ keyword, relevance, seo }) => (
              <List.Item>
                <Text strong>{keyword}</Text>
                <Text style={{ marginLeft: "auto" }}>
                  Relevance: {relevance}, SEO: {seo}
                </Text>
              </List.Item>
            )}
          />
          <Button
            type="default"
            onClick={handleDownloadKeywordsCSV}
            style={{
              background: "#ffffff",
              borderColor: "#6a0dad",
              color: "#6a0dad",
              marginTop: "10px",
            }}
          >
            Download Keywords CSV
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ProductPreview;
