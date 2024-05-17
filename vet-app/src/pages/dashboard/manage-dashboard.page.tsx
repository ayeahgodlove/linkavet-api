import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { useAuth } from "../../hooks/auth/auth.hook";
import { FloatButton } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import CalenderComponent from "../../components/calendar/calendar.component";
import FeatureCard from "../../components/dashboard/feature-card.component";
import { TbUsersGroup } from "react-icons/tb";
import { GrArticle } from "react-icons/gr";
import { GiCash } from "react-icons/gi";
import { SiGooglemeet } from "react-icons/si";
import { format } from "utils/format";
import BalanceCard from "components/dashboard/balance-card";
import ProjectTableEcommerceCard from "components/dashboard/project-table-ecommerce-card";
import { useUser } from "hooks/user.hook";
import { usePayment } from "hooks/payment.hook";
import { useAppointment } from "hooks/health/appointment.hook";
import { usePost } from "hooks/post.hook";
import { useOrder } from "hooks/order.hook";

const ManageDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { userCount } = useUser();
  const { totalAmountPaid } = usePayment();
  const { appointmentCounts } = useAppointment();
  const { postCounts } = usePost();
  const { orders } = useOrder();

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
            <Row gutter={[32, 32]} justify={"center"} align={"middle"}>
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
            style={{
              top: "-470px",
            }}
          >
            <>
              <div style={wrapperStyle}>
                <CalenderComponent />
              </div>
            </>
          </Card>
        </Col>

        <Col xs={22} md={18}>
          <Card
            size="small"
            style={{
              top: "-440px",
              padding: "1.5rem 0",
            }}
          >
            <BalanceCard />
          </Card>
        </Col>

        <Col xs={22} md={18}>
          <Card
            size="small"
            style={{
              top: "-400px",
              padding: "1.5rem 0",
            }}
          >
            <ProjectTableEcommerceCard orders={orders} />
          </Card>
        </Col>
      </Row>

      <FloatButton icon={<CommentOutlined />} />
    </>
  );
};

const wrapperStyle: React.CSSProperties = {
  width: "100%",
};

export default ManageDashboardPage;
