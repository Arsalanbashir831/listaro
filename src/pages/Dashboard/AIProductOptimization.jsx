import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, Spin, message, Row, Col } from "antd";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useParams } from "react-router-dom";

import AIGENPRODUCT from "../../components/_common/AI-Generation-Product";
import AIKEYWORDGENERATION from "../../components/_common/AI-Keyword-Generation";

const { Title } = Typography;

const AIProductOptimization = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const { makeApiRequest, loading } = useApiRequest();

  const fetchProduct = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await makeApiRequest(`/products/${productId}/`, "GET", {}, {
        Authorization: `Bearer ${token}`,
      });
      if (response.success) {
        setProductData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAiResponse = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await makeApiRequest(
        "/products/recommendation/",
        "POST",
        {
          product_id: productId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchKeywords = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await makeApiRequest(
        "/products/keywords/",
        "POST",
        {
          product_id: productId,
          num_keywords: 50,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerateAI = async () => {
    setLoadingAI(true);
    try {
      await getAiResponse();
      await fetchKeywords();
      await fetchProduct();
      message.success("AI generation completed successfully!");
    } catch (error) {
      console.error("Error during AI generation:", error);
      message.error("Failed to generate AI recommendations.");
    } finally {
      setLoadingAI(false);
      setIsModalVisible(false);
    }
  };

  const handleCancelAI = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Modal
        title="AI Product Optimization"
        visible={isModalVisible}
        onOk={handleGenerateAI}
        onCancel={handleCancelAI}
        okText="Generate AI Recommendations"
        cancelText="Cancel"
        confirmLoading={loadingAI}
      >
        <p>Do you want to generate AI recommendations for this product?</p>
        <p>
          This will include optimized product details and keywords for enhanced
          performance.
        </p>
      </Modal>

      {/* Main Content */}
      <div style={{ padding: "20px", maxWidth: "100%", margin: "auto" }}>
        {loading || loadingAI ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div
                style={{
                  height: "100%",
                  border: "1px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                }}
              >
                <AIGENPRODUCT productId={productId} generatedData={productData} />
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  height: "100%",
                  border: "1px solid #e8e8e8",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                }}
              >
                <AIKEYWORDGENERATION response={productData} />
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default AIProductOptimization;
