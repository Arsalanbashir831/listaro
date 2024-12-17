import React, { useState } from "react";
import { Input, Button, Typography, Row, Col, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";

const { Title, Text } = Typography;

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [loading, setLoading] = useState(false);
  const { makeApiRequest } = useApiRequest();
  const location = useLocation()
  const {email} = location.state
 const navigation = useNavigate()

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last entered digit
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCount >= 5) {
      message.error("You have reached the maximum resend attempts.");
      return;
    }

    setResendCount(resendCount + 1);
    setCanResend(false);

    try {
      const response = await makeApiRequest("/auth/resend-otp/", "POST", { email });
      if (response.success) {
        message.success("OTP resent successfully!");
      } else {
        message.error(response.error || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred while resending OTP. Please try again.");
    } finally {
      setTimeout(() => setCanResend(true), 30000); // Enable resend after 30 seconds
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      message.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await makeApiRequest("/auth/verify-otp/", "POST", {
        email,
        otp: otpValue,
      });

      if (response.success) {
        message.success("Email verified successfully!");
        navigation('/auth')
      } else {
        message.error(response.error || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred while verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center", color: "#6a0dad" }}>
        Verify Your Identity
      </Title>
      <Text style={{ display: "block", textAlign: "center", color: "gray", marginBottom: "20px" }}>
        We sent a 6-digit code to <strong>{email}</strong>. Enter it below to verify your identity
        and secure your account.
      </Text>

      <Row gutter={8} justify="center">
        {otp.map((digit, index) => (
          <Col key={index} span={4}>
            <Input
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              maxLength={1}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
                borderRadius: "8px",
              }}
            />
          </Col>
        ))}
      </Row>

      <Button
        type="primary"
        block
        onClick={handleVerify}
        loading={loading}
        style={{
          marginTop: "20px",
          backgroundColor: "#6a0dad",
          borderColor: "#6a0dad",
          fontWeight: "bold",
        }}
      >
        Verify
      </Button>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button type="link" disabled={!canResend} onClick={handleResendOtp}>
          Resend OTP
        </Button>
        <Text style={{ color: "gray" }}>{5 - resendCount} attempts left</Text>
      </div>

      <Text
        style={{
          display: "block",
          textAlign: "center",
          color: "gray",
          fontSize: "12px",
          marginTop: "20px",
        }}
      >
        For your security, this OTP will expire in 5 minutes. Never share your OTP with anyone.
      </Text>
    </div>
  );
};

export default OtpVerification;
