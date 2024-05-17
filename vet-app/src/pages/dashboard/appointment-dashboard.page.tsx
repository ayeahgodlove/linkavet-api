import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { useAuth } from "../../hooks/auth/auth.hook";
import { FloatButton } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import CalenderComponent from "../../components/calendar/calendar.component";
import FeatureCard from "../../components/dashboard/feature-card.component";
import { SiGooglemeet } from "react-icons/si";
import { useAppointment } from "hooks/health/appointment.hook";
import AppointmentTableDashboardCard from "components/dashboard/appointment-table-dashboard-card";
import ProjectTableEcommerceCard from "components/dashboard/project-table-ecommerce-card";
import { useOrder } from "hooks/order.hook";

const AppointmentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { userAppointmentCount } = useAppointment();
  const { userOrders } = useOrder();

  console.log("userOrders: ", userOrders)
  return (
    <>
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
            <Row gutter={[32, 32]} justify={"center"}>
              <Col sm={24} md={6}>
                <FeatureCard
                  icon={<SiGooglemeet size={24} color="rgb(49, 118, 16)" />}
                  title="Appointments"
                  price={`${userAppointmentCount}`}
                />
              </Col>

              <Col xs={24} md={18}>
                <Card
                  // hoverable
                  bordered={true}
                  size="small"
                  title={
                    <>
                      <div style={wrapperStyle}>
                        <CalenderComponent />
                      </div>
                    </>
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={22} md={18}>
          <Card
            size="small"
            title={<AppointmentTableDashboardCard />}
            style={{
              top: "-450px",
              padding: "1.5rem 0",
            }}
          />
        </Col>

        <Col xs={22} md={18}>
          <Card
            size="small"
            title={<ProjectTableEcommerceCard orders={userOrders()} />}
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

export default AppointmentDashboardPage;
