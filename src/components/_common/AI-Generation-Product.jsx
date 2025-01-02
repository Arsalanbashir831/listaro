import React, { useState } from "react";
import {
  Button,
  Typography,
  Divider,
  Input,
  message,
  List,
  Tabs,
  Form,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const AIGENPRODUCT = ({ generatedData, productId }) => {
  const { makeApiRequest } = useApiRequest();
  const [selectedPlatform, setSelectedPlatform] = useState(
    generatedData?.platforms?.[0]?.name || "Amazon"
  );
  const [platformData, setPlatformData] = useState(generatedData?.platforms);

  const handleExport = () => {
    const currentPlatform = platformData.find(
      (platform) => platform.name === selectedPlatform
    );
    const generatedAttributes = currentPlatform.generated_attributes;

    if (!generatedAttributes) {
      message.error("No data available to export.");
      return;
    }

    const csvData = [
      ["Field", "Value"],
      ["Title", generatedAttributes.title],
      ["Description", generatedAttributes.description],
      ["Features", generatedAttributes.features.join("; ")],
      ["Specifications", generatedAttributes.specifications.join("; ")],
      ["Benefits", generatedAttributes.benefits.join("; ")],
    ];

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${selectedPlatform}_ProductDetails.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("CSV file exported successfully!");
  };

  const handleSaveChanges = async () => {
    try {
      const response = await makeApiRequest(
        `/products/${productId}/`,
        "PUT",
        { platforms: platformData },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      );

      if (response.success) {
        message.success("Product updated successfully!");
      } else {
        message.error("Failed to update product.");
      }
    } catch (error) {
      message.error("An error occurred while updating the product.");
    }
  };

  const handleAttributeChange = (platformName, key, value) => {
    setPlatformData((prevPlatforms) =>
      prevPlatforms.map((platform) =>
        platform.name === platformName
          ? {
              ...platform,
              generated_attributes: {
                ...platform?.generated_attributes,
                [key]: value,
              },
            }
          : platform
      )
    );
  };

  const handleListChange = (platformName, key, index, value) => {
    setPlatformData((prevPlatforms) =>
      prevPlatforms.map((platform) => {
        if (platform.name === platformName) {
          const updatedList = [...platform?.generated_attributes[key]];
          updatedList[index] = value;
          return {
            ...platform,
            generated_attributes: {
              ...platform?.generated_attributes,
              [key]: updatedList,
            },
          };
        }
        return platform;
      })
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          type="primary"
          style={{
            background: "#6a0dad",
            borderColor: "#6a0dad",
            borderRadius: "8px",
            padding: "10px 30px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          AI Optimized
        </Button>
      </div>

      <Tabs
        activeKey={selectedPlatform}
        onChange={(key) => setSelectedPlatform(key)}
        type="card"
      >
        {platformData?.map((platform) => (
          <TabPane tab={platform.name} key={platform.name}>
            <div
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fff",
              }}
            >
              <div className="flex justify-between">
                <Title level={4}>Product Details - {platform?.name}</Title>
                <Button
                  icon={<DownloadOutlined />}
                  style={{ marginRight: "10px", borderRadius: "8px" }}
                  onClick={handleExport}
                >
                  Export
                </Button>
              </div>
              <Divider />

              <Form layout="vertical">
                <Form.Item label={<Text strong>Title</Text>}>
                  <Input
                    value={platform?.generated_attributes.title}
                    onChange={(e) =>
                      handleAttributeChange(
                        platform?.name,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label={<Text strong>Description</Text>}>
                  <Input.TextArea
                    value={platform?.generated_attributes.description}
                    onChange={(e) =>
                      handleAttributeChange(
                        platform?.name,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label={<Text strong>Features</Text>}>
                  <List
                    dataSource={platform?.generated_attributes.features}
                    renderItem={(item, index) => (
                      <List.Item>
                        <Input
                          value={item}
                          onChange={(e) =>
                            handleListChange(
                              platform?.name,
                              "features",
                              index,
                              e.target.value
                            )
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Form.Item>

                <Form.Item label={<Text strong>Specifications</Text>}>
                  <List
                    dataSource={platform.generated_attributes.specifications}
                    renderItem={(item, index) => (
                      <List.Item>
                        <Input
                          value={item}
                          onChange={(e) =>
                            handleListChange(
                              platform.name,
                              "specifications",
                              index,
                              e.target.value
                            )
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Form.Item>

                <Form.Item label={<Text strong>Benefits</Text>}>
                  <List
                    dataSource={platform?.generated_attributes.benefits}
                    renderItem={(item, index) => (
                      <List.Item>
                        <Input
                          value={item}
                          onChange={(e) =>
                            handleListChange(
                              platform.name,
                              "benefits",
                              index,
                              e.target.value
                            )
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  onClick={handleSaveChanges}
                  style={{
                    background: "#6a0dad",
                    borderColor: "#6a0dad",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                >
                  Save Changes
                </Button>
              </Form>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default AIGENPRODUCT;
