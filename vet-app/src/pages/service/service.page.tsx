import { Card, Col, Row } from "antd";
import { ServiceBanner } from "components/service/service-banner.component";
import OurServices from "components/service/service.component";
import React from "react";
import { Helmet } from "react-helmet-async";

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Expert Veterinary Care for Your Animals</title>
        <meta
          name="description"
          content="Compassionate and Comprehensive Services Tailored to Your Pet's Needs"
        />
      </Helmet>
      <ServiceBanner />
      <OurServices limit={false} />
    </>
  );
};

export default ServicesPage;
