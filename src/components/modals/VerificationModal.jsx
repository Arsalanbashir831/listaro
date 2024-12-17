import React, { useState } from "react";
import { Modal, Input, Button, Form, Row, Col, message } from "antd";
import { useApiRequest } from "../../hooks/useApiRequest";


const VerificationModal = ({ visible, onCancel, type, onSuccess }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const { makeApiRequest, loading } = useApiRequest()

  const resetStates = () => {
    setStep(0);
    setEmail("");
    setOtp(new Array(6).fill(""));
    setNewPassword("");
    setConfirmPassword("");
    setResendCount(0);
    setCanResend(true);
  };

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
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

    const response = await makeApiRequest("/auth/resend-otp/", "POST", { email });
    if (response.success) {
      message.success("OTP resent successfully!");
    } else {
      message.error(response.error || "Failed to resend OTP. Please try again.");
    }

    setTimeout(() => setCanResend(true), 30000); // Enable resend after 30 seconds
  };

  // Handle Next Step or Final Submit
  const handleNext = async () => {
    if (type === "forgotPassword" && step === 0) {
      // Step 1: Request password reset
      if (!email) {
        message.error("Please enter your email.");
        return;
      }
      const response = await makeApiRequest("/auth/request-password-reset/", "POST", { email });
      if (response.success) {
        message.success("OTP sent to your email.");
        setStep(1);
      } else {
        message.error(response.error || "Failed to request password reset. Please try again.");
      }
    } else if (step === 1) {
      // Step 2: OTP verification (common for both flows)
      if (otp.join("").length !== 6) {
        message.error("Please enter a valid 6-digit OTP.");
        return;
      }
      if (type === "verification") {
        const response = await makeApiRequest("/auth/verify-otp/", "POST", {
          email,
          otp: otp.join(""),
        });
        if (response.success) {
          message.success("Email verified successfully!");
          onSuccess && onSuccess();
          onCancel();
          resetStates();
        } else {
          message.error(response.error || "OTP verification failed. Please try again.");
        }
      } else {
        setStep(2); // Proceed to reset password step
      }
    } else if (type === "forgotPassword" && step === 2) {
      // Step 3: Reset password
      if (!newPassword || !confirmPassword) {
        message.error("Please fill in all password fields.");
        return;
      }
      if (newPassword !== confirmPassword) {
        message.error("Passwords do not match.");
        return;
      }
      const response = await makeApiRequest("/auth/reset-password/", "POST", {
        email,
        otp: otp.join(""),
        new_password: newPassword,
      });
      if (response.success) {
        message.success("Password reset successfully!");
        onSuccess && onSuccess();
        onCancel();
        resetStates();
      } else {
        message.error(response.error || "Password reset failed. Please try again.");
      }
    }
  };

  return (
    <Modal
      visible={visible}
      title={
        type === "forgotPassword"
          ? ["Forgot Password", "Verify OTP", "Reset Password"][step]
          : "Verify Email"
      }
      onCancel={() => {
        onCancel();
        resetStates();
      }}
      footer={null}
    >
      <Form layout="vertical">
        {type === "forgotPassword" && step === 0 && (
          <Form.Item label="Email" required>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        )}

        {step === 1 && (
          <Form.Item label="OTP" required>
            <Row gutter={8}>
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
                    }}
                  />
                </Col>
              ))}
            </Row>
            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <Button type="link" disabled={!canResend} onClick={handleResendOtp}>
                Resend OTP
              </Button>
              <span>{5 - resendCount} attempts left</span>
            </div>
          </Form.Item>
        )}

        {type === "forgotPassword" && step === 2 && (
          <>
            <Form.Item label="New Password" required>
              <Input.Password
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Confirm New Password" required>
              <Input.Password
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          {step > 0 && (
            <Button onClick={() => setStep(step - 1)} style={{ marginRight: "10px" }}>
              Back
            </Button>
          )}
          <Button type="primary" block onClick={handleNext} loading={loading}>
            {step === 2 || type === "verification" ? "Submit" : "Next"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default VerificationModal;
