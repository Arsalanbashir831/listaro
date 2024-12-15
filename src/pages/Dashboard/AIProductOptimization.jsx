import React, { useState } from "react";
import { Modal, Button, Input, List, Card, Spin, Typography, Alert, message } from "antd";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

const { Title, Text } = Typography;
const { TextArea } = Input;

const AIProductOptimization = () => {
  const { makeApiRequest, loading, error } = useApiRequest();
  const { productId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [productData, setProductData] = useState(null);
  const [editableField, setEditableField] = useState({ field: "", index: null, value: "" });

  const handleGenerateAIProduct = async () => {
    setIsModalVisible(false);
    const token = localStorage.getItem("accessToken");
    const response = await makeApiRequest(
      `/products/recommendation/`,
      "POST",
      { product_id: productId },
      { Authorization: `Bearer ${token}` }
    );

    if (response.success) {
      setProductData(response.data.data);
    } else {
      console.error("Error fetching product details:", response.error);
    }
  };

  const handleEdit = (field, index = null, value = "") => {
    setEditableField({ field, index, value });
  };

  const saveEdit = () => {
    if (editableField.index !== null) {
      // Update array fields (features, benefits, specifications)
      setProductData((prev) => ({
        ...prev,
        [editableField.field]: prev[editableField.field].map((item, i) =>
          i === editableField.index ? editableField.value : item
        ),
      }));
    } else {
      // Update non-array fields
      setProductData((prev) => ({
        ...prev,
        [editableField.field]: editableField.value,
      }));
    }
    setEditableField({ field: "", index: null, value: "" });
  };

  const cancelEdit = () => {
    setEditableField({ field: "", index: null, value: "" });
  };

  const handleUpdateAttributes = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await makeApiRequest(
      `/products/update-attributes/`,
      "POST",
      {
        product_id: productId,
        attributes: productData,
      },
      { Authorization: `Bearer ${token}` }
    );

    if (response.success) {
      message.success("Product attributes updated successfully!");
    } else {
      message.error("Failed to update product attributes.");
      console.error(response.error);
    }
  };

  const handleDownloadCSV = () => {
    const csvData = [
      ["Attribute", "Value"],
      ["Title", productData.title],
      ["Description", productData.description],
      ["Overview", productData.overview],
      ["Features", productData.features.join("; ")],
      ["Benefits", productData.benefits.join("; ")],
      ["Specifications", productData.specifications.join("; ")],
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, `Product_${productId}_Attributes.csv`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <Modal
        title="AI Product Optimization"
        visible={isModalVisible}
        onOk={handleGenerateAIProduct}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Generate"
        cancelText="Cancel"
      >
        <p>
          Do you want to generate AI-based product optimization for product ID{" "}
          <strong>{productId}</strong>?
        </p>
      </Modal>

      <Title level={2} className="text-purple-700 text-center">
        AI Product Optimization
      </Title>

      {productData ? (
        <Card className="shadow-lg">
          {/* Editable Sections */}
          <div className="mb-6">
            <Text strong className="text-lg">Title:</Text>
            {editableField.field === "title" ? (
              <Input
                value={editableField.value}
                onChange={(e) => setEditableField({ ...editableField, value: e.target.value })}
                onBlur={saveEdit}
                autoFocus
              />
            ) : (
              <Text editable={{ onChange: (value) => handleEdit("title", null, value) }}>
                {productData.title}
              </Text>
            )}
          </div>

          <div className="mb-6">
            <Text strong className="text-lg">Description:</Text>
            {editableField.field === "description" ? (
              <TextArea
                value={editableField.value}
                onChange={(e) => setEditableField({ ...editableField, value: e.target.value })}
                onBlur={saveEdit}
                autoSize
              />
            ) : (
              <Text editable={{ onChange: (value) => handleEdit("description", null, value) }}>
                {productData.description}
              </Text>
            )}
          </div>

          {/* Features, Benefits, and Specifications */}
          {["features", "benefits", "specifications"].map((key) => (
            <div className="mb-6" key={key}>
              <Text strong className="text-lg capitalize">{key}:</Text>
              <List
                dataSource={productData[key]}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <Button
                        size="small"
                        type="link"
                        onClick={() => handleEdit(key, index, item)}
                        className="text-purple-700"
                      >
                        Edit
                      </Button>,
                    ]}
                  >
                    {editableField.field === key && editableField.index === index ? (
                      <Input
                        value={editableField.value}
                        onChange={(e) =>
                          setEditableField({ ...editableField, value: e.target.value })
                        }
                        onBlur={saveEdit}
                        autoFocus
                      />
                    ) : (
                      <Text>{item}</Text>
                    )}
                  </List.Item>
                )}
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button onClick={handleDownloadCSV} className="bg-blue-500 text-white">
              Download CSV
            </Button>
            <Button type="primary" onClick={handleUpdateAttributes} className="bg-purple-700">
              Update Listing
            </Button>
          </div>
        </Card>
      ) : (
        <p className="text-gray-500">
          No product data found. Please confirm to generate AI optimization.
        </p>
      )}
    </div>
  );
};

export default AIProductOptimization;
