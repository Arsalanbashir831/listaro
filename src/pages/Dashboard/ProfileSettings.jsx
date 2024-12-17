import React, { useContext, useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  Divider,
  Row,
  Col,
  Avatar,
  Form,
  message,
  Space,
  Spin,
  Alert,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserContext";
import { useApiRequest } from "../../hooks/useApiRequest";
import { BASE_URL } from "../../utils/Constants";

const { Title } = Typography;
const { Content } = Layout;

const ProfileSettings = () => {
  const { user, loading, error, setUser } = useContext(UserContext);
  const { makeApiRequest } = useApiRequest();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user?.username || "");
      setProfilePicture(user?.picture || null);
    }
  }, [user]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("username", username);
    if (profilePictureFile) {
      formData.append("picture", profilePictureFile);
    }

    try {
      const response = await makeApiRequest("/users/update-user/", "PATCH", formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });

      if (response.success) {
        message.success("Profile updated successfully!");
        setUser({ ...user, username, picture: profilePicture });
        setIsEditing(false);
      } else {
        throw new Error(response.error || "Failed to update profile");
      }
    } catch (err) {
      message.error(err.message || "An error occurred while updating the profile.");
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = () => {
    message.info("Redirecting to change password page...");
    // Logic to navigate to change password page or trigger a modal
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <Layout
      style={{ minHeight: "100vh", background: "#f9f9f9", padding: "20px" }}
    >
      <Content>
        <Title level={3} style={{ color: "#6a0dad", marginBottom: "20px" }}>
          Profile Settings
        </Title>
        <Divider />

        {/* Profile Avatar Section */}
        <Row style={{ marginBottom: "40px" }}>
          <Col>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{
                display: "none",
              }}
              id="upload-profile-picture"
            />
            <Avatar
              size={100}
              icon={!profilePicture && <UserOutlined />}
              src={BASE_URL + profilePicture || null}
              style={{
                cursor: isEditing ? "pointer" : "not-allowed",
                border: "2px solid #6a0dad",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() =>
                isEditing && document.getElementById("upload-profile-picture").click()
              }
            />
            <Button
              disabled={!isEditing}
              type="link"
              style={{
                marginTop: "10px",
                color: "#6a0dad",
              }}
              onClick={() =>
                document.getElementById("upload-profile-picture").click()
              }
            >
              Change Avatar
            </Button>
          </Col>
        </Row>

        {/* Profile Information */}
        <Form layout="vertical">
          <Title level={4} style={{ color: "#6a0dad", marginBottom: "20px" }}>
            Personal Information
          </Title>
          <Row gutter={24} style={{ marginBottom: "20px" }}>
            <Col span={24}>
              <Form.Item label="Username">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your username"
                  style={{
                    borderRadius: "8px",
                    borderColor: isEditing ? "#6a0dad" : "#d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "20px" }}>
            <Col span={24}>
              <Form.Item label="Email Address">
                <Input
                  value={user?.email || ""}
                  disabled
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Save, Cancel, and Change Password Buttons */}
          <Divider />
          <Row justify="end">
            <Space>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  borderColor: "#6a0dad",
                  color: "#6a0dad",
                  borderRadius: "8px",
                }}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              {isEditing && (
                <Button
                  type="primary"
                  onClick={handleSave}
                  style={{
                    background: "#6a0dad",
                    borderColor: "#6a0dad",
                    borderRadius: "8px",
                  }}
                >
                  Save
                </Button>
              )}
              <Button
                type="default"
                onClick={handleChangePassword}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#6a0dad",
                  color: "#6a0dad",
                  borderRadius: "8px",
                }}
              >
                Change Password
              </Button>
            </Space>
          </Row>
        </Form>
      </Content>
    </Layout>
  );
};

export default ProfileSettings;
