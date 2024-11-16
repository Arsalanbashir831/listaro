import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import { UploadOutlined, DatabaseOutlined } from "@ant-design/icons";
import DragDropImageContainer from "../../components/_common/DragDropImageContainer";

const { Title, Text } = Typography;

const ImageOptimization = () => {
  const [showDragDrop, setShowDragDrop] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Title level={2} style={{ color: "#6a0dad", marginBottom: "16px" }}>
        Optimize Your Product Images
      </Title>
      <Text
        style={{
          color: "#595959",
          fontSize: "16px",
          marginBottom: "40px",
          maxWidth: "600px",
        }}
      >
        Easily upload a new image or select from your existing listings to
        enhance your image quality and optimize it for better display across
        platforms. Choose an option below to get started.
      </Text>

      {!showDragDrop ? (
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%", maxWidth: "300px" }}
        >
          <Button
            type="primary"
            icon={<UploadOutlined />}
            size="large"
            style={{
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
              width: "100%",
              height: "60px",
              fontSize: "16px",
            }}
            onClick={() => setShowDragDrop(true)}
          >
            Upload New Image
          </Button>
          <Button
            type="primary"
            icon={<DatabaseOutlined />}
            size="large"
            style={{
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
              width: "100%",
              height: "60px",
              fontSize: "16px",
            }}
          >
            Select from Existing Listing
          </Button>
        </Space>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f9f9f9",
            padding: "20px",
          }}
        >
          <DragDropImageContainer />
        </div>
      )}
    </div>
  );
};

export default ImageOptimization;
