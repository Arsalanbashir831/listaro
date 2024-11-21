import React, { useState } from "react";
import { Table, Tag, Button, Input, Space, Avatar } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";

const Users = () => {
  const [searchText, setSearchText] = useState("");

  // Dummy data
  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      subscription: "Pro",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      subscription: "Free",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      key: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      subscription: "Business",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      key: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      subscription: "Enterprise",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      key: "5",
      name: "Daniel Wilson",
      email: "daniel.wilson@example.com",
      subscription: "Pro",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  // Table columns
  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <span style={{ color: "#6b46c1", fontWeight: "bold" }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription) => {
        let color = "green";
        if (subscription === "Free") color = "gray";
        else if (subscription === "Pro") color = "purple";
        else if (subscription === "Business") color = "blue";
        else if (subscription === "Enterprise") color = "gold";
        return (
          <Tag color={color} key={subscription}>
            {subscription.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
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
            style={{ color: "#6b46c1" }}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Filtered data based on search text
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg ">
      <h2 className="text-xl font-semibold text-purple-800 mb-4">
        User Management
      </h2>

      {/* Search Input */}
      <Space
        style={{
          marginBottom: "16px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Input
          placeholder="Search users by name or email..."
          prefix={<SearchOutlined style={{ color: "#6b46c1" }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
            borderColor: "#6b46c1",
          }}
        />
      </Space>

      {/* User Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        bordered
        style={{
          borderColor: "#e6e6ff",
        }}
      />
    </div>
  );
};

export default Users;
