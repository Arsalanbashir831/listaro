import React from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SubscriptionModal = ({ visible, onClose, message }) => {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        navigate("/pricing"); // Navigate to the pricing page
    };

    const handleCancel = () => {
        navigate("/dashboard"); // Navigate to the dashboard
        onClose(); // Close the modal
    };

    return (
        <Modal
            title="Subscription Required"
            open={visible} // Use 'open' for antd v5+
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Go to Dashboard
                </Button>,
                <Button key="upgrade" type="primary" onClick={handleUpgrade}>
                    Upgrade Subscription
                </Button>,
            ]}
        >
            <p style={{ fontSize: "16px", color: "#555" }}>
                {message || "To use this AI feature, you need to upgrade your subscription."}
            </p>
        </Modal>
    );
};

SubscriptionModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string,
};

export default SubscriptionModal;
