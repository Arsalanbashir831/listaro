import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Input,
  message,
  Tooltip,
  Tag,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { DeleteConfirmation } from "../../components/modals/DeleteConfirmation";
import StoreSelector from "../../components/_common/StoreSelector";
import { useRecoilState } from "recoil";
import { selectedStoresState } from "../../state/StoreSelection";
import { BiBot } from "react-icons/bi";

const { Title } = Typography;
const { Option } = Select;

const History = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const { makeApiRequest, loading } = useApiRequest();
  const [searchText, setSearchText] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedStores, setSelectedStores] =
    useRecoilState(selectedStoresState);
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkAction, setBulkAction] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await makeApiRequest(
          "/products/without-ai-recommendations/",
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (response.success) {
          setListing(response.data);
          setFilteredListings(response.data);
        } else {
          setListing([]);
          setFilteredListings([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        message.error("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterListings(searchText, selectedStores);
  }, [searchText, selectedStores]);

  const filterListings = (search, stores) => {
    const filtered = listing.filter((item) => {
      const matchesSearch = item.attributes.productName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesAllSelectedStores =
        stores.length === 0 ||
        stores.every((store) => item.platforms.some((p) => p.name === store));

      return matchesSearch && matchesAllSelectedStores;
    });

    setFilteredListings(filtered);
  };

  const handleDeleteRows = async () => {
    const token = localStorage.getItem("accessToken");
    const promises = selectedRows.map((id) =>
      makeApiRequest(`/products/${id}/`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      })
    );

    try {
      await Promise.all(promises);
      message.success("Selected products deleted successfully!");
      setListing((prev) =>
        prev.filter((item) => !selectedRows.includes(item.id))
      );
      setFilteredListings((prev) =>
        prev.filter((item) => !selectedRows.includes(item.id))
      );
      setSelectedRows([]);
      setBulkAction("");
    } catch (error) {
      console.error("Bulk delete failed:", error);
      message.error("Failed to delete selected products. Please try again.");
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterListings(e.target.value, selectedStores);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: ["attributes", "productName"],
      key: "productName",
    },
    {
      title: "Description",
      dataIndex: ["attributes", "description"],
      key: "description",
    },
    {
      title: "Brand Name",
      dataIndex: ["attributes", "brandName"],
      key: "brandName",
    },
    {
      title: "Category",
      dataIndex: ["attributes", "category"],
      key: "category",
    },
    {
      title: "Price",
      dataIndex: ["attributes", "price"],
      key: "price",
      render: (text) => `$${text}`, // Format price with $
    },
    {
      title: "Platforms",
      key: "platforms",
      render: (_, record) => (
        <Space>
          {record.platforms.map((platform) => (
            <Tag
              key={platform.id}
              color="purple" // You can customize the color here
              style={{ fontSize: "12px" }}
            >
              {platform.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="AI Optimization">
            <Button
           type="outlined"
              onClick={() =>
                navigate(`/dashboard/product-optimization/${record.id}`)
              }
             
            >
              <BiBot />
            </Button>
          </Tooltip>

          <Tooltip title="Edit">
            <Button
            type="outlined"
              onClick={() =>
                navigate(`/dashboard/product-edit/${record.id}`)
              }
             
            >
              <EditOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <Row justify="space-between" align="middle" className="mb-6">
        <Col>
          <Title level={3} style={{ color: "#6a0dad" }}>
            Bulk Listings
          </Title>
          <Input
            placeholder="Search listings"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            className="w-60"
            style={{ borderColor: "#6a0dad" }}
          />
        </Col>
        <Col>
          <Space>
            <StoreSelector />
            <Select
              value={bulkAction || undefined} // Value is undefined by default
              onChange={(value) => setBulkAction(value)}
              placeholder="Select Bulk Action" // Placeholder text
              style={{ width: 200 }}
            >
              <Option value="delete">Delete Selected</Option>
            </Select>

            <Button
              type="primary"
              onClick={handleDeleteRows}
              disabled={!selectedRows.length || bulkAction !== "delete"}
            >
              Apply
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredListings}
        pagination={{ pageSize: 5 }}
        bordered={false}
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-purple-50" : ""
        }
        loading={loading}
      />
    </div>
  );
};

export default History;
