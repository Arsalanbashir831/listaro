import React, { useEffect, useState } from "react";
import { Table, Button, Progress, Typography, Tabs, Space, message } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const { Title } = Typography;
const { TabPane } = Tabs;

const AIKEYWORDGENERATION = ({ response }) => {
  const [dataSource, setDataSource] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(() => {
    if (response?.platforms) {
      setPlatforms(response.platforms);
      setSelectedPlatform(response.platforms[0]?.name);
    }
  }, [response]);

  useEffect(() => {
    if (selectedPlatform && response?.platforms) {
      const platformData = response.platforms.find(
        (platform) => platform.name === selectedPlatform
      );

      if (platformData?.generated_keywords) {
        const { keywords, seo_score, relevancy_score } =
          platformData.generated_keywords;

        const formattedData = keywords?.map((keyword, index) => ({
          key: index + 1,
          keyword,
          relevancy: relevancy_score[index],
          seo: seo_score[index],
        }));

        setDataSource(formattedData);
      }
    }
  }, [selectedPlatform, response]);

  const handleRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedKeywords(selectedRows);
    },
  };

  const handleExport = () => {
    if (selectedKeywords.length === 0) {
      message.warning("Please select at least one keyword to export.");
      return;
    }

    const csvData = selectedKeywords?.map((row) => ({
      Keyword: row.keyword,
      "Relevance Score": row.relevancy.toFixed(2),
      "SEO Score": row.seo.toFixed(2),
    }));

    const csvString = Papa.unparse(csvData);

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedPlatform}_Keywords.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("CSV file exported successfully!");
  };

  const columns = [
   
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
    },
    {
      title: "Relevance Score",
      dataIndex: "relevancy",
      key: "relevancy",
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Progress
            percent={value * 100}
            showInfo={false}
            strokeColor="#6a0dad"
            trailColor="#e9d6ff"
            style={{ marginRight: "10px", width: "150px" }}
          />
          {value?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "SEO Score",
      dataIndex: "seo",
      key: "seo",
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Progress
            percent={value * 100}
            showInfo={false}
            strokeColor="#007bff"
            trailColor="#d6ebff"
            style={{ marginRight: "10px", width: "150px" }}
          />
          {value?.toFixed(2)}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          type="primary"
          style={{
            background: "#6a0dad",
            borderColor: "#6a0dad",
            borderRadius: "8px",
            padding: "10px 30px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Optimized Keywords
        </Button>
      </div>

      {/* Tabs for Platforms */}
      <Tabs
        activeKey={selectedPlatform}
        onChange={(key) => setSelectedPlatform(key)}
        style={{ marginBottom: "20px" }}
      >
        {platforms?.map((platform) => (
          <TabPane tab={platform.name} key={platform.name} />
        ))}
      </Tabs>

      {/* Actions */}
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        <Space>
          <Button
            icon={<ExportOutlined />}
            style={{
              borderRadius: "8px",
            }}
            onClick={handleExport}
          >
            Export
          </Button>
        </Space>
      </div>

      {/* Scrollable Table */}
      <div
        style={{
          maxHeight: "600px",
          overflowY: "scroll",
          border: "1px solid #e8e8e8",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: "checkbox",
            ...handleRowSelection,
          }}
          pagination={false}
          bordered={false}
          scroll={{ y: 600 }} // Enable vertical scrolling
          sticky // Make the header sticky
          style={{
            background: "#fff",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        />
      </div>
    </div>
  );
};

export default AIKEYWORDGENERATION;
