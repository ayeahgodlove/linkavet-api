import { Button, ConfigProvider, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const NotFoundPage: React.FC = () => {
  const router = useNavigate();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Result
        // status="404"
        title="404"
        icon={<img src="./linkavet.svg" height={150} width={230} alt="404 icon for page" />}
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#317610",
                colorLink: "#2980b9",
              },
            }}
          >
            <Button type="primary" onClick={() => router(-1)}>
              Back Home
            </Button>
          </ConfigProvider>
        }
      />
    </div>
  );
};

export default NotFoundPage;
