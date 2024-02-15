import { Button, ConfigProvider, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const UnAuthorizedPage: React.FC = () => {
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
        status="500"
        title="Unauthorized"
        icon={<img src="./linkavet.svg" height={150} width={230} alt="404 icon for page" />}
        subTitle="Sorry, you need to be authenticated before you access this page."
        extra={
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#317610",
                colorLink: "#2980b9",
              },
            }}
          >
            <Button type="primary" onClick={() => router("/")}>
              Back Home
            </Button>
          </ConfigProvider>
        }
      />
    </div>
  );
};

export default UnAuthorizedPage;
