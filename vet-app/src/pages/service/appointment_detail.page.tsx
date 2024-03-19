import { Col, Row } from "antd";
import UserAppointmentDetailComponent from "components/admin/heath/appointment/user-appointment-detail.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
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
      <div style={{ margin: "3rem 0" }}>
        <Row gutter={[16, 16]} justify={"center"} align={"top"}>
          <Col xs={22} md={16}>
            <PageBreadCrumbs items={["appointments", "Details"]} />

            <TitleBar
              title={"Appointment"}
              subTitle={"View all your appointments"}
              showButton={false}
              buttonLabel={"Edit Record"}
              //   handleShow={editBanner}
              //   icon={<FiEdit />}
              //   showExtra
              //   extra={
              //     <Button danger type="default" onClick={onDelete} shape="circle">
              //       <AiFillDelete size={25} />{" "}
              //     </Button>
              //   }
            />
            <BackButton title="Appointments" />
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
