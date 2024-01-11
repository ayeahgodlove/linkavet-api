import { Button, Space } from "antd";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button type="link" onClick={() => navigate(-1)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FiArrowLeft size={18}/>
          <span>Back to {title} page</span>
        </div>
      </Button>
    </>
  );
};

export default BackButton;
