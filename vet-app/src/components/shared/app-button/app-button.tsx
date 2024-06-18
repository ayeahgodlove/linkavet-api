import React from "react";
import { Button } from "antd";
import "./app-button.less";

interface IProps {
  type: "link" | "text" | "default" | "primary" | "dashed";
  className?: string;
  children: React.ReactNode;
}
export const AppButton: React.FC<IProps> = (props) => {
  const { type, className = "", children } = props;

  return (
    <Button
      size="large"
      type={type}
      shape="round"
      className={`app-button ${className}`}
    >
      {children}
    </Button>
  );
};
