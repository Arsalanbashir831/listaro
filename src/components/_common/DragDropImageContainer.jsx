import React, { useState } from "react";
import { Upload, List, Button } from "antd";
import { InboxOutlined, FileImageOutlined, DeleteOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const DragDropImageContainer = ({ setTempImages }) => {
  const [fileList, setFileList] = useState([]);

  const updateFileList = (newFiles) => {
    // Filter out duplicates based on file name
    const uniqueFiles = newFiles.filter(
      (file) => !fileList.some((existingFile) => existingFile.name === file.name)
    );
    const updatedList = [...fileList, ...uniqueFiles];
    setFileList(updatedList);
    setTempImages(updatedList); // Pass updated list to parent
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    accept: "image/*",
    beforeUpload: (file) => {
      updateFileList([file]);
      return false; 
    },
    onRemove: (file) => {
      const updatedList = fileList.filter((item) => item.name !== file.name);
      setFileList(updatedList);
      setTempImages(updatedList); // Update temp images in parent
    },
    onDrop(e) {
      const droppedFiles = Array.from(e.dataTransfer.files); // Get dropped files
      const filteredFiles = droppedFiles.filter((file) => file.type.startsWith("image/"));
      updateFileList(filteredFiles);
    },
  };

  const handleDelete = (file) => {
    const updatedList = fileList.filter((item) => item.name !== file.name);
    setFileList(updatedList);
    setTempImages(updatedList); // Update temp images in parent
  };

  return (
    <>
      <Dragger {...uploadProps} style={{ maxWidth: "600px", padding: "20px" }} showUploadList={false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: "#6a0dad", fontSize: "48px" }} />
        </p>
        <p className="ant-upload-text" style={{ fontSize: "16px", color: "#595959" }}>
          Click or drag image files to this area to upload
        </p>
        <p className="ant-upload-hint" style={{ color: "#8c8c8c" }}>
          Support for a single or bulk upload. Strictly accept image files only.
        </p>
      </Dragger>

      {fileList.length > 0 && (
        <List
          style={{
            width: "100%",
            maxWidth: "600px",
            marginTop: "20px",
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
          header={<div>Uploaded Images</div>}
          bordered
          dataSource={fileList}
          renderItem={(file) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                  onClick={() => handleDelete(file)}
                >
                  Delete
                </Button>,
              ]}
            >
              <FileImageOutlined style={{ color: "#6a0dad", marginRight: "8px" }} />
              {file.name}
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default DragDropImageContainer;
