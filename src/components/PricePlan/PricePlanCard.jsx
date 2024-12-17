import React from "react";
import { Card, Button, Typography, Divider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";

const PricePlanCard = ({
  id,
  title,
  price,
  description,
  features,
  buttonLabel,
  popular,
  color,
}) => {
  const { Title, Text } = Typography;
  const { makeApiRequest } = useApiRequest();
  const token = localStorage.getItem("accessToken");
  const navigation = useNavigate();

  const handleSubscription = () => {
    if (!token) {
      navigation("/auth");
    } else {
      makeApiRequest(
        "/users/create-checkout-session/",
        "POST",
        { plan_id: id },
        {
          Authorization: `Bearer ${token}`,
        }
      ).then((data)=>{
        console.log(data.data)
        window.location.href=data.data.checkout_url
      }).catch((e)=>{console.log(e);
      })
    }
  };
  const getHighlightedFeature = (feature) => {
    const numberRegex = /\d+(?:,\d{3})*/g;
    if (title === "Standard") {
      return feature;
    }
    const parts = feature.split(numberRegex); 
    const matches = feature.match(numberRegex); 

    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {matches && matches[index] && (
              <span
                style={{
                  color: "purple",
                  fontWeight: "bold",
                  padding: "0px 2px",
                }}
              >
                {matches[index]}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: popular
          ? "0 4px 15px rgba(106, 13, 173, 0.3)"
          : "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            backgroundColor: "#6a0dad",
            color: "white",
            borderRadius: "4px",
            padding: "2px 8px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Popular
        </div>
      )}

      <Title level={4} style={{ color: "#6a0dad", marginBottom: "8px" }}>
        {title}
      </Title>
      <Text
        type="secondary"
        style={{
          display: "block",
          marginBottom: "16px",
          color: "#6a0dad",
          maxHeight: "40px",
        }}
      >
        {description}
      </Text>
      <Title
        level={2}
        style={{ color: "#6a0dad", marginBottom: "16px", marginTop: "60px" }}
      >
        {price}
      </Title>
      <Button
        onClick={handleSubscription}
        type="primary"
        block
        style={{
          backgroundColor: "#6a0dad",
          borderColor: "#6a0dad",
          marginBottom: "16px",
        }}
      >
        {buttonLabel}
      </Button>
      <Divider />
      <ul
        style={{
          textAlign: "left",
          paddingLeft: "0px",
          marginBottom: "16px",
          listStyle: "none",
        }}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              fontSize: "11px",
            }}
          >
            <CheckCircleOutlined
              style={{ color: "#6a0dad", marginRight: "8px" }}
            />
            {getHighlightedFeature(feature)}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PricePlanCard;
