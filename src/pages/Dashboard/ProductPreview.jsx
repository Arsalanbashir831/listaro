import React, { useEffect, useState } from "react";
import { Card, Typography, Divider, Tag, Row, Col, List, Button, message, Tabs, Table } from "antd";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { useApiRequest } from "../../hooks/useApiRequest";
import AIKEYWORDGENERATION from "../../components/_common/AI-Keyword-Generation";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductPreview = () => {
  const [productData, setProductData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const { makeApiRequest, loading } = useApiRequest();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProductById = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await makeApiRequest(`/products/${productId}/`, "GET", {}, {
          Authorization: `Bearer ${token}`,
        });
        if (response.success) {
          setProductData(response.data);
          setSelectedPlatform(response.data.platforms?.[0]?.name || null); // Default to the first platform
        } else {
          console.error("Error:", response.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProductById(); // Fetch product details on component mount
  }, [productId]);

  // Guard clause for missing product data
  if (!productData) {
    return <div>Loading...</div>;
  }

  // Extract relevant details
  const { platforms, attributes } = productData;

  const selectedPlatformData = platforms?.find(
    (platform) => platform.name === selectedPlatform
  );
  const generatedAttributes = selectedPlatformData?.generated_attributes || {};
  const keywords = selectedPlatformData?.generated_keywords || {};
  const productAttributes = Object.keys(generatedAttributes).length > 0 ? generatedAttributes : attributes;

  // CSV Download for Product Details
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

  // CSV Download for Keywords
  const handleDownloadSelectedKeywordsCSV = (selectedKeywords) => {
    if (!selectedKeywords || selectedKeywords.length === 0) {
      message.error("No keywords selected to download.");
      return;
    }
  
    const csvData = selectedKeywords.map(({ keyword, relevance, seo }) => ({
      Keyword: keyword,
      "Relevance Score": relevance,
      "SEO Score": seo,
    }));
  
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedPlatform}_selected_keywords.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
        background: "#fff",
        borderRadius: "8px",
      
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

      {/* Tab for Platforms */}
      <Tabs
        activeKey={selectedPlatform}
        onChange={(key) => setSelectedPlatform(key)}
        type="card"
      >
        {platforms.map((platform) => (
          <TabPane tab={platform.name} key={platform.name}>
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
                  <Title level={4}>
                    {generatedAttributes.title || attributes.productName}
                  </Title>
                  <Divider />
                  <Paragraph>
                    {generatedAttributes.description ||
                      attributes.description ||
                      "No description available."}
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

            {keywords.keywords && keywords.keywords.length > 0 && (
  <Card
    title="Keywords"
    bordered
    style={{ borderRadius: "8px", marginBottom: "20px" }}
  >
    <Table
      rowSelection={{
        type: "checkbox",
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedKeywords(selectedRows);
        },
      }}
      columns={[
        {
          title: "Keyword",
          dataIndex: "keyword",
          key: "keyword",
        },
        {
          title: "Relevance Score",
          dataIndex: "relevance",
          key: "relevance",
        },
        {
          title: "SEO Score",
          dataIndex: "seo",
          key: "seo",
        },
      ]}
      dataSource={keywords.keywords.map((keyword, index) => ({
        key: index,
        keyword,
        relevance: keywords.relevancy_score[index],
        seo: keywords.seo_score[index],
      }))}
      pagination={false}
      scroll={{ y: 240 }} // Make the table scrollable
    />

    <Button
      type="default"
       onClick={() => handleDownloadSelectedKeywordsCSV(selectedKeywords)}
      style={{
        background: "#ffffff",
        borderColor: "#6a0dad",
        color: "#6a0dad",
        marginTop: "10px",
      }}
    >
      Download Selected Keywords CSV
    </Button>
  </Card>
)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductPreview;
