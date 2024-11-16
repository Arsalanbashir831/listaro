import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  Divider,
  Row,
  Col,
  Switch,
  Space,
  Avatar,
  Form,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content } = Layout;

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile settings saved!");
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f9f9f9", padding: "20px" }}>
      <Content style={{ maxWidth: "100%" }}>
        <Title level={3} style={{ textAlign: "left", color: "#6a0dad", marginBottom: "20px" }}>
          Profile Settings
        </Title>
        <Divider />

        {/* Profile Avatar Section */}
        <Row justify="start" style={{ marginBottom: "40px" }}>
          <Col style={{ textAlign: "center" }}>
            <Avatar size={100} icon={<UserOutlined />} />
            <Button type="link" style={{ marginTop: "10px", color: "#6a0dad" }}>
              Change Avatar
            </Button>
          </Col>
        </Row>

        {/* Profile Information */}
        <Form layout="vertical">
          <Title level={4} style={{ marginBottom: "20px", color: "#6a0dad" }}>
            Personal Information
          </Title>
          <Row gutter={24} style={{ marginBottom: "20px" }}>
            <Col span={12}>
              <Form.Item label="First Name">
                <Input placeholder="John" disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name">
                <Input placeholder="Doe" disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "20px" }}>
            <Col span={12}>
              <Form.Item label="Email Address">
                <Input placeholder="johndoe@example.com" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone Number">
                <Input placeholder="+1234567890" disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>

          {/* Security Settings */}
          <Divider />
          <Title level={4} style={{ marginBottom: "20px", color: "#6a0dad" }}>
            Security Settings
          </Title>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Password">
                <Button type="primary" icon={<LockOutlined />} style={{ background: "#6a0dad", borderColor: "#6a0dad" }}>
                  Change Password
                </Button>
              </Form.Item>
            </Col>
           
          </Row>

         

          {/* Save and Cancel Buttons */}
          <Divider />
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
              {isEditing && (
                <Button type="primary" onClick={handleSave} style={{ background: "#6a0dad", borderColor: "#6a0dad" }}>
                  Save
                </Button>
              )}
            </Space>
          </Row>
        </Form>
      </Content>
    </Layout>
  );
};

export default ProfileSettings;
