import React, { useState } from "react";
import { Upload, message, Table, Button, Tooltip, Alert } from "antd";
import { InboxOutlined, RobotOutlined } from "@ant-design/icons";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;

const ImportCSV = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [file, setFile] = useState(null);
  const { makeApiRequest } = useApiRequest();
  const [isDraggerVisible, setIsDraggerVisible] = useState(true); // Visibility state for Dragger
const navigation = useNavigate()
  // Handle CSV upload and send to API
  const handleUpload = async (file) => {
    const token = localStorage.getItem('accessToken')
    setFile(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await makeApiRequest("/products/upload/", "POST", formData, {
        "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${token}`
      });

      if (response.success) {
        const responseData = response.data;
        navigation('/dashboard/history-products')
        // Generate table columns dynamically based on the response
        const headers = Object.keys(responseData[0]?.attributes || {});
        const columnData = headers.map((header) => ({
          title: header.charAt(0).toUpperCase() + header.slice(1),
          dataIndex: ["attributes", header],
          key: header,
        }));

        // Add Platforms column
        columnData.push({
          title: "Platforms",
          key: "platforms",
          render: (_, record) =>
            record.platforms.map((platform) => (
              <span
                key={platform.id}
                style={{
                  display: "inline-block",
                  margin: "2px 4px",
                  padding: "4px 8px",
                  backgroundColor: "#e9d6ff",
                  color: "#7e22ce",
                  borderRadius: "4px",
                }}
              >
                {platform.name}
              </span>
            )),
        });

        // Add Actions column
        columnData.push({
          title: "Actions",
          key: "actions",
          render: (_, record) => (
            <Tooltip title="AI Generation">
              <Button
                type="primary"
                shape="circle"
                icon={<RobotOutlined />}
                onClick={() => handleAIGeneration(record)}
              />
            </Tooltip>
          ),
        });

        setColumns(columnData);
        setData(responseData);
        setIsDraggerVisible(false); // Hide Dragger container
        message.success("CSV uploaded and data loaded successfully.");
      } else {
        message.error(`Upload failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
      message.error("Failed to upload the CSV. Please try again.");
    }
    return false; // Prevent default upload behavior
  };

  // Handle AI Generation action
  const handleAIGeneration = async (record) => {
    try {
      const response = await makeApiRequest("/ai/generate", "POST", record, {
        "Content-Type": "application/json",
      });

      if (response.success) {
        message.success("AI generation successful!");
      } else {
        message.error(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      message.error("Failed to perform AI generation. Please try again.");
    }
  };

  const infoMessage = (
    <Alert
      className="my-5"
      message="CSV Format Required"
      description={
        <>
          <p>
            The uploaded CSV file should contain the following columns:
            <ul>
              <li><b>Product Name:</b> The name of the product.</li>
              <li><b>Brand Name:</b> The brand of the product.</li>
              <li><b>Price:</b> The price in USD.</li>
              <li><b>Category:</b> The category of the product.</li>
              <li><b>Description:</b> A brief description of the product.</li>
              <li><b>Platforms:</b> A pipe-separated list of platforms (e.g., "Amazon|eBay|Walmart").</li>
            </ul>
          </p>
        </>
      }
      type="info"
      showIcon
      style={{ marginBottom: "20px" }}
    />
  );

  return (
    <>
      {/* Info Section */}
      {infoMessage}

      {isDraggerVisible && ( // Conditional rendering for Dragger
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            height: "70vh",
            background: "#fff",
            position: "relative",
          }}
        >
          <div
            style={{
              padding: "20px",
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              background: "#fff",
            }}
          >
            <Dragger
              accept=".csv"
              showUploadList={false}
              beforeUpload={handleUpload}
              style={{
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: "32px", color: "#6a0dad" }} />
              </p>
              <p className="ant-upload-text">
                Drag and drop a CSV file here, or click to browse.
              </p>
              <p className="ant-upload-hint">
                Only CSV files are accepted. Ensure the file is properly formatted.
              </p>
            </Dragger>
          </div>
        </div>
      )}

      {/* Render Table if data exists */}
      {data.length > 0 && (
        <div style={{ padding: "20px", background: "#fff" }}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record, index) => record.id || index}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </div>
      )}
    </>
  );
};

export default ImportCSV;
