import { Alert, Button, Card, Col, Row, Typography } from "antd";
import AppointmentForm from "components/appointment/book-appointment.component";
import { useAuth } from "hooks/auth/auth.hook";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

const BookAppointmentsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      <div style={{ margin: "3rem 0" }}>
        <Row gutter={[16, 16]} justify={"center"} align={"top"}>
          <Col xs={22} md={10}>
            <Card bordered={false}>
              <Typography.Title level={2}>Book Appointment</Typography.Title>
              <AppointmentForm />
            </Card>
          </Col>
          <Col xs={22} md={12}>
            <Card
              bordered={false}
              style={{ borderRadius: 0 }}
              cover={
                <img
                  src="/images/daniel-leone-LXQx98FPPQ4-unsplash.jpg"
                  alt="a herd of cows"
                />
              }
              bodyStyle={{ padding: 0 }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BookAppointmentsPage;
