import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Dropdown,
  Menu,
  Space,
  Typography,
  Row,
  Col,
  Card,
  Tag,
  Input,
  Select,
  message,
} from "antd";
import {
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  LineChartOutlined,
  TagsOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { FaChevronCircleDown, FaPlusCircle } from "react-icons/fa";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import  { DeleteConfirmation } from "../../components/modals/DeleteConfirmation";

const { Title } = Typography;
const { Option } = Select;

const Home = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("amazon");
  const { makeApiRequest, loading } = useApiRequest();

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(listing);
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await makeApiRequest("/products/", "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        if (response.success) {
          setListing(response.data);

          // Extract unique platforms dynamically
          const uniquePlatforms = [
            ...new Set(response.data.map((item) => item.platform)),
          ];
          setPlatforms(uniquePlatforms);

          // Set default dynamic columns based on the first item
          if (response.data.length > 0) {
            generateColumns(response.data[0].attributes);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        message.error("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
  }, []);


  const handleDeleteClick = (record) => {
    setItemToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    const token = localStorage.getItem("accessToken");

    try {
      const response = await makeApiRequest(
        `/products/${itemToDelete.id}/`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.success) {
        message.success("Product deleted successfully!");
        setListing((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setIsDeleteModalVisible(false);
        setItemToDelete(null);
      } else {
        message.error(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      message.error("Failed to delete the product. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setItemToDelete(null);
  };
  const generateColumns = (attributes) => {
    const attributeColumns = Object.keys(attributes).map((key) => ({
      title: key.toUpperCase(),
      dataIndex: ["attributes", key],
      key,
    }));

    setDynamicColumns([
      ...attributeColumns,
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Dropdown 
          trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="view"
                  onClick={() =>
                    navigate("/dashboard/product-preview", {
                      state: { product: record },
                    })
                  }
                  icon={<EyeOutlined style={{ color: "#1890ff" }} />}
                >
                  Preview
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    navigate(
                      `/dashboard/product-optimization/${record.id}`
                    )
                  }
                  key="aiOptimize"
                  icon={<LineChartOutlined style={{ color: "#52c41a" }} />}
                >
                  AI Optimization
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    navigate(`/dashboard/keyword-optimization/${record.id}`)
                  }
                  key="keywords"
                  icon={<TagsOutlined style={{ color: "#faad14" }} />}
                >
                  Keywords Optimization
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    navigate("/dashboard/product-edit", {
                      state: { product: record },
                    })
                  }
                  key="edit"
                  icon={<EditOutlined style={{ color: "#ffa940" }} />}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  icon={<DeleteOutlined style={{ color: "#f5222d" }} />}
                  onClick={() => handleDeleteClick(record)}
                >
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="text" className="text-purple-600 hover:text-purple-800">
              Options <FaChevronCircleDown />
            </Button>
          </Dropdown>
        ),
      },
      
    ]);
  };

  useEffect(() => {
    const filtered = listing.filter(
      (item) =>
        (item.platform === selectedPlatform)
    );
    setFilteredData(filtered);

    // Update columns dynamically for the selected platform
    if (filtered.length > 0) {
      generateColumns(filtered[0].attributes);
    }
  }, [searchText, listing, selectedPlatform]);

  const handlePlatformChange = (value) => {
    setSelectedPlatform(value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const downloadCSV = () => {
    const csvData = filteredData.map((item) => ({
      Title: item.title,
      Platform: item.platform,
      Price: item.price,
      Attributes: JSON.stringify(item.attributes),
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <Row justify="space-between" align="middle" className="mb-6">
        <Col>
          <Title level={3} style={{ color: "#6a0dad" }}>
            Product Listings
          </Title>
        </Col>
        <Col>
          <Space>
            <Select
              style={{ width: 200 }}
              onChange={handlePlatformChange}
              value={selectedPlatform}
              placeholder="Select Platform"
            >
              {platforms.map((platform) => (
                <Option key={platform} value={platform}>
                  {platform}
                </Option>
              ))}
            </Select>
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
              onClick={() => navigate("/dashboard/addListing")}
              type="primary"
              icon={<FaPlusCircle />}
              className="bg-purple-700 border-purple-700 hover:bg-purple-800"
            >
              Create Listing
            </Button>
          </Space>
        </Col>
      </Row>

      <Card bordered={false} className="shadow-md">
        <Table className="overflow-x-scroll"
          columns={dynamicColumns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          bordered
          rowClassName={(record, index) =>
            index % 2 === 0 ? "bg-purple-50" : ""
          }
          loading={loading}
        />
      </Card>
      <DeleteConfirmation
        visible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default Home;
