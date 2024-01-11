import React from "react";
import { Spin } from "antd";

interface IProps {
  message: string;
  height: string;

}
export const SpinnerComponent: React.FC<IProps> = ({ message, height = "100vh" }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip={message} size="large" style={{ width: 200 }}>
        <div className="content" style={{ width: 200 }} />
      </Spin>
    </div>
  );
};

