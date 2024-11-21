import React, { useState } from "react";
import { Table, Button, Input, Space, Tag, Typography, Modal, Switch } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Subscriptions = () => {
  // State for subscription data
  const [subscriptions, setSubscriptions] = useState([
    {
      key: "1",
      name: "Free Plan",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: ["Basic Support", "Limited Access", "1 Project"],
      editable: false,
    },
    {
      key: "2",
      name: "Pro Plan",
      monthlyPrice: "$24 / month",
      yearlyPrice: "$240 / year",
      features: ["Priority Support", "Unlimited Projects", "Custom Domains"],
      editable: false,
    },
    {
      key: "3",
      name: "Business Plan",
      monthlyPrice: "$99 / month",
      yearlyPrice: "$990 / year",
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
      monthlyPrice: "Custom Pricing",
      yearlyPrice: "Custom Pricing",
      features: [
        "Dedicated Servers",
        "Advanced Security",
        "Custom Integrations",
      ],
      editable: false,
    },
  ]);

  const [isYearly, setIsYearly] = useState(false); // Toggle for monthly/yearly pricing
  const [editingKey, setEditingKey] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedFeatures, setEditedFeatures] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (record) => {
    setEditingKey(record.key);
    setEditedPrice(isYearly ? record.yearlyPrice : record.monthlyPrice);
    setEditedFeatures(record.features.join("\n"));
    setIsModalVisible(true);
  };

  const handleSave = () => {
    const updatedSubscriptions = subscriptions.map((sub) =>
      sub.key === editingKey
        ? {
            ...sub,
            [isYearly ? "yearlyPrice" : "monthlyPrice"]: editedPrice,
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
      title: isYearly ? "Yearly Price" : "Monthly Price",
      dataIndex: isYearly ? "yearlyPrice" : "monthlyPrice",
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
    <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg ">
      <div className="flex items-center justify-between mb-4">
       <h1 className="text-purple-800 font-semibold text-xl">Manage Subscription</h1>

        {/* Toggle between Monthly and Yearly */}
        <Space>
          <span>Monthly</span>
          <Switch
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
            style={{
              backgroundColor: isYearly ? "#6b46c1" : "#d9d9d9",
            }}
          />
          <span>Yearly</span>
        </Space>
      </div>

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
        title={`Edit Subscription (${isYearly ? "Yearly" : "Monthly"})`}
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
