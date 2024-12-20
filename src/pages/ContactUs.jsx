import React from "react";
import { Input, Button, Form, message } from "antd";
import { useApiRequest } from "../hooks/useApiRequest";

const ContactUs = () => {
  const [form] = Form.useForm();
  const { makeApiRequest, loading } = useApiRequest();

  const onFinish = async (values) => {
    try {
      const payload = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        message: values.question,
      };

      const response = await makeApiRequest(
        "/users/send-contact-query/",
        "POST",
        payload,
        { "Content-Type": "application/json" }
      );

      if (response.success) {
        message.success("Your query has been submitted successfully!");
        form.resetFields();
      } else {
        message.error(`Error: ${response.error}`);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Have questions? Fill out the form below, and we'll get back to you as
          soon as possible.
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* First Name */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input placeholder="John" size="large" className="rounded-lg" />
          </Form.Item>

          {/* Last Name */}
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input placeholder="Doe" size="large" className="rounded-lg" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              placeholder="john.doe@example.com"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Question */}
          <Form.Item
            label="Question"
            name="question"
            rules={[
              { required: true, message: "Please enter your question!" },
            ]}
          >
            <Input.TextArea
              placeholder="How can we help you?"
              rows={4}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              className="rounded-lg bg-purple-700 hover:bg-purple-800"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
