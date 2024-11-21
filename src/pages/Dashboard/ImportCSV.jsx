import React, { useState } from "react";
import { Table, Button, Upload, message, Input, Space } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const ImportCSV = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const handleUpload = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data;
        const headers = Object.keys(parsedData[0] || {});
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
      },
      error: function () {
        message.error("Failed to parse CSV file.");
      },
    });
  };

  const handleAddRow = () => {
    const newRow = {};
    columns.forEach((column) => {
      newRow[column.dataIndex] = ""; // Initialize dummy fields
    });
    setData([...data, newRow]);
    setEditingRowIndex(data.length); // Set the last row as editable
  };

  const handleUpdateRowValue = (rowIndex, fieldName, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][fieldName] = value;
    setData(updatedData);
  };

  const handleConfirmRow = () => {
    setEditingRowIndex(null);
    message.success("New row confirmed successfully!");
  };

  const handleConfirmListing = () => {
    console.log("Final Data for Bulk Listing:", data);
    message.success("Bulk listing confirmed!");
  };

  return (
    <div className="container mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Import Your CSV File</h2>

      {/* Upload Section */}
      <Upload
        accept=".csv"
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
      >
        <Button icon={<UploadOutlined />} type="primary"  className="mb-6 bg-purple-800">
          Upload CSV File
        </Button>
      </Upload>

      {/* Table Section */}
      {data.length > 0 && (
        <>
          <Table
            dataSource={data}
            columns={columns}
            rowKey={(record, index) => index}
            pagination={false}
            bordered
          />

          {/* Actions Section */}
          <Space className="mt-6" size="middle">
            <Button icon={<PlusOutlined />} type="dashed" onClick={handleAddRow}>
              Add Row
            </Button>
            {editingRowIndex !== null && (
              <Button
                type="primary"
                onClick={handleConfirmRow}
                className="bg-purple-800 text-white"
              >
                Confirm New Row
              </Button>
            )}
            <Button
              type="primary"
              onClick={handleConfirmListing}
              className="bg-purple-800 text-white"
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
