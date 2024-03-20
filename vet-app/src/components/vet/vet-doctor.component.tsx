// VetDoctorsComponent.tsx

import React, { useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  ConfigProvider,
} from "antd";
import { useUserSpecialty } from "hooks/user-specialty.hook";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { TeamCard } from "components/team/team-card.component";

const { Title } = Typography;

const VetDoctorsComponent: React.FC = () => {
  const { loadUserSpecialties, userSpecialties } = useUserSpecialty();
  const navigate = useNavigate();
  useEffect(() => {
    loadUserSpecialties();
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          colorPrimary: "#41095f",
        },
      }}
    >
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          marginTop: "4rem",
        }}
      >
        <Row gutter={[16, 16]} justify={"center"} align={"middle"}>
          <Col span={20}>
            <Title level={2} style={{ textAlign: "center" }}>
              <span className="gradient-title gradient-title-font">Meet the professionals</span>
            </Title>
            <Typography.Paragraph style={{ fontSize: 17, textAlign: "center" }}>
              <p>
                Discover the compassionate hearts and skilled hands behind our
                veterinary practice. Our dedicated team of professionals brings
                expertise, empathy, and a deep love for animals to every patient
                they serve <br />{" "}
                <Button
                  type="link"
                  style={{ color: "#5a008b", fontWeight: "bold" }}
                  onClick={() => navigate("/portfolios")}
                >
                  Leave a review →
                </Button>
              </p>
            </Typography.Paragraph>
          </Col>
          {userSpecialties.map((user, index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{ margin: "2rem 0" }}
            >
              <TeamCard team={user} />
            </Col>
          ))}
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col xs={12} lg={6}>
              <Button
                type="default"
                style={{
                  marginTop: "10px",
                  paddingLeft: 25,
                  paddingRight: 25,
                  borderRadius: 50,
                  height: 50,
                }}
                icon={<FaHouseMedicalFlag />}
                onClick={() => navigate(`/portfolios`)}
                block
              >
                <span style={{ marginLeft: 5 }}>See all our professionals</span>
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default VetDoctorsComponent;
