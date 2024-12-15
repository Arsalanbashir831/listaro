import React, { useState } from "react";
import { Table, Button, Upload, message, Input, Space, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Option } = Select;

const ImportCSV = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [file, setFile] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("amazon"); // Default platform
  const { makeApiRequest, loading } = useApiRequest();

  // Handle CSV upload and parse
  const handleUpload = (file) => {
    setFile(file);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data;
        if (parsedData.length === 0) {
          message.error("CSV file is empty or not formatted correctly.");
          return;
        }
        const headers = Object.keys(parsedData[0]);
        const columnData = headers.map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
          render: (text, record, rowIndex) =>
            editingRowIndex === rowIndex ? (
              <Input
                defaultValue={text}
                onChange={(e) =>
                  handleUpdateRowValue(rowIndex, header, e.target.value)
                }
              />
            ) : (
              text
            ),
        }));
        setColumns(columnData);
        setData(parsedData);
        message.success("CSV file uploaded successfully.");
      },
      error: function () {
        message.error("Failed to parse CSV file.");
      },
    });
  };

  // Add a new row to the table
  const handleAddRow = () => {
    const newRow = {};
    columns.forEach((column) => {
      newRow[column.dataIndex] = "";
    });
    setData([...data, newRow]);
    setEditingRowIndex(data.length);
  };

  // Update row value
  const handleUpdateRowValue = (rowIndex, fieldName, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][fieldName] = value;
    setData(updatedData);
  };

  // Confirm the row editing
  const handleConfirmRow = () => {
    setEditingRowIndex(null);
    message.success("New row confirmed successfully!");
  };

  // Confirm the bulk listing by uploading the updated CSV
  const handleConfirmListing = async () => {
    const csvData = Papa.unparse(data);
    let csvFile;

    if (file && !(file instanceof Blob)) {
      csvFile = file;
    } else {
      csvFile = new File([csvData], file?.name || "updated_file.csv", {
        type: "text/csv",
      });
    }

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("platform", selectedPlatform);

    try {
      const response = await makeApiRequest(
        "/products/upload/",
        "POST",
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.success) {
        message.success("Bulk listing confirmed!");
        setData([]);
        setColumns([]);
        setFile(null);
      } else {
        message.error("Failed to confirm bulk listing. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred during bulk listing.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
        background: "#f9f9fb",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Upload
        accept=".csv"
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
      >
        <Button
          icon={<UploadOutlined />}
          type="primary"
          style={{ backgroundColor: "#6a0dad", borderColor: "#6a0dad" }}
        >
          Upload CSV File
        </Button>
      </Upload>

      {/* Platform Selection */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ marginRight: "10px" }}>Select Platform:</label>
        <Select
          defaultValue={selectedPlatform}
          style={{ width: 200 }}
          onChange={(value) => setSelectedPlatform(value)}
        >
          <Option value="amazon">Amazon</Option>
          <Option value="ebay">eBay</Option>
          <Option value="etsy">Etsy</Option>
          <Option value="wix">Wix</Option>
          <Option value="shopify">Shopify</Option>
          <Option value="squarespace">Squarespace</Option>
        </Select>
      </div>

      {data.length > 0 && (
        <>
          <Table
            dataSource={data}
            columns={columns}
            rowKey={(record, index) => index}
            pagination={false}
            bordered
            style={{ marginTop: "20px" }}
          />

          <Space
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {editingRowIndex !== null && (
              <Button
                type="primary"
                onClick={handleConfirmRow}
                style={{ backgroundColor: "#6a0dad", borderColor: "#6a0dad" }}
              >
                Confirm New Row
              </Button>
            )}
            <Button
              type="primary"
              onClick={handleConfirmListing}
              loading={loading}
              style={{ backgroundColor: "#6a0dad", borderColor: "#6a0dad" }}
            >
              Confirm Bulk Listing
            </Button>
          </Space>
        </>
      )}
    </div>
  );
};

export default ImportCSV;