import { useState } from "react";
import { Steps, Select, Button, Typography, Space } from "antd";

const { Step } = Steps;
const { Option } = Select;
const { Text } = Typography;

const StepsInput = () => {
  const [current, setCurrent] = useState(0);
  const [platform, setPlatform] = useState("");
  const [product, setProduct] = useState("");
  
  const platforms = ["Amazon", "eBay", "Walmart"];
  const productList = ["Product 1", "Product 2", "Product 3"];

  

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const stepContent = () => {
    switch (current) {
      case 0:
        return (
          <div>
            <Text strong>Select Platform</Text>
            <Select
              placeholder="Select a platform"
              style={{ width: "100%", marginTop: 10 }}
              onChange={(value) => setPlatform(value)}
              value={platform}
            >
              {platforms.map((p) => (
                <Option key={p} value={p}>
                  {p}
                </Option>
              ))}
            </Select>
          </div>
        );
      case 1:
        return (
          <div>
            <Text strong>Select Product</Text>
            <Select
              placeholder="Select a product"
              style={{ width: "100%", marginTop: 10 }}
              onChange={(value) => setProduct(value)}
              value={product}
            >
              {productList.map((p) => (
                <Option key={p} value={p}>
                  {p}
                </Option>
              ))}
            </Select>
          </div>
        );
      case 2:
        return (
          <div>
            <Button
              type="primary"
              className="bg-purple-700"
              style={{ marginTop: 10 }}
              onClick={generateKeywords}
            >
              Generate
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Steps
        current={current}
        direction="vertical"
        className="custom-steps" // Add a custom class for steps
      >
        <Step title="Select Platform" />
        <Step title="Select Product" />
        <Step title="Generate Keywords" />
      </Steps>
      <div
        style={{
          marginTop: 20,
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
      >
        {stepContent()}
      </div>
      <Space style={{ marginTop: 20 }}>
        {current > 0 && (
          <Button onClick={prev} style={{ marginRight: 8 }}>
            Previous
          </Button>
        )}
        {current < 2 && (
          <Button type="primary" className="bg-purple-700" onClick={next}>
            Next
          </Button>
        )}
      </Space>
    </div>
  );
};

export default StepsInput;
