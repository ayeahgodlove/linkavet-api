import { Descriptions } from "antd";
import { useAuth } from "../../../hooks/auth/auth.hook";
import { useSpecialty } from "../../../hooks/specialty.hook";
import React from "react";

const SpecialtyView = () => {
  const { user } = useAuth();
  const { getSpeciality } = useSpecialty();
  return (
    <>
      <Descriptions>
        <Descriptions.Item>Specialty</Descriptions.Item>
        <Descriptions.Item>
          {getSpeciality(user.id).specialty}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default SpecialtyView;
