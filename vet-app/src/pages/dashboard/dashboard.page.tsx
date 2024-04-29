import { Card, Carousel, Col, Row, Typography } from "antd";
import React from "react";
import "./dashboard.style.scss";
import { useAuth } from "../../hooks/auth/auth.hook";
import { Navigate } from "react-router-dom";
import { FloatButton } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import CalenderComponent from "../../components/calendar/calendar.component";
import FeatureCard from "../../components/dashboard/feature-card.component";
import { TbUsersGroup } from "react-icons/tb";
import { GrArticle } from "react-icons/gr";
import { GiCash } from "react-icons/gi";
import { SiGooglemeet, SiGooglemessages } from "react-icons/si";
import { format } from "utils/format";
import BalanceCard from "components/dashboard/balance-card";
import ProjectTableEcommerceCard from "components/dashboard/project-table-ecommerce-card";
import { useUser } from "hooks/user.hook";
import { usePayment } from "hooks/payment.hook";
import { useAppointment } from "hooks/health/appointment.hook";
import { usePost } from "hooks/post.hook";

const contentStyle: React.CSSProperties = {
  height: "75vh",
  color: "#fff",
  lineHeight: "75vh",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { userCount } = useUser();
  const { totalAmountPaid } = usePayment();
  const { appointmentCounts } = useAppointment();
  const { postCounts } = usePost();

  if (!isAuthenticated || !user) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Carousel effect="fade" autoplay>
        <div>
          <img style={contentStyle} src="./images/dogs/cute-cats.jpg" />
        </div>
        <div>
          <img style={contentStyle} src="./images/dogs/dog-423398.jpg" />
        </div>
        <div>
          <img style={contentStyle} src="./images/dogs/kittens-3535404.jpg" />
        </div>
        <div>
          <img
            style={contentStyle}
            src="./images/dogs/pexels-photo-4214919.jpeg"
          />
        </div>
      </Carousel>

      <Row justify={"center"} align={"middle"}>
        <Col xs={22} md={18}>
          <Card
            size="small"
            title={
              <>
                <Col span={24} style={{ marginTop: 15, paddingLeft: 10 }}>
                  <Typography.Title level={3} style={{ marginBottom: 5 }}>
                    Welcome back, {user.firstname} 👋
                  </Typography.Title>
                  <Typography.Paragraph style={{ fontWeight: "normal" }}>
                    Your current status and analytics are here
                  </Typography.Paragraph>
                </Col>
              </>
            }
            style={{
              top: "-500px",
            }}
          >
            <Row gutter={[32, 32]}>
              <Col sm={8} md={6} span={24}>
                <FeatureCard
                  icon={<TbUsersGroup size={24} color="rgb(49, 118, 16)" />}
                  title="Total Users"
                  price={`${format.number(userCount)}`}
                />
              </Col>

              <Col sm={8} md={6} span={24}>
                <FeatureCard
                  icon={<GiCash size={28} color="rgb(49, 118, 16)" />}
                  title="Total Sales"
                  price={`${format.number(totalAmountPaid)} XAF`}
                />
              </Col>
              <Col sm={8} md={6} span={24}>
                <FeatureCard
                  icon={<SiGooglemeet size={24} color="rgb(49, 118, 16)" />}
                  title="Appointments"
                  price={`${appointmentCounts}`}
                />
              </Col>

              <Col sm={8} md={6} span={24}>
                <FeatureCard
                  icon={<GrArticle size={24} color="rgb(49, 118, 16)" />}
                  title="Total Posts"
                  price={`${postCounts}`}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={22} md={18}>
          <Card
            hoverable
            bordered={true}
            size="small"
            title={
              <>
                <div style={wrapperStyle}>
                  <CalenderComponent />
                </div>
              </>
            }
            style={{
              top: "-470px",
            }}
          />
        </Col>

        <Col xs={22} md={18}>
          <Card
            size="small"
            title={<BalanceCard />}
            style={{
              top: "-440px",
              padding: "1.5rem 0",
            }}
          />
        </Col>

        <Col xs={22} md={18}>
          <Card
            size="small"
            title={<ProjectTableEcommerceCard />}
            style={{
              top: "-400px",
              padding: "1.5rem 0",
            }}
          />
        </Col>
      </Row>

      <FloatButton icon={<CommentOutlined />} />
    </>
  );
};

const wrapperStyle: React.CSSProperties = {
  width: "100%",
  // height:"250px"
  // border: `1px solid ${token.colorBorderSecondary}`,
  // borderRadius: token.borderRadiusLG,
};

export default DashboardPage;
