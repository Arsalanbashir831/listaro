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
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { DeleteConfirmation } from "../../components/modals/DeleteConfirmation";
import StoreSelector from "../../components/_common/StoreSelector";
import { useRecoilState } from "recoil";
import { selectedStoresState } from "../../state/StoreSelection";

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const { makeApiRequest, loading } = useApiRequest();
  const [searchText, setSearchText] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedStores, setSelectedStores] = useRecoilState(selectedStoresState); // Use recoil state for selected stores

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await makeApiRequest("/products/with-ai-recommendations/", "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        if (response.success) {
          setListing(response.data);
          setFilteredListings(response.data); // Initially, all listings are displayed
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
        setFilteredListings((prev) =>
          prev.filter((item) => item.id !== itemToDelete.id)
        );
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterListings(e.target.value, selectedStores);
  };

  // const filterListings = (search, stores) => {
  //   const filtered = listing.filter((item) => {
  //     const matchesSearch = item.attributes.productName
  //       .toLowerCase()
  //       .includes(search.toLowerCase());
  //     const matchesPlatform =
  //       stores.length === 0 ||
  //       item.platforms.some((p) => stores.includes(p.name)); // Check if platform name is included in selected stores
  //     return matchesSearch && matchesPlatform;
  //   });

  //   setFilteredListings(filtered);
  // };
  const filterListings = (search, stores) => {
    const filtered = listing.filter((item) => {
      const matchesSearch = item.attributes.productName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesAllSelectedStores = stores.every((store) =>
        item.platforms.some((p) => p.name === store)
      ); // Check if the product has all the selected stores
  
      return matchesSearch && (stores.length === 0 || matchesAllSelectedStores);
    });
  
    setFilteredListings(filtered);
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
          <Tooltip title="Preview">
            <Button
              type="text"
              icon={<EyeOutlined style={{ color: "black" }} />}
              onClick={() =>
                navigate(`/dashboard/product-preview/${record.id}`, {
                  state: { product: record },
                })
              }
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "black" }} />}
              onClick={() =>
                navigate(`/dashboard/product-edit/${record.id}`, {
                  state: { product: record },
                })
              }
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "black" }} />}
              onClick={() => handleDeleteClick(record)}
            />
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
            Generated Listings
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
          <StoreSelector />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredListings}
        pagination={{ pageSize: 5 }}
        bordered={false}
        rowKey={(record) => record.id}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-purple-50" : ""
        }
        loading={loading}
      />

      <DeleteConfirmation
        visible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default Home;
