import React from "react";
import { Button } from "antd";

const CallToActionButton = () => {
  const buttonStyle = {
    background: "#1890ff", // Ant Design primary color
    color: "white",
    borderRadius: "5px",
    borderColor: "#1890ff", // Ant Design primary color
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Button
      type="primary"
      style={buttonStyle}
      size="large"
      onClick={() => alert("Button clicked!")}
    >
      Get Started
    </Button>
  );
};

export default CallToActionButton;
