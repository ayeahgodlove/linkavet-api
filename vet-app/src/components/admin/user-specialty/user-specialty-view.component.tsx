import { Descriptions } from "antd";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { useUserSpecialty } from "../../../hooks/user-specialty.hook";
import React from "react";

const UserSpecialtyView = () => {
  const { user } = useAuth();
  const { getUserSpeciality } = useUserSpecialty();
  return (
    <>
      <Descriptions>
        <Descriptions.Item>Specialty</Descriptions.Item>
        <Descriptions.Item>
          {getUserSpeciality(user.id).specialty}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default UserSpecialtyView;
