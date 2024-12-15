import { useState, useEffect } from "react";
import { Row, Col, Card, Select, Typography, Button, message, Checkbox, Pagination } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, DownloadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { useParams } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Title } = Typography;
const { Option } = Select;

const KeywordOptimization = () => {
  const [platform, setPlatform] = useState("Amazon");
  const [keywordsData, setKeywordsData] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(100); 
  const { productId } = useParams();
  const { makeApiRequest, loading } = useApiRequest();

  const getProductKeywords = async (data) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await makeApiRequest("/products/keywords/", "POST", data, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      if (response.success) {
        message.success("Keywords generated successfully.");
        return response.data.keywords || [];
      } else {
        message.error("Failed to generate keywords.");
        return [];
      }
    } catch (error) {
      message.error("An error occurred while generating keywords.");
      return [];
    }
  };

  const handlePlatformChange = (value) => {
    setPlatform(value);
    console.log(`Platform changed to: ${value}`);
  };

  const handleGenerateKeywords = async () => {
    console.log(`Generating keywords for product ID: ${productId} on platform: ${platform}`);

    const data = {
      product_id: productId,
      num_keywords: 5,
      platform,
    };

    const generatedKeywords = await getProductKeywords(data);

    if (generatedKeywords.keywords) {
      const formattedKeywords = generatedKeywords.keywords.map((keyword, index) => ({
        keyword,
        relevancy_score: generatedKeywords.relevancy_score[index],
        seo_score: generatedKeywords.seo_score[index],
      }));

      setKeywordsData(formattedKeywords);
    }
  };

  const renderTrendIcon = (score) => {
    return score >= 0.5 ? (
      <ArrowUpOutlined style={{ color: "green", marginLeft: "10px" }} />
    ) : (
      <ArrowDownOutlined style={{ color: "red", marginLeft: "10px" }} />
    );
  };

  const handleSelectKeyword = (checked, keyword) => {
    setSelectedKeywords((prev) =>
      checked
        ? [...prev, keyword] // Add to selected
        : prev.filter((k) => k.keyword !== keyword.keyword) // Remove from selected
    );
  };

  const handleDownloadCSV = () => {
    if (selectedKeywords.length === 0) {
      message.error("No keywords selected for download.");
      return;
    }

    const csvData = selectedKeywords.map(({ keyword, relevancy_score, seo_score }) => ({
      Keyword: keyword,
      "Relevancy Score": relevancy_score,
      "SEO Score": seo_score,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "selected_keywords.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedKeywords = keywordsData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: "20px", width: "100%", backgroundColor: "#f9f9fb" }}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Title level={4} style={{ margin: 0, color: "#6a0dad" }}>
            Keyword Optimization
          </Title>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Select
            value={platform}
            onChange={handlePlatformChange}
            style={{ width: 200, marginRight: "10px" }}
          >
            <Option value="Amazon">Amazon</Option>
            <Option value="Shopify">Shopify</Option>
            <Option value="eBay">eBay</Option>
            <Option value="Etsy">Etsy</Option>
          </Select>
          <Button
            type="primary"
            onClick={handleGenerateKeywords}
            loading={loading}
            style={{
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
              marginRight: "10px",
            }}
          >
            Generate Keywords
          </Button>
          <Button
            type="default"
            icon={<DownloadOutlined />}
            onClick={handleDownloadCSV}
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#6a0dad",
              color: "#6a0dad",
            }}
          >
            Download CSV
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            bordered
            style={{
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                  <th style={{ padding: "10px" }}>Select</th>
                  <th style={{ padding: "10px" }}>Keyword</th>
                  <th style={{ padding: "10px" }}>Relevance Score</th>
                  <th style={{ padding: "10px" }}>SEO Score</th>
                </tr>
              </thead>
              <tbody>
                {paginatedKeywords.map(({ keyword, relevancy_score, seo_score }, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px" }}>
                      <Checkbox
                        onChange={(e) =>
                          handleSelectKeyword(e.target.checked, {
                            keyword,
                            relevancy_score,
                            seo_score,
                          })
                        }
                      />
                    </td>
                    <td style={{ padding: "10px" }}>{keyword}</td>
                    <td style={{ padding: "10px" }}>
                      {relevancy_score} {renderTrendIcon(relevancy_score)}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {seo_score} {renderTrendIcon(seo_score)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={keywordsData.length}
              onChange={handlePageChange}
              style={{ marginTop: "20px", textAlign: "right" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KeywordOptimization;
