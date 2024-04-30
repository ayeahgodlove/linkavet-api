import { Card, Tabs, TabsProps } from "antd";
import UserSpecialtyView from "../../components/admin/specialty/specialty-view.component";
import SettingComponent from "../../components/auth/setting.component";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const items: TabsProps["items"] = [
  {
    key: "0",
    label: "Settings",
    children: <SettingComponent />,
  },
  {
    key: "1",
    label: "Specialty",
    children: <UserSpecialtyView />,
  },
];

const ProfilePage = () => {
  const queryParams = new URLSearchParams(location.search);
  console.log("search", queryParams);
  const [status, setStatus] = useState(queryParams.get("tab") || "0");
  const navigate = useNavigate();

  const onChange = (activeKey: string) => {
    setStatus(activeKey);
    navigate(`/profile?=${activeKey}`);
  };
  return (
    <div style={{ padding: "1rem 2rem"}}>
      <Card title="Profile Settings">
        <Tabs defaultActiveKey={status} items={items} onChange={onChange} />
      </Card>
    </div>
  );
};

export default ProfilePage;
