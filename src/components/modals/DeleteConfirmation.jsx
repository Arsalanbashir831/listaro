import React, { useState } from "react";
import { Modal, Button, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const DeleteConfirmation = ({ onConfirm, onCancel, visible }) => {
  return (
    <Modal
      visible={visible}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ExclamationCircleOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />
          <span>Confirm Deletion</span>
        </div>
      }
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Text>
        Are you sure you want to delete this item? This action cannot be undone.
      </Text>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button onClick={onCancel} style={{ borderRadius: "5px" }}>
          Cancel
        </Button>
        <Button
          type="primary"
          danger
          onClick={onConfirm}
          style={{ borderRadius: "5px" }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

const DeleteConfirmationContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    console.log("Item deleted");
    setIsModalVisible(false);
    // Add additional logic for deletion
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Button type="primary" danger onClick={showModal}>
        Show Delete Confirmation
      </Button>
      <DeleteConfirmation
        visible={isModalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default DeleteConfirmationContainer;
