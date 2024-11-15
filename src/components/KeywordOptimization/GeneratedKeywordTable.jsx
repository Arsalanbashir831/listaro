import  { useState } from "react";
import { Table, Checkbox, Space, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const { Title } = Typography;

const GeneratedKeywordTable = ({ platform, keywords }) => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // Table columns
  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedKeywords.includes(record.keyword)}
          onChange={() => handleSelect(record.keyword)}
        />
      ),
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
    },
    {
      title: "Relevance Score",
      dataIndex: "score",
      key: "score",
    },
  ];

  // Handle keyword selection
  const handleSelect = (keyword) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((item) => item !== keyword)
        : [...prevSelected, keyword]
    );
  };

  // Download selected keywords as CSV
  const handleDownloadCSV = () => {
    const csvData = selectedKeywords.map((keyword) => ({ keyword }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${platform}_keywords.csv`;
    link.click();
  };

  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <Title level={4}>{platform} Generated Keywords</Title>
        <DownloadOutlined 
          onClick={handleDownloadCSV} 
          style={{
            fontSize: '20px', 
            color: selectedKeywords.length > 0 ? '#6a0dad' : '#d9d9d9',
            cursor: selectedKeywords.length > 0 ? 'pointer' : 'not-allowed'
          }}
          disabled={selectedKeywords.length === 0}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={keywords.map((keyword, index) => ({
          key: index,
          keyword: keyword.keyword,
          score: keyword.score,
        }))}
        pagination={{ pageSize: 5 }}
        rowKey="keyword"
        rowClassName={(record, index) => (index % 2 === 0 ? "bg-gray-50" : "")}
        bordered
      />
    </div>
  );
};

export default GeneratedKeywordTable;
