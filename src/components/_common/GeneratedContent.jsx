import React, { useState } from "react";
import { Typography, Divider, Image, Button, Tooltip, Input } from "antd";
import {
  CopyOutlined,
  EditOutlined,
  CheckOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Papa from "papaparse";

const { Title, Text, Paragraph } = Typography;

const GeneratedContent = ({
  title = "Sample Product Title",
  description,
  images = [],
  price = 100,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  const [descriptionSections, setDescriptionSections] = useState([
    {
      title: "Overview",
      content:
        "This is an ultra-modern, high-quality product designed to meet your needs and expectations.",
    },
    {
      title: "Features",
      content: "• Sleek and modern design\n• Durable materials\n• User-friendly functionality",
    },
    {
      title: "Benefits",
      content:
        "Experience improved productivity and satisfaction with this state-of-the-art product.",
    },
    {
      title: "Specifications",
      content: "Dimensions: 10x10x10 cm\nWeight: 1.5 kg\nMaterial: Aluminum",
    },
  ]);

  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [editedSectionContent, setEditedSectionContent] = useState("");

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Function to download CSV
  const downloadCSV = () => {
    const csvData = descriptionSections.map((section) => ({
      Section: section.title,
      Content: section.content.replace(/\n/g, " "),
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${editedTitle.replace(/\s+/g, "_")}_listing.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Save edited section content
  const saveEditedSection = () => {
    const updatedSections = [...descriptionSections];
    updatedSections[editingSectionIndex].content = editedSectionContent;
    setDescriptionSections(updatedSections);
    setEditingSectionIndex(null);
    setEditedSectionContent("");
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          style={{
            marginRight: "8px",
            background: "#6b46c1",
            border: "none",
          }}
          onClick={downloadCSV}
        >
          Download CSV
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ background: "#6b46c1", border: "none" }}
        >
          Add to Listing
        </Button>
      </div>

      <Title level={4} style={{ marginBottom: "12px" }}>
        AI-Generated Product Listing
      </Title>
      <Divider style={{ margin: "8px 0" }} />

      {/* Images Section */}
      {images.length > 0 ? (
        images.map((image, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Uploaded Image ${index + 1}`}
            style={{
              marginBottom: "12px",
              borderRadius: "6px",
              maxHeight: "180px",
              objectFit: "cover",
            }}
          />
        ))
      ) : (
        <Image
          src="https://via.placeholder.com/400"
          alt="Dummy Product Image"
          style={{
            marginBottom: "12px",
            borderRadius: "6px",
            maxHeight: "180px",
            objectFit: "cover",
          }}
        />
      )}

      {/* Title Section */}
      <Title level={5} style={{ marginBottom: "8px" }}>
        Product Title
      </Title>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
        {isEditingTitle ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ marginRight: "8px", flex: 1 }}
          />
        ) : (
          <Paragraph style={{ fontSize: "14px", fontWeight: "bold", flex: 1 }}>
            {editedTitle}
          </Paragraph>
        )}
        <Button
          shape="circle"
          icon={isEditingTitle ? <CheckOutlined /> : <EditOutlined />}
          onClick={() => setIsEditingTitle(!isEditingTitle)}
        />
      </div>
      <Divider style={{ margin: "8px 0" }} />

      {/* Price Section */}
      <Title level={5} style={{ marginBottom: "8px" }}>
        Price (USD)
      </Title>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
        {isEditingPrice ? (
          <Input
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            style={{ marginRight: "8px", flex: 1 }}
            type="number"
          />
        ) : (
          <Paragraph style={{ fontSize: "14px", fontWeight: "bold", flex: 1 }}>
            ${editedPrice}
          </Paragraph>
        )}
        <Button
          shape="circle"
          icon={isEditingPrice ? <CheckOutlined /> : <EditOutlined />}
          onClick={() => setIsEditingPrice(!isEditingPrice)}
        />
      </div>
      <Divider style={{ margin: "8px 0" }} />

      {/* Description Section */}
      <Title level={5} style={{ marginBottom: "8px" }}>
        Description
      </Title>
      {descriptionSections.map((section, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text strong style={{ fontSize: "14px" }}>
              {section.title}
            </Text>
            <div>
              <Tooltip title="Copy to clipboard">
                <Button
                  shape="circle"
                  icon={<CopyOutlined />}
                  size="small"
                  style={{ marginRight: "6px" }}
                  onClick={() => copyToClipboard(section.content)}
                />
              </Tooltip>
              <Tooltip title="Edit Section">
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => {
                    setEditingSectionIndex(index);
                    setEditedSectionContent(section.content);
                  }}
                />
              </Tooltip>
            </div>
          </div>
          {editingSectionIndex === index ? (
            <div style={{ marginTop: "8px" }}>
              <Input.TextArea
                rows={3}
                value={editedSectionContent}
                onChange={(e) => setEditedSectionContent(e.target.value)}
                style={{ marginBottom: "8px" }}
              />
              <Button
                type="primary"
                onClick={saveEditedSection}
                style={{ marginRight: "8px", background: "#6b46c1", border: "none" }}
              >
                Save
              </Button>
              <Button onClick={() => setEditingSectionIndex(null)}>Cancel</Button>
            </div>
          ) : (
            <Paragraph style={{ fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-line" }}>
              {section.content}
            </Paragraph>
          )}
        </div>
      ))}
    </div>
  );
};

export default GeneratedContent;
