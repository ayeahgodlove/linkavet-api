import { Typography } from "antd";
import AppointmentForm from "components/appointment/book-appointment.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import { Helmet } from "react-helmet-async";

const BookAppointmentsPage = () => {
  return (
    <GeneralAppShell>
      <Helmet>
        <title>
          Explore Premium Vet Products - Your Pet's Wellbeing, Our Priority
        </title>
        <meta
          name="description"
          content="Browse through a carefully curated collection of vet-approved products at Linkavet. Elevate your pet's lifestyle with our premium range of nutrition, grooming essentials, toys, and wellness products. Each item is selected with your pet's health and happiness in mind. Shop confidently for top-quality products that complement our commitment to excellence in veterinary care. Enhance your pet's life today with Linkavet."
        />
      </Helmet>
      <Typography.Title level={2}>Book Appointment</Typography.Title>
      <AppointmentForm />
    </GeneralAppShell>
  );
};

export default BookAppointmentsPage;
