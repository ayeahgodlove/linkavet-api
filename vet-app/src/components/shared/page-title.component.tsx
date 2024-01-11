import React from "react";
import { Button, Card, Space, Typography } from "antd";
import { FiInfo } from "react-icons/fi";

interface IProp {
  title: string;
  handleShow: () => void;
  buttonLabel: string;
}

const { Title } = Typography;
export const PageTitle: React.FC<IProp> = ({
  title,
  handleShow,
  buttonLabel,
}) => {
  return (
    <Card
      size="small"
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            <FiInfo />
            <Title style={{ fontSize: 20 }}> {title}</Title>
          </Space>
          <Button onClick={handleShow}>{buttonLabel}</Button>
        </div>
      }
      bodyStyle={{ display: "none" }}
      style={{ marginBottom: 15}}
    />
  );
};
