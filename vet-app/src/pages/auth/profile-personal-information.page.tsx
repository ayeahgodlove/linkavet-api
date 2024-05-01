import { TabsProps } from "antd";
import UserSpecialtyView from "../../components/admin/specialty/specialty-view.component";
import React from "react";
import SettingComponent from "components/auth/setting.component.component";
import InfoProfile from "components/auth/personel-information.component";
import Profile from "components/auth/index.component";

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

const ProfilePersonalInformationPage = () => {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Profile>
        <InfoProfile />
      </Profile>
    </div>
  );
};

export default ProfilePersonalInformationPage;
