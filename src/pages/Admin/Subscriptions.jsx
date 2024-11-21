import React, { useState } from "react";
import { Table, Button, Input, Space, Tag, Typography, Modal } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Subscriptions = () => {
  // State for subscription data
  const [subscriptions, setSubscriptions] = useState([
    {
      key: "1",
      name: "Free Plan",
      price: "$0",
      features: ["Basic Support", "Limited Access", "1 Project"],
      editable: false,
    },
    {
      key: "2",
      name: "Pro Plan",
      price: "$24 / month",
      features: ["Priority Support", "Unlimited Projects", "Custom Domains"],
      editable: false,
    },
    {
      key: "3",
      name: "Business Plan",
      price: "$99 / month",
      features: [
        "24/7 Support",
        "Dedicated Manager",
        "Team Collaboration Tools",
      ],
      editable: false,
    },
    {
      key: "4",
      name: "Enterprise Plan",
      price: "Custom Pricing",
      features: [
        "Dedicated Servers",
        "Advanced Security",
        "Custom Integrations",
      ],
      editable: false,
    },
  ]);

  // State for editing a subscription
  const [editingKey, setEditingKey] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedFeatures, setEditedFeatures] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (record) => {
    setEditingKey(record.key);
    setEditedPrice(record.price);
    setEditedFeatures(record.features.join("\n"));
    setIsModalVisible(true);
  };

  const handleSave = () => {
    const updatedSubscriptions = subscriptions.map((sub) =>
      sub.key === editingKey
        ? {
            ...sub,
            price: editedPrice,
            features: editedFeatures.split("\n"),
          }
        : sub
    );
    setSubscriptions(updatedSubscriptions);
    setIsModalVisible(false);
    setEditingKey(null);
    setEditedPrice("");
    setEditedFeatures([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingKey(null);
    setEditedPrice("");
    setEditedFeatures([]);
  };

  const columns = [
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Features",
      dataIndex: "features",
      key: "features",
      render: (features) => (
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-md">
      <Title level={3} className="text-purple-800 mb-4">
        Manage Subscriptions
      </Title>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={subscriptions}
        pagination={{ pageSize: 5 }}
        bordered
        style={{
          borderColor: "#e6e6ff",
        }}
      />

      {/* Modal for Editing Subscription */}
      <Modal
        title="Edit Subscription"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleSave}
            className="bg-purple-700"
          >
            Save
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <label htmlFor="price">Price</label>
          <Input
            id="price"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />

          <label htmlFor="features">Features (one per line)</label>
          <Input.TextArea
            id="features"
            rows={4}
            value={editedFeatures}
            onChange={(e) => setEditedFeatures(e.target.value)}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default Subscriptions;
