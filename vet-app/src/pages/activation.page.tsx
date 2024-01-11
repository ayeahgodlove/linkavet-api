import { message, Typography } from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <GeneralAppShell>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {error ? (
          <Typography.Title level={5} style={{ color: "#1e7ad0"}}>Your token is expired!</Typography.Title>
        ) : (
          <Typography.Title level={5} style={{ color: "#f14b4b"}}>
            {" "}
            Your account has been created successfully!
          </Typography.Title>
        )}
      </div>
    </GeneralAppShell>
  );
};

export default ActivationPage;
