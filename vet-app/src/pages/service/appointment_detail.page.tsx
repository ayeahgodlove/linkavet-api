import { Col, Row } from "antd";
import UserAppointmentDetailComponent from "components/admin/heath/appointment/user-appointment-detail.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import PageContent from "components/shared/page-content";
import React from "react";
import { Helmet } from "react-helmet-async";

const AppointmentDetailPage = () => {
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
            link: "/appointments",
          },
          {
            title: "Appointment Details",
          },
        ]}
      />

      <div style={{ margin: "1rem 0 3rem 0" }}>
        <Row gutter={[16, 16]} justify={"center"} align={"top"}>
          <Col xs={22} md={16}>
            <TitleBar
              title={"Appointment"}
              subTitle={"View all your appointments"}
              showButton={false}
              buttonLabel={"Update Record"}
            />
          </Col>
          <Col xs={22} md={16}>
            <UserAppointmentDetailComponent />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AppointmentDetailPage;
