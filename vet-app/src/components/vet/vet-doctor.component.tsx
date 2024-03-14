// VetDoctorsComponent.tsx

import React, { useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import { useUser } from "hooks/user.hook";
import { useDispatch } from "react-redux";
import { fetchUsersAsync } from "redux/user.slice";
import { fetchUserRolesAsync } from "redux/user-role.slice";
import { fetchRolesAsync } from "redux/role.slice";

const { Title } = Typography;

const VetDoctorsComponent: React.FC = () => {
  const { getUsersByRole } = useUser();
  const dispatch = useDispatch();

  const users = getUsersByRole("DOCTOR");
  useEffect(() => {
    dispatch(fetchUsersAsync() as any);
    dispatch(fetchUserRolesAsync() as any);
    dispatch(fetchRolesAsync() as any);
  }, []);
  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Title level={2}>Meet Our Vet Doctors and Practitioners</Title>
      <Row gutter={[16, 16]}>
        {users.map((doctor, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ width: 250 }}
              cover={<img alt={doctor?.username} src={doctor?.avatar} />}
            >
              <Card.Meta title={doctor?.username} description={"VET DOCTOR"} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VetDoctorsComponent;
