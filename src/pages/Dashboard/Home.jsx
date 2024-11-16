import { useState } from "react";
import { Table, Button, Dropdown, Menu, Space, Typography, Row, Col, Card, Tag, Input } from "antd";
import { DownOutlined, PlusOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { FaChevronCircleDown, FaPlusCircle } from "react-icons/fa";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  
  // Dummy data for the table
  const data = [
    {
      key: "1",
      title: "Sample Product 1",
      status: "Active",
      price: "$20.00",
    },
    {
      key: "2",
      title: "Sample Product 2",
      status: "Inactive",
      price: "$15.00",
    },
    {
      key: "3",
      title: "Sample Product 3",
      status: "Pending",
      price: "$25.00",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Columns for the table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>, // Make titles clickable
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => {
        const color = status === "Active" ? "green" : status === "Inactive" ? "volcano" : "geekblue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Options",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={actionMenu}>
          <Button type="default" className="text-purple-600 hover:text-purple-800">
            Options <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // Dropdown menu for row actions
  const actionMenu = (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  // Create Listing Dropdown menu
  const createListingMenu = (
    <Menu>
      <Menu.Item key="amazon">Amazon Seller Account</Menu.Item>
      <Menu.Item key="ebay">Ebay Account</Menu.Item>
      <Menu.Item key="walmart">Walmart Account</Menu.Item>
    </Menu>
  );

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((item) => item.title.toLowerCase().includes(value));
    setFilteredData(filtered);
  };

  // Download CSV functionality
  const downloadCSV = () => {
    const csvData = filteredData.map((item) => ({
      Title: item.title,
      Status: item.status,
      Price: item.price,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "product_listings.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <Row justify="space-between" align="middle" className="mb-6">
        <Col>
          <Title level={3} style={{ color: "#6a0dad" }}>
            Product Listings
          </Title>
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="Search listings"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              className="w-60"
              style={{ borderColor: "#6a0dad" }}
            />
            <Button
              onClick={downloadCSV}
              type="default"
              icon={<DownloadOutlined />}
              className="text-purple-600 hover:text-purple-800"
            >
              Download CSV
            </Button>
            <Button
              onClick={() => navigate("/addListing")}
              type="primary"
              icon={<FaPlusCircle />}
              className="bg-purple-700 border-purple-700 hover:bg-purple-800"
            >
              Create Listing
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Table Section */}
      <Card bordered={false} className="shadow-md">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          bordered
          rowClassName={(record, index) => (index % 2 === 0 ? "bg-purple-50" : "")}
        />
      </Card>
    </div>
  );
};

export default Home;
