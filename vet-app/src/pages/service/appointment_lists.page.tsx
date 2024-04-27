import { Alert, Button, Col, Row, Typography } from "antd";
import CalendaComponent from "components/admin/heath/appointment/calenda.component";
import { UserAppointmentTable } from "components/admin/heath/appointment/user-appointment.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageContent from "components/shared/page-content";
import { useAuth } from "hooks/auth/auth.hook";
import { useAppointment } from "hooks/health/appointment.hook";
import { IAppointment } from "models/health/appointment";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AppointmentListsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { appointments } = useAppointment();
  const navigate = useNavigate();

  const resultAppointments: IAppointment[] =
    appointments && appointments.length > 0
      ? appointments.filter((a) => a.userId === user.id)
      : [];

  if (!isAuthenticated) {
    return (
      <Row justify={"center"} align={"middle"} style={{ marginTop: "3rem" }}>
        <Col xs={18} span={12}>
          <Alert
            banner
            style={{ display: "flex", justifyContent: "center" }}
            type="info"
            message="Please you need to sign in first"
            description={
              <Col span={5}>
                <Button
                  type="default"
                  block
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </Button>
              </Col>
            }
          />
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Helmet>
        <title>
          Explore Premium Vet Products - Your Pet's Wellbeing, Our Priority
        </title>
        <meta
          name="description"
          content="Browse through a carefully curated collection of vet-approved products at Linkavet. Elevate your pet's lifestyle with our premium range of nutrition, grooming essentials, toys, and wellness products. Each item is selected with your pet's health and happiness in mind. Shop confidently for top-quality products that complement our commitment to excellence in veterinary care. Enhance your pet's life today with Linkavet."
        />
      </Helmet>
      <PageContent
        title={"Appointments"}
        breadcrumb={[
          {
            title: "Appointments",
          },
        ]}
      />
      <div style={{ margin: "1rem 0 3rem 0" }}>
        <Row gutter={[16, 16]} justify={"center"} align={"top"}>
          <Col xs={22} md={20}>
            <TitleBar
              title={
                <Typography.Title level={3}>Appointment Lists</Typography.Title>
              }
              subTitle={"View all your appointments"}
              showButton={true}
              buttonLabel={"New Appointment"}
              handleShow={() => navigate("/book-appointments")}
              icon={<FiPlusCircle />}
            />
          </Col>
          <Col xs={{ span: 22, order: 2 }} md={{ span: 14, order: 1 }}>
            <UserAppointmentTable />
          </Col>
          <Col xs={{ span: 22, order: 1 }} md={{ span: 6, order: 2 }}>
            <CalendaComponent appointments={resultAppointments} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AppointmentListsPage;
