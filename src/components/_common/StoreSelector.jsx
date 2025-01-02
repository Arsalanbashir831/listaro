import React, { useState } from "react";
import { Dropdown, Button, Menu, Tag, Checkbox, Input } from "antd";
import { DownOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { selectedStoresState } from "../../state/StoreSelection";
import { useRecoilState } from "recoil";

const StoreSelector = () => {
  // const [selectedStores, setSelectedStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedStores, setSelectedStores] = useRecoilState(selectedStoresState);
  const stores = ["Amazon", "Shopify", "eBay", "Walmart", "Etsy", "Wix", "SquareSpace", "Woocommerce"];

  const toggleStoreSelection = (store) => {
    if (selectedStores.includes(store)) {
      setSelectedStores(selectedStores.filter((s) => s !== store));
    } else {
      setSelectedStores([...selectedStores, store]);
    }
  };

  const filteredStores = stores.filter((store) =>
    store.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menu = (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        width: "280px",
      }}
    >
    
      {/* Close Button at the Top */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
      <div className="flex items-center justify-between w-full">
      <h1> Select Stores</h1>
      <Button
          type="text"
          icon={<CloseOutlined />}
          style={{
            fontSize: "14px",
            color: "#a0a0a0",
            hover: { color: "#000" },
          }}
          onClick={() => setIsDropdownVisible(false)}
        />
      </div>
        
      </div>

      {/* Search Input */}
      <Input
        placeholder="Search stores..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "12px",
        }}
      />

      {/* Store List */}
      <Menu>
        {filteredStores.map((store) => (
          <Menu.Item
            key={store}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              margin: "4px 0",
              background: selectedStores.includes(store) ? "#f0f0f0" : "transparent",
              color: "#333",
            }}
            onClick={() => toggleStoreSelection(store)}
          >
            <Checkbox checked={selectedStores.includes(store)}>{store}</Checkbox>
            {selectedStores.includes(store) && <CheckOutlined style={{ color: "#6a0dad", marginLeft: "8px" }} />}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" , alignItems:'flex-end' }}>
      {/* Dropdown Button */}
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={isDropdownVisible}
        onVisibleChange={(visible) => setIsDropdownVisible(visible)}
      >
         <Button style={{width:'150px' ,}}  onClick={() => setIsDropdownVisible(true)}>
          Stores ({selectedStores.length}) <DownOutlined />
        </Button>
      </Dropdown>

      {/* Selected Stores Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {selectedStores.map((store) => (
          <Tag
            closable
            key={store}
            onClose={() => toggleStoreSelection(store)}
            style={{
              background: "#f4e8ff",
              color: "#6a0dad",
              border: "1px solid #d0b6ff",
              borderRadius: "8px",
            }}
          >
            {store}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default StoreSelector;
