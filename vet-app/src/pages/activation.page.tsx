import { Button, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserService } from "services/user.service";

const ActivationPage = () => {
  const { activationToken } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const response = await UserService.activation(activationToken);
          message.success(response.message);
        } catch (error: any) {
          message.error(error.message);
          setError(true);
        }
      };

      activationEmail();
    }
  }, []);
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {error ? (
          <Typography.Title level={5} style={{ color: "#1e7ad0" }}>
            Your token is expired!
          </Typography.Title>
        ) : (
          <>
            <Typography.Title level={5} style={{ color: "#f14b4b" }}>
              Your account has been created successfully!
            </Typography.Title>
            <br />
            <Typography.Paragraph>
              You can now proceed and{" "}
              <Button size="small" type="primary" href={"/auth/login"}>
                Sign in
              </Button>
            </Typography.Paragraph>
          </>
        )}
      </div>
    </>
  );
};

export default ActivationPage;
