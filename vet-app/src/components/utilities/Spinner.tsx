import React from "react";
import { Spin } from "antd";

const Spinner: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip="Wait a moment..." size="large" style={{ width: 200 }}>
        <div className="content" style={{ width: 200 }} />
      </Spin>
    </div>
  );
};

export default Spinner;
